import styles from './condition-content.module.css'

import cn from 'classnames'

import { TNumericCondition } from '@service-providers/common'
import { getNumericExpression } from '@utils/getNumericExpression'
import { IConditionContentProps } from './condition-content.interface'

export const ConditionContentNumeric = ({
  className,
  condition,
}: IConditionContentProps<TNumericCondition>) => {
  return (
    <div className={cn(styles.conditionContent, className)}>
      {getNumericExpression(condition[2], condition[1])}
    </div>
  )
}
