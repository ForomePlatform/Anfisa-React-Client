import { ModeTypes } from '@core/enum/mode-types-enum'
import datasetStore from '@store/dataset/dataset'
import dtreeStore from '@store/dtree'
import modalsControlStore from '@pages/filter/dtree/components/modals/modals-control-store'
import { ISavePanelAttributeProps } from '@pages/filter/refiner/components/middle-column/panels/utils/save-pannel-attribute'
import { AttributeKinds, TFuncArgs } from '@service-providers/common'
import {
  ActionTypes,
  AtomModifyingActionName,
} from '@service-providers/decision-trees'
import { getConditionJoinMode } from '@utils/getConditionJoinMode'

type TAttribute = [
  filterKind: AttributeKinds,
  filterName: string,
  values: string[],
  mode?: ModeTypes | undefined,
  param?: TFuncArgs,
]

export const saveAttribute = ({
  attributeKind,
  attributeName,
  selectedVariants,
  mode,
  param,
}: ISavePanelAttributeProps) => {
  const code = dtreeStore.dtreeCode ?? 'return False'

  const { location } = modalsControlStore

  const attribute: TAttribute = [
    attributeKind,
    attributeName!,
    selectedVariants!,
  ]

  const conditionsJoinMode = getConditionJoinMode(mode)

  attribute.splice(2, 0, conditionsJoinMode)

  if (param) attribute.push(param)

  dtreeStore.fetchDtreeSetAsync({
    ds: datasetStore.datasetName,
    code,
    instr: [
      ActionTypes.ATOM,
      AtomModifyingActionName.EDIT,
      location,
      attribute,
    ],
  })
}
