import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import cn from 'classnames'
import cloneDeep from 'lodash/cloneDeep'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { t } from '@i18n'
import { Button } from '@ui/button'
import { InputNumber } from '@ui/input-number'
import { Select } from '@ui/select'
import { AllNotModalMods } from '@pages/filter/ui/query-builder/ui/all-not-modal-mods'
import { DisabledVariantsAmount } from '@pages/filter/ui/query-builder/ui/disabled-variants-amount'
import { selectOptions } from '@pages/filter/ui/query-builder/ui/modal-select-custom-inheritance-mode'
import {
  ConditionJoinMode,
  TFuncCondition,
  TVariant,
} from '@service-providers/common/common.interface'
import { getFuncParams } from '@utils/getFuncParams'
import { getRequestData } from '@utils/getRequestData'
import { getResetRequestData } from '@utils/getResetRequestData'
import { getResetType } from '@utils/getResetType'
import { getSortedArray } from '@utils/getSortedArray'
import {
  ICompoundRequestCachedValues,
  TRequestCondition,
} from '../function-panel.interface'
import functionPanelStore from '../function-panel.store'
import { PanelButtons } from './panelButtons'

const approxOptions = [
  'shared transcript',
  'shared gene',
  'non-intersecting transcripts',
]

export const resetOptions = [
  'Homozygous Recessive/X-linked',
  'Autosomal Dominant',
  'Compensational',
]

