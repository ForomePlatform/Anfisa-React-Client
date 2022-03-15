import { ReactElement, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { cloneDeep } from 'lodash'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Button } from '@ui/button'
import { InputNumber } from '@ui/input-number'
import { Select } from '@ui/select'
import { DecisionTreeModalDataCy } from '@components/data-testid/decision-tree-modal.cy'
import activeStepStore from '@pages/filter/active-step.store'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { getFuncParams } from '@utils/getFuncParams'
import { getRequestData } from '@utils/getRequestData'
import { getResetRequestData } from '@utils/getResetRequestData'
import { getResetType } from '@utils/getResetType'
import { getSortedArray } from '@utils/getSortedArray'
import dtreeModalStore from '../../../modals.store'
import { IParams } from '../../modal-edit/components/modal-edit-compound-het'
import { resetOptions } from '../../panels/function-panel/components/compound-request/compound-request'
import { AllNotMods } from './all-not-mods'
import { ApproxStateModalMods } from './approx-state-modal-mods'
import { DisabledVariantsAmount } from './disabled-variants-amount'
import { HeaderModal } from './header-modal'
import { ModalBase } from './modal-base'
import { selectOptions } from './modal-select-custom-inheritance-mode'
import { SelectModalButtons } from './select-modal-buttons'

