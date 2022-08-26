import { ReactElement, useEffect, useState } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { FuncVariantsTypes } from '@core/enum/func-variants-type-enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import { t } from '@i18n'
import { GeneRegionInput } from '@components/conditions/gene-region-condition/components/gene-region-input/gene-region-input'
import { AllNotMods } from '@pages/filter/dtree/components/query-builder/ui/all-not-mods'
import { DisabledVariants } from '../components/disabled-variants'
import { IGeneRegionProps } from './gene-region.interface'

export const GeneRegionCondition = observer(
  ({
    initialLocusValue,
    initialMode,
    attributeSubKind,
    statFuncStore,
    className,
    onTouch,
    controls,
  }: IGeneRegionProps): ReactElement => {
    const { variants, isFetching, status } = statFuncStore
    const variantsValue = variants && variants[0][1]

    const [mode, setMode] = useState<ModeTypes | undefined>(initialMode)

    const [locus, setLocus] = useState<string>(initialLocusValue || '')

    const toggleMode = (mode: ModeTypes) => {
      setMode(currentMode => (currentMode === mode ? undefined : mode))

      onTouch?.()
    }

    const handleSetLocusValue = (value: string) => {
      setLocus(value)

      onTouch?.()
    }

    const handleClear = () => {
      setMode(undefined)
      setLocus('')
    }

    useEffect(() => {
      statFuncStore.setQuery({
        unit: FuncStepTypesEnum.GeneRegion,
        param: JSON.stringify({ locus }),
      })
    }, [locus, statFuncStore])

    return (
      <>
        <span
          className={cn('mb-1 text-14 leading-16px text-grey-dark', className)}
        >
          {t('funcCondition.locus')}
        </span>

        <GeneRegionInput
          value={locus}
          onChange={handleSetLocusValue}
          classname={cn('mb-2', className)}
        />

        <div
          className={cn(
            'flex justify-between items-center mt-3 mb-4 text-14',
            className,
          )}
        >
          <DisabledVariants
            isFetching={isFetching}
            variantsValue={variantsValue}
            variantsType={FuncVariantsTypes.True}
            status={status}
          />

          <AllNotMods
            classname="justify-end"
            groupSubKind={attributeSubKind}
            isNotModeChecked={mode === ModeTypes.Not}
            isNotModeDisabled={!variants?.length}
            toggleNotMode={() => toggleMode(ModeTypes.Not)}
          />
        </div>

        {controls &&
          controls({
            hasErrors: !variants?.length,
            clearValue: handleClear,
            param: { locus },
            mode,
          })}
      </>
    )
  },
)
