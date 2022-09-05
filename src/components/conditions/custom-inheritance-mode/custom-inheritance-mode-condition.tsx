import { ReactElement, useEffect, useMemo, useState } from 'react'
import cn from 'classnames'
import isEmpty from 'lodash/isEmpty'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { FuncVariantsTypes } from '@core/enum/func-variants-type-enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import { t } from '@i18n'
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
    affectedGroup,
    problemGroups,
    initialScenario,
    initialMode,
    attributeSubKind,
    statFuncStore,
    className,
    onTouch,
    controls,
  }: ICustomInheritanceModeConditionProps): ReactElement => {
    const { variants, isFetching, status } = statFuncStore
    const variantsValue = variants && variants[0][1]

    const [mode, setMode] = useState<ModeTypes | undefined>(initialMode)

    const [preparedScenarioName, setPreparedScenarioName] = useState<string>('')

    const [scenario, setScenario] = useState<IScenario>(initialScenario || {})

    const [selectValues, setSelectValues] = useState<string[]>([])

    const isEmptyScenario = useMemo(() => {
      return !preparedScenarioName && isEmpty(scenario)
    }, [preparedScenarioName, scenario])

    const toggleMode = (mode: ModeTypes) => {
      setMode(currentMode => (currentMode === mode ? undefined : mode))

      onTouch?.()
    }

    const handleSetPreparedScenario = (preparedScenarioName: string) => {
      setPreparedScenarioName(preparedScenarioName)

      const preparedScenario = getPreparedScenario({
        preparedScenarioName,
        problemGroups,
        affectedGroup,
      })

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

      setPreparedScenarioName(
        getScenarioName({
          scenario,
          affectedGroup,
          groupsLength: problemGroups.length,
        }),
      )
    }, [affectedGroup, problemGroups, scenario])

    return (
      <>
        <CustomInheritanceModeScenario
          problemGroups={problemGroups}
          selectValues={selectValues}
          onChangeScenario={onChangeScenario}
          className={className}
        />

        <DividerHorizontal />

        <InheritanceModeSelect
          preparedScenarioName={preparedScenarioName}
          className={className}
          handleSetPreparedScenario={handleSetPreparedScenario}
          resetPreparedScenario={() => setPreparedScenarioName('')}
        />

        <DividerHorizontal />

        <div
          className={cn(
            'flex justify-between items-center mb-4 text-14',
            className,
          )}
        >
          {isEmptyScenario ? (
            <div className="flex justify-center items-center text-grey-dark">
              {t('funcCondition.customInhModeNotice')}
            </div>
          ) : (
            <>
              <DisabledVariants
                isFetching={isFetching}
                variantsValue={variantsValue}
                variantsType={FuncVariantsTypes.True}
                status={status}
              />

              <AllNotMods
                groupSubKind={attributeSubKind}
                isNotModeChecked={mode === ModeTypes.Not}
                isNotModeDisabled={!variants?.length}
                toggleNotMode={() => toggleMode(ModeTypes.Not)}
              />
            </>
          )}
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
