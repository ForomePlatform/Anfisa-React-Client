import { ReactElement, useEffect, useState } from 'react'
import { reaction } from 'mobx'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import { ModeTypes } from '@core/enum/mode-types-enum'
import dtreeStore from '@store/dtree'
import activeStepStore from '@store/dtree/step.store'
import { InheritanceModeContent } from '@pages/filter/dtree/components/modals/components/modal-inheritance-mode/components/inheritance-mode-content'
import modalsControlStore from '../../modals-control-store'
import modalsVisibilityStore from '../../modals-visibility-store'
import { EditModalButtons } from '../ui/edit-modal-buttons'
import { HeaderModal } from '../ui/header-modal'
import { ModalBase } from '../ui/modal-base'
import { SelectModalButtons } from '../ui/select-modal-buttons'
import modalInheritanceModeStore from './modal-inheritance-mode.store'

export const ModalInheritanceMode = observer((): ReactElement => {
  const { groupName, problemGroups, currentStepGroups } = modalsControlStore

  const currentStepIndex = activeStepStore.activeStepIndex
  const currentGroupIndex = modalsVisibilityStore.groupIndexToChange

  const currentGroup =
    dtreeStore.stepData[currentStepIndex].groups[currentGroupIndex]

  const currentGroupToModify = dtreeStore.stepData[currentStepIndex].groups

  const selectedGroupsAmount = currentGroup ? dtreeStore.selectedFilters : []

  const [selectedProblemGroups, setSelectedProblemGroups] = useState<string[]>(
    modalInheritanceModeStore.getSelectedProblemGroups(currentGroup),
  )

  useEffect(() => {
    if (currentGroup) {
      modalInheritanceModeStore.checkExistedSelectedFilters(currentGroup)
    }
  }, [currentGroup])

  useEffect(() => {
    const dispose = reaction(
      () => dtreeStore.selectedFilters,
      () => {
        if (dtreeStore.selectedFilters.length < 2) {
          modalInheritanceModeStore.currentMode === ModeTypes.All &&
            modalInheritanceModeStore.resetCurrentMode()
        }

        if (dtreeStore.selectedFilters.length < 1) {
          modalInheritanceModeStore.resetCurrentMode()
        }
      },
    )

    return () => dispose()
  }, [])

  useEffect(() => {
    const params = `{"problem_group":["${selectedProblemGroups
      .toString()
      .split(',')
      .join('","')}"]}`

    modalInheritanceModeStore.fetchStatFunc(groupName, params)

    return () => {
      dtreeStore.resetSelectedFilters()
      dtreeStore.resetStatFuncData()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setProblemGroups = (checked: boolean, value: string) => {
    modalInheritanceModeStore.setProblemGroups({
      checked,
      value,
      groupName,
      setSelectedProblemGroups,
    })
  }

  const addAttribute = (action: ActionType) => {
    modalInheritanceModeStore.addAttribute(action, selectedProblemGroups)
  }

  return (
    <ModalBase minHeight={340}>
      <HeaderModal
        groupName={modalsVisibilityStore.groupNameToChange}
        handleClose={() => modalInheritanceModeStore.closeModal()}
      />

      <InheritanceModeContent
        problemGroups={problemGroups}
        setProblemGroups={setProblemGroups}
        selectedProblemGroups={selectedProblemGroups}
        handleReset={() =>
          modalInheritanceModeStore.resetProblemGroups(
            groupName,
            setSelectedProblemGroups,
          )
        }
        currentGroup={currentGroup}
      />

      {currentGroup ? (
        <EditModalButtons
          handleClose={() => modalInheritanceModeStore.closeModal()}
          handleSaveChanges={() =>
            modalInheritanceModeStore.saveChanges(selectedProblemGroups)
          }
          disabled={
            selectedGroupsAmount.length === 0 ||
            selectedProblemGroups.length === 0
          }
        />
      ) : (
        <SelectModalButtons
          handleClose={() => modalInheritanceModeStore.closeModal()}
          handleModals={() => modalInheritanceModeStore.openModalAttribute()}
          handleModalJoin={() => modalsControlStore.openModalJoin()}
          handleAddAttribute={addAttribute}
          disabled={dtreeStore.selectedFilters.length === 0}
          currentGroup={currentGroupToModify ?? currentStepGroups}
        />
      )}
    </ModalBase>
  )
})
