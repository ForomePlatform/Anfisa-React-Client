import styles from './condition-content.module.css'

import { ReactElement } from 'react'
import cn from 'classnames'

import { TEnumCondition } from '@service-providers/common'
import { IConditionContentProps } from './condition-content.interface'

export const ConditionContentEnum = ({
  className,
  condition,
}: IConditionContentProps<TEnumCondition>): ReactElement => {
  return (
    <div className={cn(styles.conditionContent, className)}>
      {condition[3].map(item => (
        <div key={item} className={styles.conditionContent__element}>
          {item}
        </div>
      ))}
    </div>
  )
}
