import { ModeTypes } from '@core/enum/mode-types-enum'
import filterStore from '@store/filter'
import {
  AttributeKinds,
  TFuncArgs,
  TFuncCondition,
  TNumericConditionBounds,
} from '@service-providers/common'
import { getConditionJoinMode } from '@utils/getConditionJoinMode'

interface IsavePanelAttributeProps {
  filterKind: AttributeKinds
  attributeName?: string
  selectedVariants?: string[]
  value?: TNumericConditionBounds
  mode?: ModeTypes | undefined
  param?: TFuncArgs | undefined
}

export const savePanelAttribute = ({
  filterKind,
  attributeName,
  selectedVariants,
  value,
  mode,
  param,
}: IsavePanelAttributeProps) => {
  if (!attributeName) {
    return
  }

  switch (filterKind) {
    case AttributeKinds.FUNC:
      filterStore.saveCurrentCondition([
        filterKind,
        attributeName,
        getConditionJoinMode(mode),
        selectedVariants!,
        param!,
      ] as TFuncCondition)
      break

    case AttributeKinds.NUMERIC:
      filterStore.saveCurrentCondition([filterKind, attributeName, value!])
      break

    case AttributeKinds.ENUM:
      filterStore.saveCurrentCondition([
        filterKind,
        attributeName,
        getConditionJoinMode(mode),
        selectedVariants!,
      ])
      break
  }

  filterStore.setTouched(false)
}
