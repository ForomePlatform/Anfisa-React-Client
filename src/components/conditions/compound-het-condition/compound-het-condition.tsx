import { ReactElement, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { ApproxNameTypes } from '@core/enum/approxNameTypes'
import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import filterStore from '@store/filter'
import { AllNotMods } from '@pages/filter/dtree/components/query-builder/ui/all-not-mods'
import { AprroxAndState } from '@pages/filter/refiner/components/middle-column/panels/function-panel/components/compound-request/components/approx-state'
import { getApproxValue } from '@utils/getApproxValue'
import { DisabledVariants } from '../components/disabled-variants'
import { ICompoundHetConditionProps } from './compound-het.interface'

export const CompoundHetCondition = observer(
  ({
    initialApprox,
    initialMode,
    attributeSubKind,
    statFuncStore,
    controls,
  }: ICompoundHetConditionProps): ReactElement => {
    const { variants, status, isFetching } = statFuncStore
    const variantsValue = variants && variants[0][1]

    const [mode, setMode] = useState<ModeTypes | undefined>(initialMode)
    const [approx, setApprox] = useState<ApproxNameTypes>(initialApprox)

    const toggleMode = (mode: ModeTypes) => {
      setMode(currentMode => (currentMode === mode ? undefined : mode))
      filterStore.setTouched(true)
    }

    const handleReset = () => {
      setMode(undefined)
    }

    useEffect(() => {
      statFuncStore.setQuery({
        unit: FuncStepTypesEnum.CompoundHet,
        param: JSON.stringify({
          approx: getApproxValue(approx),
        }),
      })

      return () => statFuncStore.reset()
    }, [approx, statFuncStore])

    return (
      <>
        <>
          <AprroxAndState approx={approx} setApprox={setApprox} />

          <div className="flex justify-between items-center text-14 my-4">
            <DisabledVariants
              isFetching={isFetching}
              variantsType={'Proband'}
              variantsValue={variantsValue}
              status={status}
            />

            <AllNotMods
              groupSubKind={attributeSubKind}
              isNotModeChecked={mode === ModeTypes.Not}
              isNotModeDisabled={!variants?.length}
              toggleNotMode={() => toggleMode(ModeTypes.Not)}
            />
          </div>
        </>

        {controls &&
          controls({
            hasErrors: !!status,
            clearValue: handleReset,
            param: { approx: getApproxValue(approx) },
            mode,
          })}
      </>
    )
  },
)
