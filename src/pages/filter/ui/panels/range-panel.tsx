import { ReactElement, useEffect, useState } from 'react'
import { reaction } from 'mobx'
import { observer } from 'mobx-react-lite'

import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { NumericExpressionTypes } from '@core/enum/numeric-expression-types'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { Button } from '@ui/button'
import { InputNumber } from '@ui/input-number'
import { TNumericCondition } from '@service-providers/common/common.interface'
import { createNumericExpression } from '@utils/createNumericExpression'

const getFilterValue = (arg: string): string | number => {
  const { selectedFilter } = filterStore

  if (selectedFilter) {
    const selectedFilterExpression = selectedFilter[2]

    if (arg === 'min' && typeof selectedFilterExpression[0] === 'number') {
      return selectedFilterExpression[0]
    }

    if (arg === 'max' && typeof selectedFilterExpression[2] === 'number') {
      return selectedFilterExpression[2]
    }
  }

  return ''
}

export const RangePanel = observer((): ReactElement => {
  const selectedFilter = filterStore.selectedGroupItem
  const isRedactorMode = filterStore.isRedactorMode

  const [min, setMin] = useState<string | number>(getFilterValue('min'))
  const [max, setMax] = useState<string | number>(getFilterValue('max'))

  useEffect(() => {
    const dispose = reaction(
      () => filterStore.isRedactorMode,
      () => {
        if (!filterStore.isRedactorMode) {
          setMin('')
          setMax('')
        }
      },
    )

    return () => dispose()
  })

  const [isVisibleMinError, setIsVisibleMinError] = useState(false)
  const [isVisibleMaxError, setIsVisibleMaxError] = useState(false)
  const [isVisibleMixedError, setIsVisibleMixedError] = useState(false)

  const handleSetConditionsAsync = async () => {
    if (datasetStore.activePreset) datasetStore.resetActivePreset()

    const condition: TNumericCondition = [
      FilterKindEnum.Numeric,
      selectedFilter.name,
      createNumericExpression({
        expType: NumericExpressionTypes.GreaterThan,
        minValue: min,
        maxValue: max,
      }),
    ]

    isRedactorMode
      ? filterStore.addFilterToFilterBlock(condition as TNumericCondition)
      : filterStore.addFilterBlock(condition as TNumericCondition)

    setMin('')
    setMax('')
    filterStore.resetIsRedacorMode()
    filterStore.resetActiveFilterId()
    filterStore.resetSelectedGroupItem()

    if (!datasetStore.isXL) {
      datasetStore.fetchWsListAsync()
    }
  }

  const handleClear = () => {
    setIsVisibleMinError(false)
    setIsVisibleMaxError(false)
    setIsVisibleMixedError(false)
    setMin('')
    setMax('')
  }

  const validateMin = (value: string) => {
    if (
      value < selectedFilter.min ||
      value > selectedFilter.max ||
      value === '-0'
    ) {
      setIsVisibleMinError(true)
    } else {
      setIsVisibleMinError(false)
    }

    if (!value) setIsVisibleMinError(false)
  }

  const validateMax = (value: string) => {
    if (
      value > selectedFilter.max ||
      value < selectedFilter.min ||
      value === '-0'
    ) {
      setIsVisibleMaxError(true)
    } else {
      setIsVisibleMaxError(false)
    }

    if (!value) setIsVisibleMaxError(false)
  }

  useEffect(() => {
    if (!min && !max) return

    if (min && max && +min > +max) {
      setIsVisibleMixedError(true)
    } else {
      setIsVisibleMixedError(false)
    }
  }, [min, max])

  useEffect(() => {
    const dispose = reaction(
      () => filterStore.selectedGroupItem.name,
      () => {
        setMin(getFilterValue('min'))
        setMax(getFilterValue('max'))
      },
    )

    return () => dispose()
  }, [])

  return (
    <div>
      <div className="flex justify-between items-end w-full">
        <span>Min {selectedFilter.min}</span>

        {isVisibleMinError && (
          <span className="text-12 text-red-secondary">
            {t('numericCondition.lowerBoundError')}
          </span>
        )}
      </div>

      <InputNumber
        className="w-full border border-grey-blue"
        value={min}
        onChange={e => {
          setMin(e.target.value)
          validateMin(e.target.value)
        }}
      />

      <div className="flex justify-between items-end w-full">
        <span>Max {selectedFilter.max}</span>

        {isVisibleMaxError && (
          <span className="text-12 text-red-secondary">
            {t('numericCondition.upperBoundError')}
          </span>
        )}
      </div>

      <div className="relative h-14">
        <InputNumber
          className="w-full border border-grey-blue"
          value={max}
          onChange={e => {
            setMax(e.target.value)
            validateMax(e.target.value)
          }}
        />
        {isVisibleMixedError && (
          <div className="flex justify-center w-full mt-px text-12 text-red-secondary">
            {t('numericCondition.conditionError')}
          </div>
        )}
      </div>

      <div className="flex items-center justify-end mt-1">
        <Button
          variant={'secondary'}
          text={t('general.clear')}
          onClick={handleClear}
          className="px-5 mr-2"
        />

        <Button
          text={
            isRedactorMode ? t('dtree.saveChanges') : t('dtree.addAttribute')
          }
          onClick={handleSetConditionsAsync}
          disabled={
            isVisibleMinError ||
            isVisibleMaxError ||
            isVisibleMixedError ||
            (!max && !min)
          }
        />
      </div>
    </div>
  )
})
