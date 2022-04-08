import React, { ReactElement, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import filterStore from '@store/filter'
import { DisabledVariantsAmount } from '@pages/filter/ui/query-builder/ui/disabled-variants-amount'
import { ConditionJoinMode } from '@service-providers/common'
import { ICompoundRequestArgs } from '@service-providers/common/common.interface'
import { getCurrentModeType } from '@utils/getCurrentModeType'
import functionPanelStore from '../../function-panel.store'
import { PanelButtons } from '../panelButtons'
import { AprroxAndState } from './approx-state'
import compoundRequestStore from './compound-request.store'
import { ControlButtons } from './control-buttons'
import { RequestConditions } from './request-conditions'
import { ResetSelect } from './reset-select'

export const resetOptions = [
  'Homozygous Recessive/X-linked',
  'Autosomal Dominant',
  'Compensational',
]

export const CompoundRequest = observer((): ReactElement => {
  const { selectedFilter, isRedactorMode } = filterStore

  const { simpleVariants } = functionPanelStore

  const { selectedFilterValue, requestCondition, activeRequestIndex } =
    compoundRequestStore

  // set/reset data
  useEffect(() => {
    if (selectedFilter && isRedactorMode) {
      const selectedFilterConditions = selectedFilter[4] as ICompoundRequestArgs
      const selectedFilterRequest = selectedFilterConditions['request']
      const conditionJoinType = selectedFilter[2] as ConditionJoinMode

      compoundRequestStore.setCurrentMode(getCurrentModeType(conditionJoinType))
      compoundRequestStore.setRequestCondition(selectedFilterRequest)
    }

    if (!isRedactorMode) {
      compoundRequestStore.clearResetValue()
      compoundRequestStore.clearRequestCondition()
      compoundRequestStore.resetCurrentMode()
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

  return (
    <React.Fragment>
      <AprroxAndState simpleVariants={simpleVariants} />

      <RequestConditions activeRequestIndex={activeRequestIndex} />

      <div className="flex items-center justify-between w-full mt-4 text-14">
        <ControlButtons activeRequestIndex={activeRequestIndex} />

        <ResetSelect />
      </div>

      <DisabledVariantsAmount variants={simpleVariants} disabled={true} />

      <PanelButtons
        onSubmit={() => {
          compoundRequestStore.handleSumbitCondtions()
          filterStore.setIsNotChanged()
        }}
        resetFields={() => compoundRequestStore.clearData()}
        disabled={!simpleVariants || filterStore.isSaveDisabled}
      />
    </React.Fragment>
  )
})