export const CompoundRequest = observer((): ReactElement => {
  const cachedValues =
    functionPanelStore.getCachedValues<ICompoundRequestCachedValues>(
      FuncStepTypesEnum.CompoundRequest,
    )

  const {
    filterName,
    filterGroup,
    getSelectedValue,
    simpleVariants,
    problemGroups,
  } = functionPanelStore

  const requestCondition = cachedValues?.conditions.request || [
    [1, {}] as TRequestCondition,
  ]

  const resetValue = cachedValues?.reset || ''

  const [activeRequestIndex, setActiveRequestIndex] = useState(
    requestCondition.length - 1,
  )

  // check if there is some data in cachedValues from preset
  useEffect(() => {
    const requestString = getFuncParams(FuncStepTypesEnum.CompoundRequest, {
      request: cachedValues?.conditions.request || requestCondition,
    })
      .slice(10)
      .replace(/\s+/g, '')

    const params = `{"approx":${null},"state":${null},"request":${requestString}}`

    functionPanelStore.fetchStatFunc(FuncStepTypesEnum.CompoundRequest, params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cachedValues])

  // request creation step by step
  const handleSetSingleRequest = (
    requestBlockIndex: number,
    currentSelectIndex: number,
    target: any,
  ) => {
    const requestData = getRequestData(
      target,
      currentSelectIndex,
      problemGroups,
    )

    const newRequest = Object.fromEntries(getSortedArray(requestData))

    const newRequestCondition: any[] = cloneDeep(requestCondition)

    newRequestCondition.map((item: any[], index: number) => {
      if (index === requestBlockIndex) {
        item[1] = newRequest
      }
    })

    sendRequestAsync(newRequestCondition)
  }

  // prepared request creation
  const handleSetComplexRequest = (resetName: string) => {
    const resetRequestData = getResetRequestData(resetName, problemGroups)

    const newRequest = Object.fromEntries(getSortedArray(resetRequestData))

    const newRequestCondition: any[] = cloneDeep(requestCondition)

    newRequestCondition.map((item: any[], index: number) => {
      if (index === activeRequestIndex) {
        item[1] = newRequest
      }
    })

    sendRequestAsync(newRequestCondition, resetName)
  }

  // root function to update data
  async function sendRequestAsync(
    newRequestCondition: any[],
    resetName?: string,
  ) {
    const requestString = getFuncParams(FuncStepTypesEnum.CompoundRequest, {
      request: newRequestCondition,
    })
      .slice(10)
      .replace(/\s+/g, '')

    const params = `{"approx":${null},"state":${null},"request":${requestString}}`

    handleSetConditions({ newRequestCondition, resetName })

    functionPanelStore.fetchStatFunc(FuncStepTypesEnum.CompoundRequest, params)
  }

  // add new request block
  const handleRequestBlocksAmount = (type: string) => {
    if (type === 'ADD') {
      const emptyBlock: [number, any] = [1, {}]
      const newRequestCondition = [...cloneDeep(requestCondition), emptyBlock]

      setActiveRequestIndex(newRequestCondition.length - 1)
      sendRequestAsync(newRequestCondition, 'empty')
    } else {
      const newRequestCondition = cloneDeep(requestCondition).filter(
        (_item: any[], index: number) => index !== activeRequestIndex,
      )

      setActiveRequestIndex(newRequestCondition.length - 1)

      sendRequestAsync(
        newRequestCondition,
        getResetType(newRequestCondition[newRequestCondition.length - 1][1]),
      )
    }
  }

  // change reuqest condition number
  const handleRequestConditionNumber = (
    requestBlockIndex: number,
    value: string,
  ) => {
    if (+value < 0) return

    const newRequestCondition: any[] = cloneDeep(requestCondition)

    newRequestCondition.map((item: any[], index: number) => {
      if (index === requestBlockIndex) {
        item[0] = +value
      }
    })

    sendRequestAsync(newRequestCondition)
  }

  // cach values in every change
  const handleSetConditions = ({ newRequestCondition, resetName }: any) => {
    functionPanelStore.setCachedValues<ICompoundRequestCachedValues>(
      FuncStepTypesEnum.CompoundRequest,
      {
        conditions: {
          approx: null,
          state: null,
          request: newRequestCondition || requestCondition,
        },
        reset: resetName || resetValue,
      },
    )
  }

  // choose an active request block
  const handleActiveRequest = (requestBlockIndex: number, event: any) => {
    const classList = Array.from(event.target.classList)

    const shouldMakeActive = classList.includes('step-content-area')

    if (shouldMakeActive) {
      setActiveRequestIndex(requestBlockIndex)
    }

    const currentRequest = requestCondition[requestBlockIndex]

    handleSetConditions({
      resetName: getResetType(currentRequest[1]) || 'empty',
    })
  }

  const renderConditions = (): JSX.Element => {
    return (
      <div className="flex flex-col w-full mt-4 text-14">
        {requestCondition.map((item: any[], index: number) => (
          <div
            className={cn(
              'flex justify-between w-full shadow-dark py-2 my-2 px-2 cursor-pointer step-content-area',
              index === activeRequestIndex ? ' bg-white' : 'bg-blue-medium',
            )}
            key={index}
            onClick={(e: any) => handleActiveRequest(index, e)}
          >
            <div className="flex cursor-pointer step-content-area">
              <InputNumber
                value={item[0]}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleRequestConditionNumber(index, e.target.value)
                }
                className="shadow-dark w-1/3 h-5 bg-blue-medium"
              />
            </div>

            <div className="flex flex-1 justify-between step-content-area">
              {problemGroups.map((group: string, currNo: number) => (
                <div
                  className="step-content-area"
                  onClick={(e: any) => handleActiveRequest(index, e)}
                  key={group}
                >
                  <span className="cursor-pointer step-content-area">
                    {group}
                  </span>

                  <Select
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                      handleSetSingleRequest(index, currNo, e.target)
                    }
                    className="w-auto ml-1"
                    options={selectOptions}
                    value={getSelectedValue(group, index, requestCondition)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  const handleResetFields = () => {
    setActiveRequestIndex(0)
    functionPanelStore.clearCachedValues(FuncStepTypesEnum.CompoundRequest)
  }

  const handleSumbitCondtionsAsync = async () => {
    const requestString = getFuncParams(FuncStepTypesEnum.CompoundRequest, {
      request: requestCondition,
    })
      .slice(10)
      .replace(/\s+/g, '')

    const conditions: TFuncCondition = [
      'func',
      FuncStepTypesEnum.CompoundRequest,
      ConditionJoinMode.OR,
      ['True'],
      {
        approx: cachedValues?.conditions.approx || null,
        state: cachedValues?.conditions.state || null,
        request: JSON.parse(`${requestString}`),
      },
    ]

    const variant: TVariant = [`"request":${requestString}}`, 0]

    functionPanelStore.handleSumbitConditions(conditions, variant)
  }

  return (
    <React.Fragment>
      <div className="flex justify-between items-center w-full mt-4 text-14">
        <div className="flex">
          <div className="flex items-center">
            <span className="mr-2 text-18 leading-14px">{'Approx:'}</span>

            <Select
              value={approxOptions[2]}
              options={approxOptions}
              disabled={true}
            />
          </div>

          <div className="flex items-center ml-3">
            <span>{t('dtree.state')}</span>

            <Select
              options={['-current-']}
              value="-current-"
              className="w-full ml-2"
              disabled={true}
            />
          </div>
        </div>

        <AllNotModalMods />
      </div>

      {renderConditions()}

      <div className="flex items-center justify-between w-full mt-4 text-14">
        <div className="flex">
          <Button
            onClick={() => handleRequestBlocksAmount('ADD')}
            text="Add"
            variant="secondary"
            className={cn('mr-4')}
            disabled={requestCondition.length === 5}
          />

          <Button
            onClick={() => handleRequestBlocksAmount('REMOVE')}
            text="Remove"
            variant="secondary"
            className={cn(
              'border-red-secondary hover:text-white hover:bg-red-secondary',
            )}
            disabled={requestCondition.length === 1}
          />
        </div>

        <div className="flex w-1/2">
          <span>{t('dtree.reset')}</span>

          <Select
            options={resetOptions}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              handleSetComplexRequest(e.target.value)
            }
            className="w-full ml-2"
            value={resetValue}
            reset
          />
        </div>
      </div>

      <DisabledVariantsAmount variants={simpleVariants} disabled={true} />

      <PanelButtons
        selectedFilterName={filterName}
        selectedFilterGroup={filterGroup}
        onSubmit={handleSumbitCondtionsAsync}
        resetFields={handleResetFields}
        disabled={!simpleVariants}
      />
    </React.Fragment>
  )
})
