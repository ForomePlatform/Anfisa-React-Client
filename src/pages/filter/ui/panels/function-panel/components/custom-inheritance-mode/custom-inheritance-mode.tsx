import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { ModeTypes } from '@core/enum/mode-types-enum'
import filterStore from '@store/filter'
import { CustomInheritanceModeContent } from '@pages/filter/ui/query-builder/ui/custom-inheritance-mode-content'
import { ConditionJoinMode } from '@service-providers/common'
import { ICustomInheritanceModeArgs } from '@service-providers/common/common.interface'
import { getStringScenario } from '@utils/function-panel/getStringScenario'
import { getCurrentModeType } from '@utils/getCurrentModeType'
import functionPanelStore from '../../function-panel.store'
import { PanelButtons } from '../panelButtons'
import customInheritanceModeStore from './custom-inheritance-mode.store'

export const CustomInheritanceMode = observer(() => {
  const { selectedFilter } = filterStore
  const isRedactorMode = filterStore.isRedactorMode

  const { simpleVariants, problemGroups } = functionPanelStore

  const { selectStates } = customInheritanceModeStore
  const scenario = customInheritanceModeStore.scenario
  const resetValue = customInheritanceModeStore.resetValue

  const setComplexScenario = (resetName: string): void => {
    customInheritanceModeStore.setComplexScenario(resetName)
  }

  const setSingleScenario = (group: string, selectValue: string): void => {
    customInheritanceModeStore.setSingleScenario(group, selectValue)
  }

  // set/reset data
  useEffect(() => {
    if (selectedFilter && isRedactorMode) {
      const selectedFilterScenario =
        selectedFilter[4] as ICustomInheritanceModeArgs

      const conditionJoinType = selectedFilter[2] as ConditionJoinMode

      customInheritanceModeStore.setCurrentMode(
        getCurrentModeType(conditionJoinType),
      )

      const selectedFilterScenarioArray = Object.entries(
        selectedFilterScenario['scenario'],
      )

      customInheritanceModeStore.setScenario(selectedFilterScenarioArray)
    }

    if (!isRedactorMode) {
      customInheritanceModeStore.clearScenario()
      customInheritanceModeStore.clearResetValue()
      customInheritanceModeStore.resetCurrentMode()
    }
  }, [isRedactorMode, selectedFilter])

  // update data
  useEffect(() => {
    const params = `{"scenario":${
      scenario.length > 0 ? `{${getStringScenario(scenario)}}` : '{}'
    }}`

    functionPanelStore.fetchStatFunc('Custom_Inheritance_Mode', params)
  }, [scenario])

  // to avoid displaying this data on the another func attr
  useEffect(() => {
    return () => filterStore.resetStatFuncData()
  }, [])

  const handleClear = () => {
    customInheritanceModeStore.clearResetValue()
    customInheritanceModeStore.clearScenario()
    customInheritanceModeStore.resetCurrentMode()
  }

  return (
    <React.Fragment>
      <CustomInheritanceModeContent
        problemGroups={problemGroups}
        handleSetScenario={setSingleScenario}
        selectStates={selectStates}
        handleReset={setComplexScenario}
        resetValue={resetValue}
        isNotModeChecked={
          customInheritanceModeStore.currentMode === ModeTypes.Not
        }
        toggleNotMode={() =>
          customInheritanceModeStore.setCurrentMode(ModeTypes.Not)
        }
      />

      <PanelButtons
        onSubmit={() => customInheritanceModeStore.handleSumbitCondtions()}
        resetFields={handleClear}
        disabled={!simpleVariants}
      />
    </React.Fragment>
  )
})
