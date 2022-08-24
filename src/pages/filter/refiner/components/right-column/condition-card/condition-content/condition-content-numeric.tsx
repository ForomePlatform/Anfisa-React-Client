import { TNumericCondition } from '@service-providers/common'
import { getNumericExpression } from '@utils/getNumericExpression'
import { IConditionContentProps } from './condition-content.interface'

export const ConditionContentNumeric = ({
  condition,
}: IConditionContentProps<TNumericCondition>) => {
  return <span>{getNumericExpression(condition[2], condition[1])}</span>
}
