import { ActionType } from '@declarations'
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

export interface IAddAttributeToStepProps {
  action: ActionType
  attributeKind: AttributeKinds
  selectedVariants?: string[]
  value?: TNumericConditionBounds
  attributeName?: string
  param?: TFuncArgs
  mode?: ModeTypes
}

export const addAttributeToStep = ({
  action,
  attributeKind,
  selectedVariants,
  value,
  param,
  mode,
}: IAddAttributeToStepProps): void => {
  const code = dtreeStore.dtreeCode ?? 'return False'
  const isNumeric = attributeKind === AttributeKinds.NUMERIC
  const shouldTakeAttributeFromStore = !isNumeric

  const selectedValue = isNumeric ? value : selectedVariants
  const subGroupName = dtreeStore.selectedGroups[1]
  const attribute = [attributeKind, subGroupName, selectedValue]

  if (shouldTakeAttributeFromStore) {
    const conditionsJoinMode = getConditionJoinMode(mode)

    attribute.splice(2, 0, conditionsJoinMode)
  }

  if (param) attribute.push(param)

  const { stepIndexForApi } = stepStore

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
