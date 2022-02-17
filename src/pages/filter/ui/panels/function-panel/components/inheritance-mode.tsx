import React, { ChangeEvent, useEffect, useMemo } from 'react'
import Checkbox from 'react-three-state-checkbox'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { t } from '@i18n'
import filterStore from '@store/filter'
import {
  ConditionJoinMode,
  TFuncCondition,
  TVariant,
} from '@service-providers/common/common.interface'
import { IInheritanceModeCachedValues } from '../function-panel.interface'
import functionPanelStore from '../function-panel.store'
import { PanelButtons } from './panelButtons'

export const InheritanceMode = observer(() => {
  const cachedValues =
    filterStore.readFilterCondition<IInheritanceModeCachedValues>(
      FuncStepTypesEnum.InheritanceMode,
    )

  const { filterName, filterGroup, problemGroups, complexVariants } =
    functionPanelStore

  const filteredVariants: [string, number][] = useMemo(() => {
    return complexVariants.filter(([, variantValue]) => variantValue > 0)
  }, [complexVariants])

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
    const inhModeConditions: TFuncCondition = [
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

    functionPanelStore.handleSumbitConditions(inhModeConditions, variant)

    functionPanelStore.fetchStatFunc(
      FuncStepTypesEnum.InheritanceMode,
      JSON.stringify({ problem_group: problemGroupValues }),
    )
  }

  const handleSelectAllVariant = () => {
    if (filteredVariants.length === 0) return

    const variantsGroup = filteredVariants.map(variant => variant[0])

    functionPanelStore.setCachedValues<IInheritanceModeCachedValues>(
      FuncStepTypesEnum.InheritanceMode,
      {
        conditions: { problem_group: problemGroupValues },
        variants: variantsGroup,
      },
    )
  }

  const handleResetAllFieldsLocally = () => {
    if (problemGroupValues.length === 0) return

    functionPanelStore.clearCachedValues(FuncStepTypesEnum.InheritanceMode)
  }

  const handleResetVariantsLocally = () => {
    if (variantsValues.length === 0) return

    functionPanelStore.clearCachedValues(
      FuncStepTypesEnum.InheritanceMode,
      'variants',
    )
  }

  // to avoid displaying this data on the another func attr
  useEffect(() => {
    return () => filterStore.resetStatFuncData()
  }, [])

  return (
    <React.Fragment>
      <div className="flex items-center justify-between">
        <p className="text-14 leading-16px font-bold text-grey-blue mt-4">
          Problem group
        </p>

        <p
          className="text-12 text-blue-bright leading-14px cursor-pointer"
          onClick={handleResetAllFieldsLocally}
        >
          Reset
        </p>
      </div>
      <div className="flex items-center justify-between mt-4">
        {problemGroups.map(problemGroup => (
          <div key={problemGroup} className="flex items-center">
            <Checkbox
              checked={problemGroupValues.includes(problemGroup)}
              onChange={e => handleChangeProblemGroups(e, problemGroup)}
            />
            <span className="text-14 leading-16px ml-2">{problemGroup}</span>
          </div>
        ))}
      </div>

      <div className="h-px w-full bg-white my-4" />

      <div className="flex items-center justify-between">
        <p className="text-14 leading-14px text-grey-blue">
          {variantsValues.length} Selected
        </p>

        <p
          className="text-12 leading-14px text-blue-bright cursor-pointer ml-auto mr-2"
          onClick={handleSelectAllVariant}
        >
          {t('general.selectAll')}
        </p>
        <p
          className="text-12 leading-14px text-blue-bright cursor-pointer"
          onClick={handleResetVariantsLocally}
        >
          {t('general.clearAll')}
        </p>
      </div>

      {filteredVariants.map(([variantName, variantValue]) => {
        return (
          <div key={variantName} className="flex items-center mt-4">
            <Checkbox
              checked={variantsValues.includes(variantName)}
              onChange={e => {
                handleChangeVariants(e, variantName)
              }}
            />
            <span className="text-14 leading-16px ml-2">{variantName}</span>
            <span className="text-14 leading-16px text-grey-blue ml-1">{`(${variantValue})`}</span>
          </div>
        )
      })}

      {filteredVariants.length === 0 && (
        <div className="flex justify-center w-full mt-2 text-14 text-grey-blue">
          Out of choice. Select problem group.
        </div>
      )}

      <PanelButtons
        selectedFilterName={filterName}
        selectedFilterGroup={filterGroup}
        onSubmit={handleSumbitCondtions}
        resetFields={handleResetAllFieldsLocally}
        disabled={variantsValues.length === 0}
      />
    </React.Fragment>
  )
})
