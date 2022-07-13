import styles from './condition-card.module.css'

import React, { useState } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { Icon } from '@ui/icon'
import {
  AttributeKinds,
  ConditionJoinMode,
  TCondition,
} from '@service-providers/common'
import { ConditionContent } from './condition-content'
import { ConditionJoinModeLabel } from './condition-join-mode-label'
import { ConditionOptions } from './condition-options'

interface IConditionCardProps {
  className?: string
  isActive: boolean
  condition: TCondition
  onSelect: () => void
  onDelete: () => void
  onDragStart: (el: HTMLElement, event: MouseEvent) => void
}

export const ConditionCard = observer(
  ({
    className,
    isActive,
    condition,
    onSelect,
    onDelete,
    onDragStart,
  }: IConditionCardProps) => {
    const filterType: string = condition[0]
    const filterName: string = condition[1]
    const filterMode: ConditionJoinMode | undefined =
      filterType !== AttributeKinds.NUMERIC
        ? (condition[2] as ConditionJoinMode)
        : undefined

    const [isContentVisible, setContentVisible] = useState(true)

    const handleTitleMouseDown = (event: React.MouseEvent<HTMLElement>) => {
      const el = event.currentTarget
      const handler = (moveEvent: MouseEvent) => {
        onDragStart(el, moveEvent)
      }

      document.addEventListener('mousemove', handler, {
        once: true,
      })
      document.addEventListener(
        'mouseup',
        () => {
          document.removeEventListener('mousemove', handler)
        },
        {
          once: true,
        },
      )
    }

    return (
      <div
        className={cn(
          styles.conditionCard,
          isActive && styles.conditionCard_active,
          className,
        )}
      >
        <div className={styles.conditionCard__title}>
          <div
            className={styles.conditionCard__filterName}
            onClick={onSelect}
            onMouseDown={handleTitleMouseDown}
          >
            {filterName}
            <ConditionJoinModeLabel
              className={styles.conditionCard__joinMode}
              mode={filterMode}
            />
          </div>
          <button
            className={cn(
              styles.conditionCard__toggleButton,
              isContentVisible && styles.conditionCard__toggleButton_open,
            )}
            onClick={() => setContentVisible(!isContentVisible)}
          >
            <Icon name="Arrow" />
          </button>
          <ConditionOptions
            className={styles.conditionCard__options}
            filterName={filterName}
            onDelete={onDelete}
          />
        </div>
        {isContentVisible && (
          <ConditionContent
            condition={condition}
            className={styles.conditionCard__content}
          />
        )}
      </div>
    )
  },
)
