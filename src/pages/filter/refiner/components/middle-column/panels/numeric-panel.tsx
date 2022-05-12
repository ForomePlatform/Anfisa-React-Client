import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { t } from '@i18n'
import filterStore from '@store/filter'
import { Button } from '@ui/button'
import { NumericCondition } from '@components/numeric-condition'
import { BaseAttributeStore } from '@pages/filter/common/attributes/base-attribute.store'
import {
  AttributeKinds,
  TNumericConditionBounds,
} from '@service-providers/common/common.interface'

export const NumericPanel = observer((): ReactElement | null => {
  const attrData = filterStore.selectedAttributeStatus

  const baseAttributeStore = new BaseAttributeStore(attrData)

  const { attributeName, initialNumericValue } = baseAttributeStore

  const { isFilterTouched } = filterStore

  if (!attrData || attrData.kind !== AttributeKinds.NUMERIC) {
    return null
  }

  const saveCondition = (value: TNumericConditionBounds) => {
    if (!attributeName) {
      return
    }

    filterStore.saveCurrentCondition([
      FilterKindEnum.Numeric,
      attributeName,
      value,
    ])

    filterStore.setTouched(false)
  }

  return (
    <NumericCondition
      className="mt-4"
      attrData={attrData}
      initialValue={initialNumericValue}
      controls={({ value, hasErrors, clearValue }) => (
        <div className="flex items-center justify-end mt-1">
          <Button
            variant={'secondary'}
            text={t('general.clear')}
            onClick={clearValue}
            className="px-5 mr-2"
          />
          <Button
            text={
              initialNumericValue
                ? t('dtree.saveChanges')
                : t('dtree.addAttribute')
            }
            onClick={() => saveCondition(value)}
            disabled={
              hasErrors ||
              (value[0] === null && value[2] === null) ||
              !isFilterTouched
            }
          />
        </div>
      )}
    />
  )
})
