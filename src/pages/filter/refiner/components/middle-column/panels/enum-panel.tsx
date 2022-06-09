import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import filterStore from '@store/filter'
import { EnumCondition } from '@components/conditions/enum/enum-condition'
import { refinerAttributeStore } from '../../attributes/refiner-attributes.store'

export const EnumPanel = observer((): ReactElement => {
  const {
    attributeName,
    enumVariants,
    attributeSubKind,
    initialEnumVariants,
    initialEnumMode,
  } = refinerAttributeStore

  const { isFilterTouched } = filterStore

  return (
    <EnumCondition
      isRefiner={true}
      attributeName={attributeName}
      enumVariants={enumVariants}
      attributeSubKind={attributeSubKind}
      initialEnumVariants={initialEnumVariants}
      initialEnumMode={initialEnumMode}
      isFilterTouched={isFilterTouched}
      saveEnum={refinerAttributeStore.saveEnum}
      isShowZeroes={refinerAttributeStore.isShowZeroVariants}
      toggleShowZeroes={refinerAttributeStore.setIsShowZeroVariants}
    />
  )
})
