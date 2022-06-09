import { ReactElement, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { ApproxNameTypes } from '@core/enum/approxNameTypes'
import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import { AprroxAndState } from '@components/conditions/compound-request/components/approx-state'
import { InheritanceModeSelect } from '@pages/filter/dtree/components/query-builder/components/inheritance-mode-select'
import { AllNotMods } from '@pages/filter/dtree/components/query-builder/ui/all-not-mods'
import { DividerHorizontal } from '@pages/filter/refiner/components/middle-column/components/divider-horizontal'
import { TRequestCondition } from '@service-providers/common'
import { getFilteredRequestCondition } from '@utils/function-panel/getFilteredRequestCondition'
import { getApproxValue } from '@utils/getApproxValue'
import { getResetType } from '@utils/getResetType'
import { DisabledVariants } from '../components/disabled-variants'
import { ControlButtons } from './components/control-buttons'
import { RequestConditions } from './components/request-conditions'
import { ICompoundRequestProps } from './compound-request.interface'
import {
  getNewRequestCondition,
  getPreparedScenario,
} from './compound-request.utils'

export const CompoundRequestCondition = observer(
  ({
    problemGroups,
    initialMode,
    initialApprox,
    initialRequestCondition,
    attributeSubKind,
    statFuncStore,
    onTouch,
    controls,
  }: ICompoundRequestProps): ReactElement => {
    const { variants, isFetching, status } = statFuncStore
    const variantsValue = variants && variants[0][1]

    const [requestCondition, setRequestCondition] = useState<
      TRequestCondition[]
    >(initialRequestCondition)

    const [mode, setMode] = useState<ModeTypes | undefined>(initialMode)

    const [approx, setApprox] = useState<ApproxNameTypes>(initialApprox)

    const [preparedValue, setPreparedValue] = useState<string>('')

    const [activeRequestIndex, setActiveRequestIndex] = useState<number>(
      requestCondition.length - 1,
    )

    const toggleMode = (mode: ModeTypes) => {
      setMode(currentMode => (currentMode === mode ? undefined : mode))

      onTouch?.()
    }

    const handleSetPreparedValue = (preparedValue: string) => {
      setPreparedValue(preparedValue)

      const preparedScenario = getPreparedScenario(preparedValue, problemGroups)

      const clonedRequestCondition = [...requestCondition]
      clonedRequestCondition[activeRequestIndex][1] = preparedScenario

      setRequestCondition(clonedRequestCondition)
      onTouch?.()
    }

    const onChangeScenario = (
      requestBlockIndex: number,
      value: string,
      selectIndex: number,
    ) => {
      const clonedRequestCondition = [...requestCondition]

      const newRequestCondition = getNewRequestCondition(
        clonedRequestCondition,
        requestBlockIndex,
        value,
        problemGroups,
        selectIndex,
      )

      setRequestCondition(newRequestCondition)

      setPreparedValue('')

      onTouch?.()
    }

    const handleClearRequestCondition = () => {
      setPreparedValue('')
      setRequestCondition([])
    }

    const handleActiveRequest = (requestBlockIndex: number): void => {
      setActiveRequestIndex(requestBlockIndex)

      const currentRequest = requestCondition[requestBlockIndex]

      setPreparedValue(getResetType(currentRequest[1]) || '')
    }

    const handleRequestConditionNumber = (
      requestBlockIndex: number,
      value: number,
    ): void => {
      if (value < 0) return

      const newRequestCondition = [...requestCondition]

      newRequestCondition[requestBlockIndex][0] = value
      setRequestCondition(newRequestCondition)
    }

    const handleRequestBlocksAmount = (
      type: string,
      activeRequestIndex: number,
    ): void => {
      if (type === 'ADD') {
        const emptyBlock: [number, any] = [1, {}]
        const newRequestCondition = [...requestCondition, emptyBlock]

        setActiveRequestIndex(newRequestCondition.length - 1)

        setRequestCondition(newRequestCondition)
        setPreparedValue('')
      } else {
        const newRequestCondition = requestCondition.filter(
          (_, index) => index !== activeRequestIndex,
        )

        setActiveRequestIndex(newRequestCondition.length - 1)

        setRequestCondition(newRequestCondition)
        setPreparedValue(
          getResetType(newRequestCondition[newRequestCondition.length - 1][1]),
        )
      }
    }

    useEffect(() => {
      statFuncStore.setQuery({
        unit: FuncStepTypesEnum.CompoundRequest,
        param: JSON.stringify({
          approx: getApproxValue(approx),
          request: getFilteredRequestCondition(requestCondition),
        }),
      })
    }, [approx, requestCondition, statFuncStore])

    useEffect(() => {
      setPreparedValue(
        getResetType(requestCondition[requestCondition.length - 1][1]),
      )
    }, [requestCondition])

    return (
      <>
        <>
          <AprroxAndState approx={approx} setApprox={setApprox} />

          <DividerHorizontal />

          <RequestConditions
            problemGroups={problemGroups}
            requestCondition={requestCondition}
            activeRequestIndex={activeRequestIndex}
            onChangeScenario={onChangeScenario}
            handleActiveRequest={handleActiveRequest}
            handleRequestConditionNumber={handleRequestConditionNumber}
          />

          <div className="flex items-center justify-end w-full text-14">
            <ControlButtons
              requestCondition={requestCondition}
              activeRequestIndex={activeRequestIndex}
              handleRequestBlocksAmount={handleRequestBlocksAmount}
              onTouch={onTouch}
            />
          </div>

          <DividerHorizontal />

          <InheritanceModeSelect
            handleReset={handleSetPreparedValue}
            resetValue={preparedValue}
          />

          <DividerHorizontal />

          <div className="flex justify-between items-center mb-2 text-14">
            <DisabledVariants
              isFetching={isFetching}
              status={status}
              variantsValue={variantsValue}
              variantsType={'True'}
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
            hasErrors: !variants?.length,
            clearValue: handleClearRequestCondition,
            param: {
              approx: getApproxValue(approx),
              request: getFilteredRequestCondition(requestCondition),
            },
            mode,
          })}
      </>
    )
  },
)
