import { ReactElement, useEffect, useRef } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Button } from '@ui/button'
import { InputNumber } from '@ui/input-number'
import { Select } from '@ui/select'
import { DecisionTreeModalDataCy } from '@components/data-testid/decision-tree-modal.cy'
import { resetOptions } from '@pages/filter/ui/panels/function-panel/components/compound-request/approx-state'
import { AllNotModalMods } from '@pages/filter/ui/query-builder/ui/all-not-modal-mods'
import { ApproxStateModalMods } from '@pages/filter/ui/query-builder/ui/approx-state-modal-mods'
import { DisabledVariantsAmount } from '@pages/filter/ui/query-builder/ui/disabled-variants-amount'
import { HeaderModal } from '@pages/filter/ui/query-builder/ui/header-modal'
import { ModalBase } from '@pages/filter/ui/query-builder/ui/modal-base'
import { getFuncParams } from '@utils/getFuncParams'
import { getResetType } from '@utils/getResetType'
import modalEditStore, { selectOptions } from '../../modal-edit.store'
import { EditModalButtons } from '../edit-modal-buttons'
import modalCompoundRequestStore from './modal-compound-request.store'

export const ModalEditCompoundRequest = observer((): ReactElement => {
  const ref = useRef(null)

  const {
    currentGroup,
    variants,
    approxValues,
    approxOptions,
    problemGroups,
    groupName,
  } = modalEditStore

  const {
    stateCondition,
    requestCondition,
    approxCondition,
    resetValue,
    stateOptions,
    activeRequestIndex,
  } = modalCompoundRequestStore

  const handleSetCondition = (value: string, type: string) => {
    modalCompoundRequestStore.setCondition(value, type)
  }

  useEffect(() => {
    const approx =
      approxCondition === 'transcript' ? null : `"${approxCondition}"`

    const requestString = getFuncParams(
      groupName,
      currentGroup[currentGroup.length - 1],
    )
      .slice(10)
      .replace(/\s+/g, '')

    modalCompoundRequestStore.setResetValue(
      getResetType(
        currentGroup[currentGroup.length - 1].request[
          currentGroup[currentGroup.length - 1].request.length - 1
        ][1],
      ),
    )

    const params = `{"approx":${approx},"state":${
      stateCondition === '-current-' || !stateCondition
        ? null
        : `"${stateCondition}"`
    },"request":${requestString}}`

    dtreeStore.fetchStatFuncAsync(groupName, params)

    return () => dtreeStore.resetStatFuncData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClose = () => {
    dtreeStore.closeModalEditCompoundRequest()
  }

  return (
    <ModalBase refer={ref} minHeight={300}>
      <HeaderModal
        groupName={dtreeStore.groupNameToChange}
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

        <AllNotModalMods />
      </div>

      <div className="flex flex-col w-full mt-4 text-14">
        {requestCondition.map((item: any[], index: number) => (
          <div
            className={cn(
              'flex justify-between w-full shadow-dark py-2 my-2 px-2 cursor-pointer step-content-area',
              index === activeRequestIndex ? 'bg-blue-medium' : 'bg-white',
            )}
            key={Math.random()}
            onClick={(e: any) =>
              modalCompoundRequestStore.setActiveRequest(index, e)
            }
          >
            <div className="flex cursor-pointer step-content-area">
              <InputNumber
                value={item[0]}
                onChange={(e: any) =>
                  modalCompoundRequestStore.changeRequestConditionNumber(
                    index,
                    e.target.value,
                  )
                }
                className="shadow-dark w-1/3 h-5"
              />
            </div>

            <div className="flex flex-1 justify-between step-content-area">
              {problemGroups.map((group: string, currNo: number) => (
                <div
                  className="step-content-area"
                  onClick={(e: any) =>
                    modalCompoundRequestStore.setActiveRequest(index, e)
                  }
                  key={group}
                >
                  <span className="cursor-pointer step-content-area">
                    {group}
                  </span>

                  <Select
                    onChange={(e: any) =>
                      modalCompoundRequestStore.setSingleScenario(
                        index,
                        currNo,
                        e.target,
                      )
                    }
                    className="w-auto ml-1"
                    options={selectOptions}
                    value={modalCompoundRequestStore.getSelectedValue(
                      group,
                      index,
                    )}
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
            onClick={() =>
              modalCompoundRequestStore.setRequestBlocksAmount('ADD')
            }
            text="Add"
            variant={'secondary'}
            className={cn('mr-4')}
            disabled={requestCondition.length === 5}
            dataTestId={DecisionTreeModalDataCy.addButton}
          />

          <Button
            onClick={() =>
              modalCompoundRequestStore.setRequestBlocksAmount('REMOVE')
            }
            text="Remove"
            variant={'secondary'}
            className={cn(
              'border-red-secondary hover:text-white hover:bg-red-secondary',
            )}
            disabled={requestCondition.length === 1}
            dataTestId={DecisionTreeModalDataCy.removeButton}
          />
        </div>

        <div className="flex w-1/2">
          <span>{t('dtree.reset')}</span>

          <Select
            options={resetOptions}
            value={resetValue}
            onChange={(e: any) =>
              modalCompoundRequestStore.setComplexScenario(e.target.value)
            }
            className="w-full ml-2"
            reset
            data-testid={DecisionTreeModalDataCy.selectReset}
          />
        </div>
      </div>

      <DisabledVariantsAmount variants={variants} disabled={true} />

      <EditModalButtons
        handleClose={handleClose}
        handleSaveChanges={() => modalCompoundRequestStore.saveChanges()}
        disabled={!variants}
      />
    </ModalBase>
  )
})
