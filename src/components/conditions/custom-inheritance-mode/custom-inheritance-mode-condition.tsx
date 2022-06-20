import { ReactElement, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import { InheritanceModeSelect } from '@components/conditions/components/inheritance-mode-select'
import { AllNotMods } from '@pages/filter/dtree/components/query-builder/ui/all-not-mods'
import { DividerHorizontal } from '@pages/filter/refiner/components/middle-column/components/divider-horizontal'
import { IScenario } from '@service-providers/common'
import { DisabledVariants } from '../components/disabled-variants'
import {
  getPreparedScenario,
  getScenarioName,
  getSelectValues,
} from '../utils/conditions.utils'
import { CustomInheritanceModeScenario } from './components/custom-inheritance-mode-scenario'
import { ICustomInheritanceModeConditionProps } from './custom-inheritance-mode.interface'
import { getNewScenario } from './custom-inheritance-mode.utils'

export const CustomInheritanceModeCondition = observer(
  ({
    problemGroups,
    initialScenario,
    initialMode,
    attributeSubKind,
    statFuncStore,
    onTouch,
    controls,
  }: ICustomInheritanceModeConditionProps): ReactElement => {
    const { variants, isFetching, status } = statFuncStore
    const variantsValue = variants && variants[0][1]

    const [mode, setMode] = useState<ModeTypes | undefined>(initialMode)

    const [preparedScenarioName, setPreparedScenarioName] = useState<string>('')

    const [scenario, setScenario] = useState<IScenario>(initialScenario || {})

    const [selectValues, setSelectValues] = useState<string[]>([])

    const toggleMode = (mode: ModeTypes) => {
      setMode(currentMode => (currentMode === mode ? undefined : mode))

      onTouch?.()
    }

    const handleSetPreparedScenario = (preparedScenarioName: string) => {
      setPreparedScenarioName(preparedScenarioName)

      const preparedScenario = getPreparedScenario(
        preparedScenarioName,
        problemGroups,
      )

      setScenario(preparedScenario)

      onTouch?.()
    }

    const onChangeScenario = (index: number, value: string) => {
      const clonedSelectValues = [...selectValues]
      clonedSelectValues[index] = value

      const newScenario = getNewScenario(clonedSelectValues, problemGroups)

      setScenario(newScenario)

      setPreparedScenarioName('')

      onTouch?.()
    }

    const handleClearScenario = () => {
      setPreparedScenarioName('')
      setScenario({})
    }

    useEffect(() => {
      statFuncStore.setQuery({
        unit: FuncStepTypesEnum.CustomInheritanceMode,
        param: JSON.stringify({ scenario }),
      })
    }, [scenario, statFuncStore])

    useEffect(() => {
      setSelectValues(getSelectValues(scenario, problemGroups))
      setPreparedScenarioName(getScenarioName(scenario))
    }, [problemGroups, scenario])

    return (
      <>
        <CustomInheritanceModeScenario
          problemGroups={problemGroups}
          selectValues={selectValues}
          onChangeScenario={onChangeScenario}
        />

        <DividerHorizontal />

        <InheritanceModeSelect
          preparedScenarioName={preparedScenarioName}
          handleSetPreparedScenario={handleSetPreparedScenario}
        />

        <DividerHorizontal />

        <div className="flex justify-between items-center mb-2 text-14">
          <DisabledVariants
            isFetching={isFetching}
            variantsValue={variantsValue}
            variantsType={'True'}
            status={status}
          />

          <AllNotMods
            groupSubKind={attributeSubKind}
            isNotModeChecked={mode === ModeTypes.Not}
            isNotModeDisabled={!variants?.length}
            toggleNotMode={() => toggleMode(ModeTypes.Not)}
          />
        </div>

        {controls &&
          controls({
            hasErrors: !variants?.length,
            clearValue: handleClearScenario,
            param: { scenario },
            mode,
          })}
      </>
    )
  },
)
