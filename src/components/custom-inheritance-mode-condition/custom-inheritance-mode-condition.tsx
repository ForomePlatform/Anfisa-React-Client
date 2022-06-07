import { ReactElement, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import filterStore from '@store/filter'
import { InheritanceModeSelect } from '@pages/filter/dtree/components/query-builder/components/inheritance-mode-select'
import { DividerHorizontal } from '@pages/filter/refiner/components/middle-column/components/divider-horizontal'
import { IScenario } from '@service-providers/common'
import { CustomInheritanceModeScenario } from './components/custom-inheritance-mode-scenario'
import { CustomInheritanceModeVariants } from './components/custom-inheritance-mode-variants'
import { ICustomInheritanceModeConditionProps } from './custom-inheritance-mode.interface'
import {
  getNewScenario,
  getSelectValues,
  handleSetComplexScenario,
} from './custom-inheritance-mode.utils'

export const CustomInheritanceModeCondition = observer(
  ({
    problemGroups,
    initialScenario,
    initialMode,
    attributeSubKind,
    statFuncStore,
    controls,
  }: ICustomInheritanceModeConditionProps): ReactElement => {
    const { variants } = statFuncStore

    const [mode, setMode] = useState<ModeTypes | undefined>(initialMode)

    const [preparedValue, setPreparedValue] = useState<string>('')

    const [scenario, setScenario] = useState<IScenario>(initialScenario || {})

    const [selectValues, setSelectValues] = useState<string[]>([])

    const toggleMode = (mode: ModeTypes) => {
      setMode(currentMode => (currentMode === mode ? undefined : mode))

      filterStore.setTouched(true)
    }

    const handleSetPreparedValue = (preparedValue: string) => {
      setPreparedValue(preparedValue)

      handleSetComplexScenario({
        preparedValue,
        problemGroups,
        setScenario,
      })

      filterStore.setTouched(true)
    }

    const handleSetSingleScenario = (index: number, value: string) => {
      const clonedSelectValues = [...selectValues]
      clonedSelectValues[index] = value

      const newScenario = getNewScenario(clonedSelectValues, problemGroups)

      setScenario(newScenario)

      setPreparedValue('')

      filterStore.setTouched(true)
    }

    useEffect(() => {
      statFuncStore.setQuery({
        unit: FuncStepTypesEnum.CustomInheritanceMode,
        param: JSON.stringify({ scenario }),
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scenario])

    useEffect(() => {
      setSelectValues(getSelectValues(scenario, problemGroups))
    }, [problemGroups, scenario])

    return (
      <>
        <CustomInheritanceModeScenario
          problemGroups={problemGroups}
          selectValues={selectValues}
          handleSetSingleScenario={handleSetSingleScenario}
        />

        <DividerHorizontal />

        <InheritanceModeSelect
          resetValue={preparedValue}
          handleReset={handleSetPreparedValue}
        />

        <DividerHorizontal />

        <CustomInheritanceModeVariants
          isFetching={statFuncStore.isFetching}
          toggleMode={toggleMode}
          mode={mode}
          attributeSubKind={attributeSubKind}
          variants={variants}
        />

        {controls &&
          controls({
            hasErrors: !variants?.length,
            clearValue: () => setPreparedValue(''),
            param: { scenario },
            mode,
          })}
      </>
    )
  },
)
