import { ReactElement, useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import dtreeStore from '@store/dtree'
import { SelectModalButtons } from '@pages/filter/ui/query-builder/ui/select-modal-buttons'
import { AllNotModalMods } from '../../../query-builder/ui/all-not-modal-mods'
import { ApproxStateModalMods } from '../../../query-builder/ui/approx-state-modal-mods'
import { DisabledVariantsAmount } from '../../../query-builder/ui/disabled-variants-amount'
import { HeaderModal } from '../../../query-builder/ui/header-modal'
import { ModalBase } from '../../../query-builder/ui/modal-base'
import modalEditStore from '../../modal-edit.store'
import { EditModalButtons } from '../edit-modal-buttons'
import modalCompoundHetStore from './modal-compound-het.store'

export const ModalCompoundHet = observer((): ReactElement => {
  const ref = useRef(null)

  const { groupName, variants, currentGroup } = modalEditStore

  const {
    approxValues,
    approxOptions,
    stateOptions,
    stateCondition,
    approxCondition,
  } = modalCompoundHetStore

  useEffect(() => {
    const params = `{"approx":${modalCompoundHetStore.getApprox(
      approxCondition,
    )},"state":${
      stateCondition === '-current-' || !stateCondition
        ? null
        : `"${stateCondition}"`
    }}`

    dtreeStore.fetchStatFuncAsync(groupName, params)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSetCondition = (value: string, type: string) => {
    modalCompoundHetStore.setCondition(value, type)
  }

  const handleAddAttribute = (action: ActionType) => {
    modalCompoundHetStore.addAttribute(action)
  }

  return (
    <ModalBase refer={ref} minHeight={250}>
      <HeaderModal
        groupName={dtreeStore.groupNameToChange}
        handleClose={() => modalCompoundHetStore.closeModal()}
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

      <DisabledVariantsAmount variants={variants} disabled={true} />

      {currentGroup ? (
        <EditModalButtons
          handleClose={() => modalCompoundHetStore.closeModal()}
          handleSaveChanges={() => modalCompoundHetStore.saveChanges()}
          disabled={!variants}
        />
      ) : (
        <SelectModalButtons
          handleClose={() => modalCompoundHetStore.closeModal()}
          handleModals={() => modalCompoundHetStore.openModalAttribute()}
          handleModalJoin={() => modalCompoundHetStore.openModalJoin()}
          disabled={!variants}
          currentGroup={currentGroup}
          handleAddAttribute={handleAddAttribute}
        />
      )}
    </ModalBase>
  )
})
