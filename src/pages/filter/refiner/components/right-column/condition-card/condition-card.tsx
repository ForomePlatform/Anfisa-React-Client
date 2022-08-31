import styles from './condition-card.module.css'

import React, { useMemo, useState } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import filterStore from '@store/filter'
import { Icon } from '@ui/icon'
import {
  AttributeKinds,
  ConditionJoinMode,
  TCondition,
} from '@service-providers/common'
import { ConditionContent } from './condition-content'
import { ConditionJoinModeLabel } from './condition-join-mode-label'

interface IConditionCardProps {
  className?: string
  isActive: boolean
  condition: TCondition
  conditionIndex: number
  onSelect: () => void
  onDelete: () => void
  onDragStart: (el: HTMLElement, event: MouseEvent) => void
}

export const ConditionCard = observer(
  ({
    className,
    isActive,
    condition,
    conditionIndex,
    onSelect,
    onDragStart,
  }: IConditionCardProps) => {
    const filterType: string = condition[0]
    const filterName: string = condition[1]
    const filterMode: ConditionJoinMode | undefined =
      filterType !== AttributeKinds.NUMERIC
        ? (condition[2] as ConditionJoinMode)
        : undefined

    const isArrowShown = useMemo(() => {
      if (filterType === AttributeKinds.FUNC) {
        return true
      }
      const conditionsNumber = condition[3]?.length || 0
      return conditionsNumber > 1
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [condition])

    const [isContentVisible, setContentVisible] = useState(
      filterStore.getConditionOpenState(conditionIndex) ?? isArrowShown,
    )

    const isContentHidden =
      filterType === AttributeKinds.FUNC && !isContentVisible

    const isMultipointShown =
      filterType === AttributeKinds.ENUM && isArrowShown && !isContentVisible

    const toggleConditions = (e: React.MouseEvent) => {
      e.stopPropagation()
      filterStore.setConditionOpenState(conditionIndex, !isContentVisible)
      setContentVisible(!isContentVisible)
    }

    const handleTitleMouseDown = (event: React.MouseEvent<HTMLElement>) => {
      const el = event.currentTarget
      const handler = (moveEvent: MouseEvent) => {
        el.classList.add('!cursor-grabbing')
        onDragStart(el, moveEvent)
      }

      document.addEventListener('mousemove', handler, {
        once: true,
      })
      document.addEventListener(
        'mouseup',
        () => {
          el.classList.remove('!cursor-grabbing')
          document.removeEventListener('mousemove', handler)
        },
        {
          once: true,
        },
      )
    }

    return (
      <>
        <div
          className={cn(
            styles.conditionCard,
            isActive && styles.conditionCard_active,
            className,
          )}
          onClick={onSelect}
          onMouseDown={handleTitleMouseDown}
        >
          <div
            className={cn(
              styles.conditionCard__content,
              isContentVisible && styles.conditionCard__content_open,
            )}
          >
            <div className={cn(styles.conditionCard__filterName)}>
              {filterName}
              <ConditionJoinModeLabel
                mode={filterMode}
                className={cn(styles.conditionCard__joinMode)}
              />
              :
            </div>
            {!isContentHidden && (
              <div
                className={cn(
                  styles.conditionCard__conditions,
                  isContentVisible && 'mt-2',
                )}
              >
                <ConditionContent
                  isPreview={!isContentVisible}
                  condition={condition}
                />
              </div>
            )}
            {isMultipointShown && (
              <div className={cn(styles.conditionCard__multipoint)}>...</div>
            )}
          </div>
          {isArrowShown && (
            <button
              className={cn(
                styles.conditionCard__toggleButton,
                isContentVisible && styles.conditionCard__toggleButton_open,
              )}
              onClick={toggleConditions}
            >
              <Icon name="Arrow" />
            </button>
          )}
        </div>
      </>
    )
  },
)
