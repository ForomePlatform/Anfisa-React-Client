import React, { ChangeEvent, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import filterStore from '@store/filter'
import {
  ConditionJoinMode,
  TFuncCondition,
  TVariant,
} from '@service-providers/common/common.interface'
import { IInheritanceModeCachedValues } from '../../function-panel.interface'
import functionPanelStore from '../../function-panel.store'
import { PanelButtons } from '../panelButtons'
import { ComplexVariants } from './complex-variants'
import { ProblemGroups } from './problem-groups'

export const InheritanceMode = observer(() => {
  const cachedValues =
    functionPanelStore.getCachedValues<IInheritanceModeCachedValues>(
      FuncStepTypesEnum.InheritanceMode,
    )

  const { filterName, filterGroup, problemGroups, filteredComplexVariants } =
    functionPanelStore

  const problemGroupValues: string[] =
    cachedValues?.conditions.problem_group || []
  const variantsValues: string[] = cachedValues?.variants || []

  // check if there is some data in cachedValues from preset
  useEffect(() => {
    functionPanelStore.fetchStatFunc(
      FuncStepTypesEnum.InheritanceMode,
      JSON.stringify({
        problem_group: problemGroupValues || [],
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cachedValues])

  const handleChangeProblemGroups = (
    e: ChangeEvent<HTMLInputElement>,
    problemGroup: string,
  ) => {
    const problemGroups = e.target.checked
      ? [...problemGroupValues, problemGroup]
      : problemGroupValues.filter((group: string) => group !== problemGroup)

    handleSetConditions({ problemGroups })
  }

  const handleChangeVariants = (
    e: ChangeEvent<HTMLInputElement>,
    variantName: string,
  ) => {
    const variants = e.target.checked
      ? [...variantsValues, variantName]
      : variantsValues.filter(
          (variantValue: string) => variantValue !== variantName,
        )

    handleSetConditions({ variants })
  }

  // cach values in every change
  const handleSetConditions = ({
    problemGroups,
    variants,
  }: {
    problemGroups?: string[]
    variants?: string[]
  }): void => {
    functionPanelStore.setCachedValues<IInheritanceModeCachedValues>(
      FuncStepTypesEnum.InheritanceMode,
      {
        conditions: {
          problem_group: problemGroups ? problemGroups : problemGroupValues,
        },
        variants: variants ? variants : variantsValues,
      },
    )

    problemGroups &&
      functionPanelStore.fetchStatFunc(
        FuncStepTypesEnum.InheritanceMode,
        JSON.stringify({
          problem_group: problemGroups || problemGroupValues,
        }),
      )
  }

  const handleSumbitCondtions = () => {
    const conditions: TFuncCondition = [
      'func',
      FuncStepTypesEnum.InheritanceMode,
      ConditionJoinMode.OR,
      variantsValues,
      {
        problem_group:
          problemGroupValues.length > 0 ? problemGroupValues : null,
      },
    ]

    const variant: TVariant = [`${variantsValues}`, 0]

    functionPanelStore.handleSumbitConditions(conditions, variant)

    functionPanelStore.fetchStatFunc(
      FuncStepTypesEnum.InheritanceMode,
      JSON.stringify({ problem_group: problemGroupValues }),
    )
  }

  // to avoid displaying this data on the another func attr
  useEffect(() => {
    return () => filterStore.resetStatFuncData()
  }, [])

  return (
    <React.Fragment>
      <ProblemGroups
        problemGroups={problemGroups}
        problemGroupValues={problemGroupValues}
        handleChangeProblemGroups={handleChangeProblemGroups}
      />

      <div className="h-px w-full bg-white my-4" />

      <ComplexVariants
        variantsValues={variantsValues}
        problemGroupValues={problemGroupValues}
        filteredComplexVariants={filteredComplexVariants}
        handleChangeVariants={handleChangeVariants}
      />

      <PanelButtons
        selectedFilterName={filterName}
        selectedFilterGroup={filterGroup}
        onSubmit={handleSumbitCondtions}
        resetFields={() =>
          functionPanelStore.handleResetAllFieldsLocally(problemGroupValues)
        }
        disabled={variantsValues.length === 0}
      />
    </React.Fragment>
  )
})
