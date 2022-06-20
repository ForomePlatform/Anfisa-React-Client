import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import filterStore from '@store/filter'
import { IFuncPropertyStatus } from '@service-providers/common'

export const getDefaultProblemGroups = (funcStepType: FuncStepTypesEnum) => {
  const defaultCondition = filterStore.initialStat.getAttributeStatusByName(
    funcStepType,
  ) as IFuncPropertyStatus | undefined

  return defaultCondition?.family ?? []
}
