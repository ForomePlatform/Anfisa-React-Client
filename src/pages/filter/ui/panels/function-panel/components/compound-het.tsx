import React, { ReactElement, useEffect, useState } from 'react'
import { Option } from 'react-dropdown'
import { observer } from 'mobx-react-lite'

import { IStatFuncData } from '@declarations'
import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import filterStore from '@store/filter'
import { DropDown } from '@ui/dropdown'
import { DisabledVariantsAmount } from '@pages/filter/ui/query-builder/ui/disabled-variants-amount'
import {
  ConditionJoinMode,
  TFuncCondition,
  TVariant,
} from '@service-providers/common/common.interface'
import { ICompoundHetCachedValues } from '../function-panel.interface'
import functionPanelStore from '../function-panel.store'
import { PanelButtons } from './panelButtons'

const options = [
  { label: 'shared transcript', value: '' },
  { label: 'shared gene', value: 'gene' },
  { label: 'non-intersecting transcripts', value: 'rough' },
]

export const CompundHet = observer((): ReactElement => {
  const cachedValues =
    functionPanelStore.getCachedValues<ICompoundHetCachedValues>(
      FuncStepTypesEnum.CompoundHet,
    )

  const { simpleVariants, filterName, filterGroup } = functionPanelStore

  const [statFuncStatus, setStatFuncStatus] = useState<IStatFuncData>()

  const initialApprox: string =
    cachedValues?.conditions.approx || options[0].value

  const handleSetConditions = (approx: string | null, variants?: string[]) => {
    functionPanelStore.setCachedValues<ICompoundHetCachedValues>(
      FuncStepTypesEnum.GeneRegion,
      {
        conditions: { approx: approx, state: null },
        variants: variants || ['Proband'],
      },
    )
  }

  const fetchStatFuncAsync = async () => {
    const statFuncData = await filterStore.fetchStatFuncAsync(
      FuncStepTypesEnum.CompoundHet,
      JSON.stringify({
        approx: cachedValues?.conditions.approx || null,
        state: null,
      }),
    )

    setStatFuncStatus(statFuncData)
  }

  useEffect(() => {
    fetchStatFuncAsync()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cachedValues])

  const handleChangeApprox = (arg: Option) => {
    const approx = !arg.value ? null : arg.value

    handleSetConditions(approx)

    functionPanelStore.fetchStatFunc(
      FuncStepTypesEnum.CompoundHet,
      JSON.stringify({
        approx,
        state: '',
      }),
    )
  }

  const handleResetFieldsAsync = async () => {
    handleSetConditions('shared transcript')

    functionPanelStore.clearCachedValues(FuncStepTypesEnum.CompoundHet)
  }

  const handleSumbitCondtions = () => {
    const conditions: TFuncCondition = [
      'func',
      FuncStepTypesEnum.CompoundHet,
      ConditionJoinMode.OR,
      ['Proband'],
      { approx: cachedValues?.conditions.approx || null, state: null },
    ]

    const variant: TVariant = ['Proband', 0]

    functionPanelStore.handleSumbitConditions(conditions, variant)
  }

  // to avoid displaying this data on the another func attr
  useEffect(() => {
    return () => filterStore.resetStatFuncData()
  }, [])

  return (
    <React.Fragment>
      <div className="text-red-secondary">{statFuncStatus?.err}</div>
      <div className="flex items-center mt-4">
        <span className="mr-2 text-18 leading-14px">Approx:</span>

        <DropDown
          value={initialApprox}
          options={options}
          onSelect={handleChangeApprox}
        />
      </div>

      <div className="mt-4">
        <DisabledVariantsAmount variants={simpleVariants} disabled={true} />
      </div>

      <PanelButtons
        selectedFilterName={filterName}
        selectedFilterGroup={filterGroup}
        onSubmit={handleSumbitCondtions}
        resetFields={handleResetFieldsAsync}
        disabled={!simpleVariants}
      />
    </React.Fragment>
  )
})
