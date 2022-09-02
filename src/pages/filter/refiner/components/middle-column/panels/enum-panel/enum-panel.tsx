import { ReactElement, useCallback } from 'react'
import { observer } from 'mobx-react-lite'

import filterStore from '@store/filter'
import { DEFAULT_COUNT, EnumCondition } from '@components/conditions/enum'
import { AttributeKinds } from '@service-providers/common'
import { refinerAttributeStore } from '../../../attributes/refiner-attributes.store'
import { AttributeHeader } from '../../attribute-header'
import { DividerHorizontal } from '../../components/divider-horizontal'
import { renderPanelControls } from '../components/renderPanelControls'
import { savePanelAttribute } from '../utils/save-pannel-attribute'

export const EnumPanel = observer((): ReactElement => {
  const {
    attributeStatus,
    attributeName,
    enumVariants,
    attributeSubKind,
    initialEnumVariants,
    initialEnumMode,
  } = refinerAttributeStore

  const { isFilterTouched } = filterStore

  const handleSaveAttribute = useCallback(
    (value, mode) => {
      savePanelAttribute({
        attributeKind: AttributeKinds.ENUM,
        attributeName,
        selectedVariants: value,
        mode,
      })
    },
    [attributeName],
  )

  const listHeight =
    enumVariants.length > DEFAULT_COUNT ? 'calc(100% - 249px)' : 'auto'

  return (
    <>
      <AttributeHeader attrStatus={attributeStatus!} />

      <DividerHorizontal />

      <EnumCondition
        selectedAttributeStatus={attributeStatus}
        isDataReady={!attributeStatus?.incomplete}
        attributeName={attributeName}
        enumVariants={enumVariants}
        attributeSubKind={attributeSubKind}
        initialVariants={initialEnumVariants}
        initialEnumMode={initialEnumMode}
        isShowZeroes={refinerAttributeStore.isShowZeroVariants}
        toggleShowZeroes={refinerAttributeStore.setIsShowZeroVariants}
        onTouch={() => filterStore.setTouched(true)}
        className="px-4"
        controls={({ value, mode, clearValue }) =>
          renderPanelControls({
            initialCondition: initialEnumVariants,
            disabled: !value.length || !isFilterTouched,
            saveAttribute: () => handleSaveAttribute(value, mode),
            clearValue,
          })
        }
        listHeight={listHeight}
      />
    </>
  )
})
