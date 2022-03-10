import { ReactElement, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'

import dtreeStore from '@store/dtree'
import { HeaderModal } from '@pages/filter/ui/query-builder/ui/header-modal'
import { InheritanceModeContent } from '@pages/filter/ui/query-builder/ui/inheritance-mode-content'
import { ModalBase } from '@pages/filter/ui/query-builder/ui/modal-base'
import modalEditStore from '../../modal-edit.store'
import { EditModalButtons } from '../edit-modal-buttons'
import modalInheritanceModeStore from './modal-inheritance-mode.store'

export const ModalEditInheritanceMode = observer((): ReactElement => {
  const ref = useRef(null)

  const {
    currentStepIndex,
    currentGroupIndex,
    currentGroup,
    groupName,
    selectedGroupsAmount,
    currentGroupLength,
    problemGroups,
  } = modalEditStore

  const [selectedProblemGroups, setSelectedProblemGroups] = useState<string[]>(
    (Object.values(currentGroup[currentGroup.length - 1])[0] as string[]) || [],
  )

  useEffect(() => {
    dtreeStore.stepData[currentStepIndex].groups[currentGroupIndex]
      .find((elem: any) => Array.isArray(elem))
      .map((item: string) => dtreeStore.addSelectedFilter(item))

    return () => {
      dtreeStore.resetSelectedFilters()
    }
  }, [currentGroupIndex, currentGroupLength, currentStepIndex])

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
    modalInheritanceModeStore.setProblemGroups(
      checked,
      value,
      groupName,
      setSelectedProblemGroups,
    )
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
    </ModalBase>
  )
})
