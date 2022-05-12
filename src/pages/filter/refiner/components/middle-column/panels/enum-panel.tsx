import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import filterStore from '@store/filter'
import { EnumCondition } from '@components/enum-condition/enum-condition'
import { BaseAttributeStore } from '@pages/filter/common/attributes/base-attribute.store'
import { getConditionJoinMode } from '@utils/getConditionJoinMode'

export const EnumPanel = observer((): ReactElement | null => {
  const attributeStatus = filterStore.selectedAttributeStatus
  const initialCondition = filterStore.selectedCondition

  const {
    attributeName,
    enumVariants,
    attributeSubKind,
    initialEnumVariants,
    initialEnumMode,
  } = new BaseAttributeStore(attributeStatus, initialCondition)

  const { isFilterTouched } = filterStore

  // TODO: moved to store
  const saveEnum = (
    selectedVariants: string[],
    mode: ModeTypes | undefined,
  ) => {
    if (!attributeName) {
      return
    }

    filterStore.saveCurrentCondition([
      FilterKindEnum.Enum,
      attributeName,
      getConditionJoinMode(mode),
      selectedVariants,
    ])

    filterStore.setTouched(false)
  }

  return (
    <EnumCondition
      isRefiner={true}
      attributeName={attributeName}
      enumVariants={enumVariants}
      attributeSubKind={attributeSubKind}
      initialEnumVariants={initialEnumVariants}
      initialEnumMode={initialEnumMode}
      isFilterTouched={isFilterTouched}
      saveEnum={saveEnum}
    />
  )
})
