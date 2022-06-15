import { ReactElement, useCallback } from 'react'
import { observer } from 'mobx-react-lite'

import filterStore from '@store/filter'
import { NumericCondition } from '@components/conditions/numeric'
import { AttributeHeader } from '@pages/filter/refiner/components/middle-column/attribute-header'
import { DividerHorizontal } from '@pages/filter/refiner/components/middle-column/components/divider-horizontal'
import { AttributeKinds } from '@service-providers/common/common.interface'
import { refinerAttributeStore } from '../../../attributes/refiner-attributes.store'
import { renderPanelControls } from '../components/renderPanelControls'
import { savePanelAttribute } from '../utils/save-pannel-attribute'

export const NumericPanel = observer((): ReactElement | null => {
  const { initialNumericValue, attributeStatus, attributeName } =
    refinerAttributeStore

  const { selectedAttributeStatus, isFilterTouched } = filterStore

  if (!attributeStatus || attributeStatus.kind !== AttributeKinds.NUMERIC) {
    return null
  }

  const handleSaveAttribute = useCallback(
    value => {
      savePanelAttribute({
        filterKind: AttributeKinds.NUMERIC,
        attributeName,
        value,
      })
    },
    [attributeName],
  )

  return (
    <>
      <AttributeHeader attrStatus={selectedAttributeStatus!} />

      <DividerHorizontal />

      <NumericCondition
        attrData={attributeStatus}
        initialValue={initialNumericValue}
        controls={({ value, hasErrors, clearValue }) => {
          const disabled =
            hasErrors ||
            (value[0] == null && value[2] == null) ||
            (typeof attributeStatus.min !== 'number' &&
              typeof attributeStatus.max !== 'number') ||
            !isFilterTouched
          return renderPanelControls({
            initialCondition: initialNumericValue,
            disabled: disabled || !isFilterTouched,
            saveAttribute: () => handleSaveAttribute(value),
            clearValue,
          })
        }}
      />
    </>
  )
})
