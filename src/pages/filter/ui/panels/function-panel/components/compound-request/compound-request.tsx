import React, { ReactElement, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import filterStore from '@store/filter'
import { DisabledVariantsAmount } from '@pages/filter/ui/query-builder/ui/disabled-variants-amount'
import { ICompoundRequestArgs } from '@service-providers/common/common.interface'
import functionPanelStore from '../../function-panel.store'
import { PanelButtons } from '../panelButtons'
import { AprroxAndState } from './approx-state'
import compoundRequestStore from './compound-request.store'
import { ControlButtons } from './control-buttons'
import { RequestConditions } from './RequestConditions'
import { ResetSelect } from './reset-select'

export const resetOptions = [
  'Homozygous Recessive/X-linked',
  'Autosomal Dominant',
  'Compensational',
]

export const CompoundRequest = observer((): ReactElement => {
  const { selectedFilter } = filterStore
  const isRedactorMode = filterStore.isRedactorMode

  const { simpleVariants } = functionPanelStore

  const { selectedFilterValue } = compoundRequestStore
  const requestCondition = compoundRequestStore.requestCondition
  const activeRequestIndex = compoundRequestStore.activeRequestIndex

  // set/reset data
  useEffect(() => {
    if (selectedFilter && isRedactorMode) {
      const selectedFilterConditions = selectedFilter[4] as ICompoundRequestArgs

      const selectedFilterRequest = selectedFilterConditions['request']

      compoundRequestStore.setRequestCondition(selectedFilterRequest)
    }

    if (!isRedactorMode) {
      compoundRequestStore.clearResetValue()
      compoundRequestStore.clearRequestCondition()
    }
  }, [isRedactorMode, selectedFilter])

  // update data
  useEffect(() => {
    const params = `{"approx":${null},"state":${null},${selectedFilterValue}`

    functionPanelStore.fetchStatFunc(FuncStepTypesEnum.CompoundRequest, params)
  }, [requestCondition, selectedFilterValue])

  // to avoid displaying this data on the another func attr
  useEffect(() => {
    return () => filterStore.resetStatFuncData()
  }, [])

  const handleResetFields = () => {
    compoundRequestStore.setActiveRequestIndex(0)
    filterStore.clearFilterCondition(FuncStepTypesEnum.CompoundRequest)
  }

  return (
    <React.Fragment>
      <AprroxAndState />

      <RequestConditions activeRequestIndex={activeRequestIndex} />

      <div className="flex items-center justify-between w-full mt-4 text-14">
        <ControlButtons activeRequestIndex={activeRequestIndex} />

        <ResetSelect />
      </div>

      <DisabledVariantsAmount variants={simpleVariants} disabled={true} />

      <PanelButtons
        onSubmit={() => compoundRequestStore.handleSumbitCondtions()}
        resetFields={handleResetFields}
        disabled={!simpleVariants}
      />
    </React.Fragment>
  )
})
