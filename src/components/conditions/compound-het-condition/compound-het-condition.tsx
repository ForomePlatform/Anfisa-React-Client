import { ReactElement, useEffect, useState } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { ApproxNameTypes } from '@core/enum/approxNameTypes'
import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { FuncVariantsTypes } from '@core/enum/func-variants-type-enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import { AllNotMods } from '@pages/filter/dtree/components/query-builder/ui/all-not-mods'
import { AprroxAndState } from '../components/approx-state'
import { DisabledVariants } from '../components/disabled-variants'
import { getApproxValue } from '../utils/conditions.utils'
import { ICompoundHetConditionProps } from './compound-het.interface'

export const CompoundHetCondition = observer(
  ({
    initialApprox,
    initialMode,
    attributeSubKind,
    statFuncStore,
    className,
    onTouch,
    controls,
  }: ICompoundHetConditionProps): ReactElement => {
    const { variants, status, isFetching } = statFuncStore
    const variantsValue = variants && variants[0][1]

    const [mode, setMode] = useState<ModeTypes | undefined>(initialMode)
    const [approx, setApprox] = useState<ApproxNameTypes>(initialApprox)

    const toggleMode = (mode: ModeTypes) => {
      setMode(currentMode => (currentMode === mode ? undefined : mode))
      onTouch?.()
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
        <AprroxAndState
          approx={approx}
          onChangeApprox={setApprox}
          className={className}
        />

        <div
          className={cn(
            'flex justify-between items-center text-14 mt-6 mb-4',
            className,
          )}
        >
          <DisabledVariants
            isFetching={isFetching}
            variantsType={FuncVariantsTypes.Proband}
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
