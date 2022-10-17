import { ReactElement, useEffect, useMemo, useState } from 'react'
import cn from 'classnames'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import { observer } from 'mobx-react-lite'

import { ApproxNameTypes } from '@core/enum/approxNameTypes'
import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { FuncVariantsTypes } from '@core/enum/func-variants-type-enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import { t } from '@i18n'
import filterStore from '@store/filter'
import { AprroxAndState } from '@components/conditions/components/approx-state'
import { InheritanceModeSelect } from '@components/conditions/components/inheritance-mode-select'
import { AllNotMods } from '@pages/filter/dtree/components/query-builder/ui/all-not-mods'
import { DividerHorizontal } from '@pages/filter/refiner/components/middle-column/components/divider-horizontal'
import { TRequestCondition } from '@service-providers/common'
import { DisabledVariants } from '../components/disabled-variants'
import {
  getApproxValue,
  getPreparedScenario,
  getScenarioName,
} from '../utils/conditions.utils'
import { RequestConditions } from './components/request-conditions'
import { RequestsAmountControlButtons } from './components/requests-amount-control-buttons'
import { ICompoundRequestProps } from './compound-request.interface'
import {
  getFilteredRequestCondition,
  getNewRequestCondition,
} from './compound-request.utils'

export const CompoundRequestCondition = observer(
  ({
    problemGroups,
    affectedGroup,
    initialMode,
    initialApprox,
    initialRequestCondition,
    attributeSubKind,
    statFuncStore,
    className,
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

    const [preparedScenarioName, setPreparedScenarioName] = useState<string>('')

    const [activeRequestIndex, setActiveRequestIndex] = useState<number>(
      requestCondition.length - 1,
    )

    const isEmptyScenario = useMemo(() => {
      return !preparedScenarioName && isEmpty(requestCondition[0][1])
    }, [preparedScenarioName, requestCondition])

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

      const clonedRequestCondition = cloneDeep(requestCondition)
      clonedRequestCondition[activeRequestIndex][1] = preparedScenario

      setRequestCondition(clonedRequestCondition)
      onTouch?.()
    }

    const onChangeScenario = (
      requestBlockIndex: number,
      value: string,
      selectIndex: number,
    ) => {
      const clonedRequestCondition = cloneDeep(requestCondition)

      const newRequestCondition = getNewRequestCondition({
        clonedRequestCondition,
        requestBlockIndex,
        value,
        problemGroups,
        selectIndex,
      })

      setRequestCondition(newRequestCondition)
      setPreparedScenarioName('')
      onTouch?.()
    }

    const handleClearRequestCondition = () => {
      setPreparedScenarioName('')
      setRequestCondition([[1, {}]])
      setMode(undefined)
    }

    const handleSetActiveRequestCondition = (
      requestBlockIndex: number,
    ): void => {
      setActiveRequestIndex(requestBlockIndex)

      const currentRequest = requestCondition[requestBlockIndex]

      setPreparedScenarioName(
        getScenarioName({
          scenario: currentRequest[1],
          affectedGroup,
          groupsLength: problemGroups.length,
        }),
      )
      onTouch?.()
    }

    const onChangeRequestConditionNumber = (
      requestBlockIndex: number,
      value: number,
    ): void => {
      if (value < 0) return

      const newRequestCondition = cloneDeep(requestCondition)
      newRequestCondition[requestBlockIndex][0] = value

      setRequestCondition(newRequestCondition)
      onTouch?.()
    }

    const handleChangeRequestsAmount = (
      type: string,
      activeRequestIndex: number,
    ): void => {
       if (type === 'ADD') {
         const clonedCondition = cloneDeep(requestCondition)
        const emptyBlock: [number, any] = [1, {}]
        const newRequestCondition = [...clonedCondition, emptyBlock]

        setActiveRequestIndex(newRequestCondition.length - 1)
        setRequestCondition(newRequestCondition)
        setPreparedScenarioName('')
      } else {
        const newRequestCondition = requestCondition.filter(
          (_, index) => index !== activeRequestIndex,
        )

        setActiveRequestIndex(newRequestCondition.length - 1)
        setRequestCondition(newRequestCondition)
        setPreparedScenarioName(
          getScenarioName({
            scenario: newRequestCondition[newRequestCondition.length - 1][1],
            affectedGroup,
            groupsLength: problemGroups.length,
          }),
        )
      }
    }

    const onChangeApprox = (approx: ApproxNameTypes) => {
      setApprox(approx)
      onTouch?.()
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
      setPreparedScenarioName(
        getScenarioName({
          scenario: requestCondition[activeRequestIndex][1],
          affectedGroup,
          groupsLength: problemGroups.length,
        }),
      )
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <>
        <AprroxAndState
          approx={[{ value: approx, label: approx }]}
          onChangeApprox={option => onChangeApprox(option.value)}
          className={className}
        />

        <DividerHorizontal />

        <RequestConditions
          problemGroups={problemGroups}
          requestCondition={requestCondition}
          activeRequestIndex={activeRequestIndex}
          spacing={className}
          isRedactorMode={filterStore.isRedactorMode}
          onChangeScenario={onChangeScenario}
          handleSetActiveRequestCondition={handleSetActiveRequestCondition}
          onChangeRequestConditionNumber={onChangeRequestConditionNumber}
        />

        <div
          className={cn(
            'flex items-center justify-end w-full text-14',
            className,
          )}
        >
          <RequestsAmountControlButtons
            requestCondition={requestCondition}
            activeRequestIndex={activeRequestIndex}
            handleChangeRequestsAmount={handleChangeRequestsAmount}
            onTouch={onTouch}
          />
        </div>

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
                status={status}
                variantsValue={variantsValue}
                variantsType={FuncVariantsTypes.True}
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
