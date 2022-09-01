import styles from './filter-conditions.module.css'

import React, { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import filterStore from '@store/filter'
import { ConditionCard } from '../condition-card'
import { useDraggableCards } from './filter-conditions.hooks'

interface IFilterConditions {
  className?: string
}

export const FilterConditions = observer(
  ({ className }: IFilterConditions): ReactElement => {
    const { conditions, selectedConditionIndex } = filterStore
    const [rootRef, onDragStart] = useDraggableCards(filterStore.moveCondition)

    if (conditions.length === 0) {
      return (
        <div className={cn('flex items-center justify-center', className)}>
          <p className="leading-16px text-grey-blue">
            {t('general.noResultsFound')}
          </p>
        </div>
      )
    }

    return (
      <div ref={rootRef} className={cn(styles.root, className)}>
        {conditions.map((condition, index) => (
          <ConditionCard
            className={styles.root__card}
            key={`${condition[1]}_${index}`}
            isActive={index === selectedConditionIndex}
            condition={condition}
            conditionIndex={index}
            onSelect={() => filterStore.selectCondition(index)}
            onDelete={() => filterStore.removeCondition(index)}
            onDragStart={onDragStart}
          />
        ))}
        <div className={styles.root__card} />
      </div>
    )
  },
)
