import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { InheritanceModeEnum } from '@core/enum/inheritance-mode-enum'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { CustomInheritanceModeContent } from '@pages/filter/ui/query-builder/ui/custom-inheritance-mode-content'
import {
  ConditionJoinMode,
  TFuncCondition,
  TVariant,
} from '@service-providers/common/common.interface'
import { getSortedArray } from '@utils/getSortedArray'
import {
  ICustomInheritanceModeCachedValues,
  TScenario,
} from '../function-panel.interface'
import functionPanelStore from '../function-panel.store'
import { PanelButtons } from './panelButtons'

interface IConditions {
  arrayScenario: TScenario[]
  resetName: string
}

export const CustomInheritanceMode = observer(() => {
  const cachedValues =
    filterStore.readFilterCondition<ICustomInheritanceModeCachedValues>(
      FuncStepTypesEnum.CustomInheritanceMode,
    )

  const {
    simpleVariants,
    filterName,
    filterGroup,
    problemGroups,
    getSelectValue,
    getStringScenario,
  } = functionPanelStore

  const { conditions, reset } = cachedValues || {}
  const resetValue = reset || ''
  const stringScenario = cachedValues
    ? getStringScenario(conditions!.scenario)
    : ''

  const firstSelectValue = cachedValues
    ? getSelectValue(cachedValues.conditions.scenario, problemGroups[0])
    : ''

  const secondSelectValue = cachedValues
    ? getSelectValue(conditions!.scenario, problemGroups[1])
    : ''

  const thirdSelectValue = cachedValues
    ? getSelectValue(conditions!.scenario, problemGroups[2])
    : ''

  const selectStates = [firstSelectValue, secondSelectValue, thirdSelectValue]

  // check if there is some data in cachedValues from preset
  useEffect(() => {
    const params = `{"scenario":${
      cachedValues ? `{${getStringScenario(conditions!.scenario)}}` : '{}'
    }}`

    functionPanelStore.fetchStatFunc('Custom_Inheritance_Mode', params)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cachedValues])

  // cach values in every change
  const handleSetConditions = ({ arrayScenario, resetName }: IConditions) => {
    functionPanelStore.setCachedValues<ICustomInheritanceModeCachedValues>(
      FuncStepTypesEnum.CustomInheritanceMode,
      {
        conditions: { scenario: arrayScenario },
        reset: resetName || resetValue,
      },
    )
  }

  // root function to update data
  const sendRequestAsync = async ({
    selectType,
    selectValue,
    complexScenario,
    resetName,
  }: any) => {
    let selectiveData: any[] = []

    if (selectType && selectValue) {
      selectiveData = [
        [
          selectType === 'first' ? selectValue : firstSelectValue || '--',
          problemGroups[0],
        ],
        [
          selectType === 'second' ? selectValue : secondSelectValue || '--',
          problemGroups[1],
        ],
        [
          selectType === 'third' ? selectValue : thirdSelectValue || '--',
          problemGroups[2],
        ],
      ]
    }

    const arrayScenario = getSortedArray(complexScenario || selectiveData)

    const stringScenario = getStringScenario(arrayScenario)

    const params = `{"scenario":{${stringScenario}}}`

    handleSetConditions({ arrayScenario, resetName })

    functionPanelStore.fetchStatFunc('Custom_Inheritance_Mode', params)
  }

  // scenario creation step by step
  const handleSetSingleScenario = (group: string, selectValue: string) => {
    if (group === problemGroups[0]) {
      sendRequestAsync({ selectType: 'first', selectValue })
    }

    if (group === problemGroups[1]) {
      sendRequestAsync({ selectType: 'second', selectValue })
    }

    if (group === problemGroups[2]) {
      sendRequestAsync({ selectType: 'third', selectValue })
    }
  }

  // prepared scenario creation
  const handleSetComplexScenario = (resetName: string) => {
    if (resetName === InheritanceModeEnum.HomozygousRecessive_XLinked) {
      const complexScenario: any[] = [
        ['2', problemGroups[0]],
        ['0-1', problemGroups[1]],
        ['0-1', problemGroups[2]],
      ]

      sendRequestAsync({ complexScenario, resetName })
    }

    if (resetName === InheritanceModeEnum.AutosomalDominant) {
      const complexScenario: any[] = [
        ['1-2', problemGroups[0]],
        ['0', problemGroups[1]],
        ['0', problemGroups[2]],
      ]

      sendRequestAsync({ complexScenario, resetName })
    }

    if (resetName === InheritanceModeEnum.Compensational) {
      const complexScenario: any[] = [
        ['0', problemGroups[0]],
        ['1-2', problemGroups[1]],
        ['1-2', problemGroups[2]],
      ]

      sendRequestAsync({ complexScenario, resetName })
    }

    if (resetName === 'empty') {
      const complexScenario: any[] = [
        ['--', problemGroups[0]],
        ['--', problemGroups[1]],
        ['--', problemGroups[2]],
      ]

      sendRequestAsync({ complexScenario, resetName })
    }
  }

  const handleResetFields = () => {
    filterStore.clearFilterCondition(FuncStepTypesEnum.CustomInheritanceMode)
  }

  const handleSumbitCondtions = () => {
    if (datasetStore.activePreset) datasetStore.resetActivePreset()

    const custInhModeConditions: TFuncCondition = [
      'func',
      FuncStepTypesEnum.CustomInheritanceMode,
      ConditionJoinMode.OR,
      ['True'],
      JSON.parse(`{"scenario":{${stringScenario}}}`),
    ]

    const variant: TVariant = [`"scenario": ${stringScenario}`, 0]

    functionPanelStore.handleSumbitConditions(custInhModeConditions, variant)
  }

  // to avoid displaying this data on the another func attr
  useEffect(() => {
    return () => filterStore.resetStatFuncData()
  }, [])

  return (
    <React.Fragment>
      <CustomInheritanceModeContent
        problemGroups={problemGroups}
        handleSetScenario={handleSetSingleScenario}
        selectStates={selectStates}
        handleReset={handleSetComplexScenario}
        resetValue={resetValue}
      />

      <PanelButtons
        selectedFilterName={filterName}
        selectedFilterGroup={filterGroup}
        onSubmit={handleSumbitCondtions}
        resetFields={handleResetFields}
        disabled={!simpleVariants}
      />
    </React.Fragment>
  )
})
