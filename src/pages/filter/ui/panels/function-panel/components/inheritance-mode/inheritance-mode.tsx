import React, { ChangeEvent, useEffect, useMemo } from 'react'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import filterStore from '@store/filter'
import { IInheritanceModeArgs } from '@service-providers/common/common.interface'
import functionPanelStore from '../../function-panel.store'
import { PanelButtons } from '../panelButtons'
import { ComplexVariants } from './complex-variants'
import inheritanceModeStore from './inheritance-mode.store'
import { ProblemGroups } from './problem-groups'

export const InheritanceMode = observer(() => {
  const { selectedFilter } = filterStore
  const isRedactorMode = filterStore.isRedactorMode

  const { problemGroups, filteredComplexVariants, complexVariants } =
    functionPanelStore

  const problemGroupValues = inheritanceModeStore.problemGroupValues
  const variantValues = inheritanceModeStore.variantValues

  const handleChangeProblemGroups = (
    e: ChangeEvent<HTMLInputElement>,
    problemGroup: string,
  ) => {
    inheritanceModeStore.updateProblemGroupValues(e, problemGroup)
  }

  const handleChangeVariants = (
    e: ChangeEvent<HTMLInputElement>,
    variantName: string,
  ) => {
    inheritanceModeStore.updateVariantValues(e, variantName)
  }

  // set/reset data
  useEffect(() => {
    if (selectedFilter && isRedactorMode) {
      const selectedFilterProblemGroups =
        selectedFilter[4] as IInheritanceModeArgs

      inheritanceModeStore.setProblemGroupValues(
        selectedFilterProblemGroups['problem_group']!,
      )
      inheritanceModeStore.setVariantValues(selectedFilter[3] as string[])
    }

    if (!isRedactorMode) {
      inheritanceModeStore.setProblemGroupValues([])
      inheritanceModeStore.setVariantValues([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRedactorMode, selectedFilter])

  // update data
  useEffect(() => {
    functionPanelStore.fetchStatFunc(
      FuncStepTypesEnum.InheritanceMode,
      JSON.stringify({
        problem_group: problemGroupValues || [],
      }),
    )
  }, [problemGroupValues])

  // to avoid displaying this data on the another func attr
  useEffect(() => {
    return () => filterStore.resetStatFuncData()
  }, [])

  const variantsToDisplay = useMemo(() => {
    return variantValues.length > filteredComplexVariants.length
      ? complexVariants
      : filteredComplexVariants
  }, [complexVariants, filteredComplexVariants, variantValues.length])

  return (
    <React.Fragment>
      <ProblemGroups
        problemGroups={problemGroups}
        problemGroupValues={problemGroupValues}
        handleChangeProblemGroups={handleChangeProblemGroups}
      />

      <div className="h-px w-full bg-white my-4" />

      <ComplexVariants
        variantValues={variantValues}
        variants={variantsToDisplay}
        handleChangeVariants={handleChangeVariants}
      />

      <PanelButtons
        onSubmit={inheritanceModeStore.handleSumbitCondtions}
        resetFields={() => inheritanceModeStore.resetAllFields()}
        disabled={variantValues.length === 0}
      />
    </React.Fragment>
  )
})
