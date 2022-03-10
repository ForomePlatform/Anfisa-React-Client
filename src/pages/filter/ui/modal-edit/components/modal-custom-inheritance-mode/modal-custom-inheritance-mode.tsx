import { ReactElement, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import dtreeStore from '@store/dtree'
import { SelectModalButtons } from '@pages/filter/ui/query-builder/ui/select-modal-buttons'
import dtreeModalStore from '../../../../modals.store'
import { CustomInheritanceModeContent } from '../../../query-builder/ui/custom-inheritance-mode-content'
import { HeaderModal } from '../../../query-builder/ui/header-modal'
import { ModalBase } from '../../../query-builder/ui/modal-base'
import modalEditStore from '../../modal-edit.store'
import { EditModalButtons } from '../edit-modal-buttons'
import modalCustomInheritanceModeStore from './modal-custom-inheritance-mode.store'

export const ModalCustomInheritanceMode = observer((): ReactElement => {
  const { currentGroup, variants, problemGroups, currentStepGroups } =
    modalEditStore

  const selectValues = modalCustomInheritanceModeStore.selectValues

  useEffect(() => {
    if (currentGroup) {
      modalCustomInheritanceModeStore.checkExistedSelectedFilters()
    }
    return () => dtreeStore.resetStatFuncData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const selectStates = [
    selectValues.first,
    selectValues.second,
    selectValues.third,
  ]

  const handleSetSingleScenario = (group: string, value: string) => {
    modalCustomInheritanceModeStore.setSingleScenario(group, value)
  }

  const handleSetComplexScenario = (name: string) => {
    modalCustomInheritanceModeStore.prepareAndSetComplexScenario(name)
  }

  const handleAddAttribute = (action: ActionType) => {
    modalCustomInheritanceModeStore.addAttribute(action)
  }

  return (
    <ModalBase minHeight={250}>
      <HeaderModal
        groupName={dtreeModalStore.groupNameToChange}
        handleClose={() => modalCustomInheritanceModeStore.closeModal()}
      />

      <CustomInheritanceModeContent
        problemGroups={problemGroups}
        handleSetScenario={handleSetSingleScenario}
        selectStates={selectStates}
        handleReset={handleSetComplexScenario}
        resetValue={modalCustomInheritanceModeStore.resetValue}
      />

      {currentGroup ? (
        <EditModalButtons
          handleClose={() => modalCustomInheritanceModeStore.closeModal()}
          handleSaveChanges={() =>
            modalCustomInheritanceModeStore.saveChanges()
          }
          disabled={!variants}
        />
      ) : (
        <SelectModalButtons
          handleClose={() => modalCustomInheritanceModeStore.closeModal()}
          handleModals={() =>
            modalCustomInheritanceModeStore.openModalAttribute()
          }
          handleModalJoin={() => modalEditStore.openModalJoin()}
          handleAddAttribute={handleAddAttribute}
          disabled={!variants}
          currentGroup={currentStepGroups}
        />
      )}
    </ModalBase>
  )
})
