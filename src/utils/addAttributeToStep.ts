import { ActionType, AttributeType } from '@declarations'
import { ModeTypes } from '@core/enum/mode-types-enum'
import dtreeStore from '@store/dtree'
import stepStore from '@store/dtree/step.store'
import {
  AttributeKinds,
  TFuncArgs,
  TNumericConditionBounds,
} from '@service-providers/common'
import {
  ActionTypes,
  TPointModifyingActions,
} from '@service-providers/decision-trees'
import { getConditionJoinMode } from '@utils/getConditionJoinMode'
import datasetStore from '../store/dataset/dataset'

interface IAddAttributeToStepProps {
  action: ActionType
  attributeType: AttributeType
  filters: string[] | TNumericConditionBounds
  param?: TFuncArgs
  mode?: ModeTypes
}

export const addAttributeToStep = ({
  action,
  attributeType,
  filters,
  param,
  mode,
}: IAddAttributeToStepProps): void => {
  const code = dtreeStore.dtreeCode ?? 'return False'
  const { stepIndexForApi } = stepStore
  const shouldTakeAttributeFromStore = attributeType !== AttributeKinds.NUMERIC
  const subGroupName = dtreeStore.selectedGroups[1]
  const attribute = [attributeType, subGroupName, filters.length && filters]

  if (shouldTakeAttributeFromStore) {
    const conditionsJoinMode = getConditionJoinMode(mode)

    attribute.splice(2, 0, conditionsJoinMode)
  }

  if (param) attribute.push(param)

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
