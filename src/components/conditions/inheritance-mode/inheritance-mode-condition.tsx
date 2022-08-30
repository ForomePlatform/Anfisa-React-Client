import { ReactElement, useEffect, useMemo, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import { DividerHorizontal } from '@pages/filter/refiner/components/middle-column/components/divider-horizontal'
import { InheritanceModeProblemGroups } from './components/inheritance-mode-problem-groups'
import { InheritanceModeVariants } from './components/inheritance-mode-variants'
import { InheritanceModeVariantsControls } from './components/inheritance-mode-variants-controls'
import { IInheritanceModeConditionProps } from './inheritance-mode.interface'

export const InheritanceModeCondition = observer(
  ({
    problemGroups,
    initialVariants,
    initialProblemGroups,
    initialMode,
    attributeSubKind,
    statFuncStore,
    className,
    onTouch,
    controls,
  }: IInheritanceModeConditionProps): ReactElement => {
    const [mode, setMode] = useState(initialMode)
    const { variants, status } = statFuncStore
    const [selectedVariants, setSelectedVariants] = useState(
      initialVariants ?? [],
    )

    const [selectedPropblemGroups, setSelectedProblemGroups] = useState(
      initialProblemGroups ?? [],
    )

    const filteredVariants = useMemo(() => {
      return (
        variants?.filter(
          ([variantName, variantValue]) =>
            selectedVariants.includes(variantName) || variantValue > 0,
        ) ?? []
      )
    }, [selectedVariants, variants])

    const handleSetProblemGroups = (checked: boolean, problemGroup: string) => {
      if (checked) {
        setSelectedProblemGroups([...selectedPropblemGroups, problemGroup])
      } else {
        setSelectedProblemGroups(
          selectedPropblemGroups.filter(
            selectedPropblemGroup => selectedPropblemGroup !== problemGroup,
          ),
        )
      }
      onTouch?.()
    }

    const handleSetVariants = (checked: boolean, variant: string) => {
      if (checked) {
        setSelectedVariants([...selectedVariants, variant])
      } else {
        setSelectedVariants(
          selectedVariants.filter(
            selectedVariant => selectedVariant !== variant,
          ),
        )
      }
      onTouch?.()
    }

    const toggleMode = (mode: ModeTypes) => {
      setMode(currentMode => (currentMode === mode ? undefined : mode))
      onTouch?.()
    }

    const onSelectAllVariants = () => {
      const allVariantsNames = filteredVariants?.map(
        ([variantName]) => variantName,
      )
      setSelectedVariants(allVariantsNames)
      onTouch?.()
    }

    const onClearAllVariants = () => {
      setSelectedVariants([])
      setMode(undefined)
    }

    const handleReset = () => {
      setSelectedProblemGroups([])
      setSelectedVariants([])
      setMode(undefined)
    }

    useEffect(() => {
      statFuncStore.setQuery({
        unit: FuncStepTypesEnum.InheritanceMode,
        param: JSON.stringify({
          problem_group: selectedPropblemGroups,
        }),
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPropblemGroups])

    return (
      <>
        <InheritanceModeProblemGroups
          problemGroups={problemGroups}
          selectedPropblemGroups={selectedPropblemGroups}
          handleSetProblemGroups={handleSetProblemGroups}
          handleReset={handleReset}
          className={className}
        />

        {!!selectedPropblemGroups.length && (
          <>
            <DividerHorizontal className="my-1" />

            <InheritanceModeVariantsControls
              selectedVariantsLength={selectedVariants.length}
              filteredVariantsLength={filteredVariants.length}
              attributeSubKind={attributeSubKind}
              mode={mode}
              className={className}
              onSelectAllVariants={onSelectAllVariants}
              onClearAllVariants={onClearAllVariants}
              toggleMode={toggleMode}
            />

            <InheritanceModeVariants
              filteredVariants={filteredVariants}
              selectedVariants={selectedVariants}
              isFetching={statFuncStore.isFetching}
              status={status}
              className={className}
              handleSetVariants={handleSetVariants}
            />
          </>
        )}

        {controls &&
          controls({
            values: selectedVariants,
            hasErrors:
              !selectedVariants.length || !selectedPropblemGroups.length,
            clearValue: handleReset,
            param: { problem_group: selectedPropblemGroups },
            mode,
          })}
      </>
    )
  },
)
