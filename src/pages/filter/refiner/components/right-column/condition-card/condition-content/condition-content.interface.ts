import { TCondition } from '@service-providers/common'

export interface IConditionContentProps<
  Condition extends TCondition = TCondition,
> {
  className?: string
  condition: Condition
  isPreview?: boolean
}
