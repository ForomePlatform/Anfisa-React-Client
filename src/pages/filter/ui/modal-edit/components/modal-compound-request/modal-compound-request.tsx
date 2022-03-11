import { ReactElement, useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import dtreeStore from '@store/dtree'
import { AllNotModalMods } from '@pages/filter/ui/query-builder/ui/all-not-modal-mods'
import { ApproxStateModalMods } from '@pages/filter/ui/query-builder/ui/approx-state-modal-mods'
import { DisabledVariantsAmount } from '@pages/filter/ui/query-builder/ui/disabled-variants-amount'
import { HeaderModal } from '@pages/filter/ui/query-builder/ui/header-modal'
import { ModalBase } from '@pages/filter/ui/query-builder/ui/modal-base'
import { SelectModalButtons } from '@pages/filter/ui/query-builder/ui/select-modal-buttons'
import { getFuncParams } from '@utils/getFuncParams'
import { getResetType } from '@utils/getResetType'
import modalEditStore from '../../modal-edit.store'
import { EditModalButtons } from '../edit-modal-buttons'
import { RequestBlock } from './components/request-block'
import { RequestControlButtons } from './components/request-control-buttons'
import modalCompoundRequestStore from './modal-compound-request.store'

export const ModalCompoundRequest = observer((): ReactElement => {
  const ref = useRef(null)

  const { currentGroup, variants, approxValues, approxOptions, groupName } =
    modalEditStore

  const {
    stateCondition,
    requestCondition,
    approxCondition,
    stateOptions,
    activeRequestIndex,
  } = modalCompoundRequestStore

  const handleSetCondition = (value: string, type: string) => {
    modalCompoundRequestStore.setCondition(value, type)
  }

  useEffect(() => {
    if (currentGroup) {
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
    }

    return () => dtreeStore.resetStatFuncData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClose = () => {
    dtreeStore.closeModalCompoundRequest()
  }

  const handleAddAttribute = (action: ActionType) => {
    modalCompoundRequestStore.addAttribute(action)
  }

  return (
    <ModalBase refer={ref} minHeight={300}>
      <HeaderModal groupName={groupName} handleClose={handleClose} />

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
          <RequestBlock
            key={item[index] + index}
            index={index}
            activeRequestIndex={activeRequestIndex}
            item={item}
          />
        ))}
      </div>

      <RequestControlButtons />

      <DisabledVariantsAmount variants={variants} disabled={true} />

      {currentGroup ? (
        <EditModalButtons
          handleClose={handleClose}
          handleSaveChanges={() => modalCompoundRequestStore.saveChanges()}
          disabled={!variants}
        />
      ) : (
        <SelectModalButtons
          handleClose={() => modalCompoundRequestStore.closeModal()}
          handleModals={() => modalCompoundRequestStore.openModalAttribute()}
          handleModalJoin={() => modalCompoundRequestStore.openModalJoin()}
          disabled={!variants}
          currentGroup={currentGroup}
          handleAddAttribute={handleAddAttribute}
        />
      )}
    </ModalBase>
  )
})
