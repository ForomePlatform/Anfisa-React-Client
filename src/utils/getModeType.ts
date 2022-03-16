import { ConditionJoinMode } from '@service-providers/common/common.interface'

export const getModeType = (
  isAllMode: boolean,
  isNotMode: boolean,
): ConditionJoinMode => {
  return isAllMode
    ? ConditionJoinMode.AND
    : isNotMode
    ? ConditionJoinMode.NOT
    : ConditionJoinMode.OR
}
