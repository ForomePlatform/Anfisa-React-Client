import { ReactElement, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import { ModalTypeEnum } from '@core/enum/modal-type-enum'
import dtreeStore from '@store/dtree'
import { HeaderModal } from '../../../query-builder/ui/header-modal'
import { InheritanceModeContent } from '../../../query-builder/ui/inheritance-mode-content'
import { ModalBase } from '../../../query-builder/ui/modal-base'
import { SelectModalButtons } from '../../../query-builder/ui/select-modal-buttons'
import modalEditStore from '../../modal-edit.store'
import modalInheritanceModeStore from './modal-inheritance-mode.store'

export const ModalSelectInheritanceMode = observer((): ReactElement => {
  const ref = useRef(null)

  const { currentGroup, groupName, problemGroups } = modalEditStore

  const [selectedProblemGroups, setSelectedProblemGroups] = useState<string[]>(
    [],
  )

  useEffect(() => {
    const params = `{"problem_group":["${selectedProblemGroups
      .toString()
      .split(',')
      .join('","')}"]}`

    const initAsync = async () => {
      await dtreeStore.fetchStatFuncAsync(groupName, params)
    }

    initAsync()

    return () => {
      dtreeStore.resetSelectedFilters()
      dtreeStore.resetStatFuncData()
    }

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

  const addAttribute = (action: ActionType) => {
    modalInheritanceModeStore.addAttribute(action, selectedProblemGroups)
  }

  return (
    <ModalBase refer={ref} minHeight={340}>
      <HeaderModal
        groupName={dtreeStore.groupNameToChange}
        handleClose={() =>
          modalInheritanceModeStore.closeModal(ModalTypeEnum.Select)
        }
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

      <SelectModalButtons
        handleClose={() =>
          modalInheritanceModeStore.closeModal(ModalTypeEnum.Select)
        }
        handleModals={() => modalInheritanceModeStore.openModalAttribute()}
        handleModalJoin={() => dtreeStore.openModalJoin()}
        handleAddAttribute={addAttribute}
        disabled={dtreeStore.selectedFilters.length === 0}
        currentGroup={currentGroup}
      />
    </ModalBase>
  )
})
