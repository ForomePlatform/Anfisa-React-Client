import { ActionType, AttributeType } from '@declarations'
import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import dtreeStore from '@store/dtree'
import activeStepStore from '@store/dtree/step.store'
import {
  ActionTypes,
  TPointModifyingActions,
} from '@service-providers/decision-trees'
import { getConditionJoinMode } from '@utils/getConditionJoinMode'
import datasetStore from '../store/dataset/dataset'

export const addAttributeToStep = (
  action: ActionType,
  attributeType: AttributeType,
  filters: any = null,
  params: any = null,
  currentMode?: ModeTypes,
  // eslint-disable-next-line max-params
): void => {
  const code = dtreeStore.dtreeCode ?? 'return False'

  const shouldTakeAttributeFromStore = attributeType !== FilterKindEnum.Numeric

  const currentFilters = shouldTakeAttributeFromStore
    ? dtreeStore.selectedFilters
    : filters

  const subGroupName = dtreeStore.selectedGroups[1]
  const attribute = [attributeType, subGroupName, currentFilters]

  if (shouldTakeAttributeFromStore) {
    const conditionsJoinMode = getConditionJoinMode(currentMode)

    attribute.splice(2, 0, conditionsJoinMode)
  }

  if (params) attribute.push(params)

  const { stepIndexForApi } = activeStepStore

  dtreeStore.fetchDtreeSetAsync({
    ds: datasetStore.datasetName,
    code,
    instr: [
      ActionTypes.POINT,
      action,
      +stepIndexForApi,
      attribute,
    ] as TPointModifyingActions,
  })

  dtreeStore.resetLocalDtreeCode()
}