export const ModalSelectCompoundRequest = observer((): ReactElement => {
  const ref = useRef(null)

  useEffect(() => {
    return () => dtreeStore.resetStatFuncData()
  }, [])

  // important variables

  const currentStepIndex = activeStepStore.activeStepIndex

  const currentGroup = dtreeStore.stepData[currentStepIndex].groups

  const groupName = dtreeModalStore.groupNameToChange

  const variants = dtreeStore.statFuncData.variants

  const approxValues: string[] = []
  const approxOptions: string[] = []

  let attrData: any

  const subGroups = Object.values(dtreeStore.getQueryBuilder)

  subGroups.map(subGroup => {
    subGroup.map((item, currNo) => {
      if (item.name === groupName) {
        attrData = subGroup[currNo]
      }
    })
  })

  // approx-condition & state-condition & request-condition functions

  attrData['approx-modes'].map((mode: string[]) => {
    approxOptions.push(mode[1])
    approxValues.push(mode[0])
  })

  const [requestCondition, setRequestCondition] = useState([[1, {}]])

  const [stateCondition, setStateCondition] = useState('-current-')

  const [approxCondition, setApproxCondition] = useState('transcript')

  const [resetValue, setResetValue] = useState('')

  const stateOptions: string[] = [stateCondition]

  const handleSetCondition = (value: string, type: string) => {
    if (type === 'approx') {
      setApproxCondition(value)

      const request = getFuncParams(groupName, {
        approx: value,
        request: requestCondition,
      })
        .slice(10)
        .replace(/\s+/g, '')

      const approx = value === 'transcript' ? null : `"${value}"`

      const params = `{"approx":${approx},"state":${
        stateCondition !== '-current-' ? `"${stateCondition}"` : null
      },"request":${request}}`

      dtreeStore.fetchStatFuncAsync(groupName, params)
    }

    if (type === 'state') {
      setStateCondition(value)

      const approx =
        approxCondition === 'transcript' ? null : `"${approxCondition}"`

      const params = `{"approx":${approx},"state":${
        value !== '-current-' ? `"${value}"` : null
      }}`

      dtreeStore.fetchStatFuncAsync(groupName, params)
    }
  }

  // request condition functions

  const [activeRequestIndex, setActiveRequestIndex] = useState(
    requestCondition.length - 1,
  )

  const handleActiveRequest = (requestBlockIndex: number, event: any) => {
    const classList = Array.from(event.target.classList)

    const shouldMakeActive = classList.includes('step-content-area')

    if (shouldMakeActive) {
      setActiveRequestIndex(requestBlockIndex)
    }

    const currentRequest = requestCondition[requestBlockIndex]

    setResetValue(getResetType(currentRequest[1]))
  }

  const handleRequestBlocksAmount = (type: string) => {
    if (type === 'ADD') {
      const emptyBlock: [number, any] = [1, {}]
      const newRequestCondition = [...cloneDeep(requestCondition), emptyBlock]

      setRequestCondition(newRequestCondition)
      setActiveRequestIndex(newRequestCondition.length - 1)
      setResetValue('')
    } else {
      const newRequestCondition = cloneDeep(requestCondition).filter(
        (_item: any[], index: number) => index !== activeRequestIndex,
      )

      setRequestCondition(newRequestCondition)
      setActiveRequestIndex(newRequestCondition.length - 1)

      sendRequest(newRequestCondition)

      setResetValue(
        getResetType(newRequestCondition[newRequestCondition.length - 1][1]),
      )
    }
  }

  function getSelectedValue(group: string, index: number): any {
    let value = '--'

    const currentRequestBlock = requestCondition[index][1]

    Object.entries(currentRequestBlock).map((item: any[]) => {
      if (item[1].includes(group)) {
        value = item[0]
      }
    })

    return value
  }

  const handleRequestConditionNumber = (
    requestBlockIndex: number,
    value: number,
  ) => {
    if (value < 0) return

    const newRequestCondition: any[] = cloneDeep(requestCondition)

    newRequestCondition.map((item: any[], index: number) => {
      if (index === requestBlockIndex) {
        item[0] = +value
      }
    })

    setRequestCondition(newRequestCondition)

    sendRequest(newRequestCondition)
  }

  const handleRequestCondition = (
    requestBlockIndex: number,
    currentSelectIndex: number,
    target: any,
  ) => {
    const requestData = getRequestData(
      target,
      currentSelectIndex,
      attrData.family,
    )

    const newRequest = Object.fromEntries(getSortedArray(requestData))

    const newRequestCondition: any[] = cloneDeep(requestCondition)

    newRequestCondition.map((item: any[], index: number) => {
      if (index === requestBlockIndex) {
        item[1] = newRequest
      }
    })

    setRequestCondition(newRequestCondition)

    sendRequest(newRequestCondition)

    setResetValue('')
  }

  const handleReset = (name: string) => {
    const resetRequestData = getResetRequestData(name, attrData.family)

    const newRequest = Object.fromEntries(getSortedArray(resetRequestData))

    const newRequestCondition: any[] = cloneDeep(requestCondition)

    newRequestCondition.map((item: any[], index: number) => {
      if (index === activeRequestIndex) {
        item[1] = newRequest
      }
    })

    setRequestCondition(newRequestCondition)

    sendRequest(newRequestCondition)

    setResetValue(name)
  }

  // common UI functions

  const handleClose = () => {
    dtreeModalStore.closeModalSelectCompoundRequest()
  }

  function sendRequest(newRequestCondition: any[]) {
    const requestString = getFuncParams(groupName, {
      request: newRequestCondition,
    })
      .slice(10)
      .replace(/\s+/g, '')

    const approx =
      approxCondition === 'transcript' ? null : `"${approxCondition}"`

    const params = `{"approx":${approx},"state":${
      stateCondition === '-current-' || !stateCondition
        ? null
        : `"${stateCondition}"`
    },"request":${requestString}}`

    dtreeStore.fetchStatFuncAsync(groupName, params)
  }

  const handleModals = () => {
    dtreeModalStore.closeModalSelectCompoundRequest()
    dtreeModalStore.openModalAttribute()
    dtreeStore.resetSelectedFilters()
  }

  const handleModalJoin = () => {
    dtreeModalStore.openModalJoin()
  }

  const handleAddAttribute = (action: ActionType) => {
    const approx =
      approxCondition === 'transcript' ? null : `"${approxCondition}"`

    const params: IParams = {
      approx,
    }

    if (stateCondition) {
      params.state =
        JSON.stringify(stateOptions) === JSON.stringify(['-current-'])
          ? null
          : stateOptions
    }

    params.request = requestCondition

    addAttributeToStep(action, 'func', null, params)
    dtreeStore.resetSelectedFilters()
    dtreeModalStore.closeModalSelectCompoundRequest()
  }

  return (
    <ModalBase refer={ref} minHeight={300}>
      <HeaderModal
        groupName={dtreeModalStore.groupNameToChange}
        handleClose={handleClose}
      />

      <div className="flex justify-between w-full mt-4 text-14">
        <ApproxStateModalMods
          approxOptions={approxOptions}
          approxValues={approxValues}
          approxCondition={approxCondition}
          stateOptions={stateOptions}
          stateCondition={stateCondition}
          handleSetCondition={handleSetCondition}
        />

        <AllNotMods />
      </div>

      <div className="flex flex-col w-full mt-4 text-14">
        {requestCondition.map((item: any[], index: number) => (
          <div
            className={cn(
              'flex justify-between w-full shadow-dark py-2 my-2 px-2 cursor-pointer step-content-area',
              index === activeRequestIndex ? 'bg-blue-medium' : 'bg-white',
            )}
            key={Math.random()}
            onClick={(e: any) => handleActiveRequest(index, e)}
          >
            <div className="flex cursor-pointer step-content-area">
              <InputNumber
                value={item[0]}
                onChange={(e: any) =>
                  handleRequestConditionNumber(index, e.target.value)
                }
                className="shadow-dark w-1/3 h-5"
              />
            </div>

            <div className="flex flex-1 justify-between step-content-area">
              {attrData.family.map((group: string, currNo: number) => (
                <div
                  className="step-content-area"
                  onClick={(e: any) => handleActiveRequest(index, e)}
                  key={group}
                >
                  <span className="cursor-pointer step-content-area">
                    {group}
                  </span>

                  <Select
                    onChange={(e: any) =>
                      handleRequestCondition(index, currNo, e.target)
                    }
                    className="w-auto ml-1"
                    options={selectOptions}
                    value={getSelectedValue(group, index)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between w-full mt-4 text-14">
        <div className="flex">
          <Button
            onClick={() => handleRequestBlocksAmount('ADD')}
            text="Add"
            dataTestId={DecisionTreeModalDataCy.addButton}
            variant={'secondary'}
            className={cn('mr-4')}
            disabled={requestCondition.length === 5}
          />

          <Button
            onClick={() => handleRequestBlocksAmount('REMOVE')}
            text="Remove"
            dataTestId={DecisionTreeModalDataCy.removeButton}
            variant={'secondary'}
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
            value={resetValue}
            onChange={(e: any) => handleReset(e.target.value)}
            className="w-full ml-2"
            reset
            data-testid={DecisionTreeModalDataCy.selectReset}
          />
        </div>
      </div>

      <DisabledVariantsAmount variants={variants} disabled={true} />

      <SelectModalButtons
        handleClose={handleClose}
        handleModals={handleModals}
        handleModalJoin={handleModalJoin}
        disabled={!variants}
        currentGroup={currentGroup}
        handleAddAttribute={handleAddAttribute}
      />
    </ModalBase>
  )
})
