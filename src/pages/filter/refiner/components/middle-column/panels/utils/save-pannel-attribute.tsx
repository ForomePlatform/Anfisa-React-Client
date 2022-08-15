import { ModeTypes } from '@core/enum/mode-types-enum'
import filterStore from '@store/filter'
import {
  AttributeKinds,
  TFuncArgs,
  TFuncCondition,
  TNumericConditionBounds,
} from '@service-providers/common'
import { getConditionJoinMode } from '@utils/getConditionJoinMode'

export interface ISavePanelAttributeProps {
  attributeKind: AttributeKinds
  attributeName?: string
  selectedVariants?: string[]
  value?: TNumericConditionBounds
  mode?: ModeTypes | undefined
  param?: TFuncArgs | undefined
}

export const savePanelAttribute = ({
  attributeKind,
  attributeName,
  selectedVariants,
  value,
  mode,
  param,
}: ISavePanelAttributeProps) => {
  if (!attributeName) {
    return
  }

  switch (attributeKind) {
    case AttributeKinds.FUNC:
      filterStore.saveCurrentCondition([
        attributeKind,
        attributeName,
        getConditionJoinMode(mode),
        selectedVariants!,
        param!,
      ] as TFuncCondition)
      break

    case AttributeKinds.NUMERIC:
      filterStore.saveCurrentCondition([attributeKind, attributeName, value!])
      break

    case AttributeKinds.ENUM:
      filterStore.saveCurrentCondition([
        attributeKind,
        attributeName,
        getConditionJoinMode(mode),
        selectedVariants!,
      ])
      break
  }

  filterStore.setTouched(false)
}
