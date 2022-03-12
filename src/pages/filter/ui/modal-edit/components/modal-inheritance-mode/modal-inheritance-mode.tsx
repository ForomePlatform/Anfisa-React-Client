import { ReactElement, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import dtreeStore from '@store/dtree'
import { InheritanceModeContent } from '@pages/filter/ui/modal-edit/components/modal-inheritance-mode/components/inheritance-mode-content'
import { HeaderModal } from '@pages/filter/ui/query-builder/ui/header-modal'
import { ModalBase } from '@pages/filter/ui/query-builder/ui/modal-base'
import { SelectModalButtons } from '@pages/filter/ui/query-builder/ui/select-modal-buttons'
import modalEditStore from '../../modal-edit.store'
import { EditModalButtons } from '../edit-modal-buttons'
import modalInheritanceModeStore from './modal-inheritance-mode.store'

export const ModalInheritanceMode = observer((): ReactElement => {
  const ref = useRef(null)

  const {
    currentStepIndex,
    currentGroupIndex,
    currentGroup,
    groupName,
    selectedGroupsAmount,
    problemGroups,
  } = modalEditStore

  const [selectedProblemGroups, setSelectedProblemGroups] = useState<string[]>(
    currentGroup
      ? (Object.values(currentGroup[currentGroup.length - 1])[0] as string[])
      : [],
  )

  useEffect(() => {
    if (currentGroup) {
      dtreeStore.stepData[currentStepIndex].groups[currentGroupIndex]
        .find((elem: any) => Array.isArray(elem))
        .map((item: string) => dtreeStore.addSelectedFilter(item))
    }

    return () => {
      dtreeStore.resetSelectedFilters()
    }
  }, [currentGroup, currentGroupIndex, currentStepIndex])

  useEffect(() => {
    const params = `{"problem_group":["${selectedProblemGroups
      .toString()
      .split(',')
      .join('","')}"]}`

    const initAsync = async () => {
      await dtreeStore.fetchStatFuncAsync(groupName, params)
    }

    initAsync()

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
    <ModalBase refer={ref} minHeight={340}>
      <HeaderModal
        groupName={dtreeStore.groupNameToChange}
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
          handleModalJoin={() => dtreeStore.openModalJoin()}
          handleAddAttribute={addAttribute}
          disabled={dtreeStore.selectedFilters.length === 0}
          currentGroup={currentGroup}
        />
      )}
    </ModalBase>
  )
})
