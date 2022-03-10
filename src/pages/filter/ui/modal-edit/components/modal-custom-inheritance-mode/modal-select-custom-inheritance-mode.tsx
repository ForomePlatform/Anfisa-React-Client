import { ReactElement, useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import { ModalTypeEnum } from '@core/enum/modal-type-enum'
import dtreeStore from '@store/dtree'
import { CustomInheritanceModeContent } from '../../../query-builder/ui/custom-inheritance-mode-content'
import { HeaderModal } from '../../../query-builder/ui/header-modal'
import { ModalBase } from '../../../query-builder/ui/modal-base'
import { SelectModalButtons } from '../../../query-builder/ui/select-modal-buttons'
import modalEditStore from '../../modal-edit.store'
import modalCustomInheritanceModeStore from './modal-custom-inheritance-mode.store'

export const ModalSelectCustomInheritanceMode = observer((): ReactElement => {
  const ref = useRef(null)

  const { currentGroup, variants, problemGroups } = modalEditStore

  const { firstSelectValue, secondSelectValue, thirdSelectValue, resetValue } =
    modalCustomInheritanceModeStore

  const selectStates = [firstSelectValue, secondSelectValue, thirdSelectValue]

  const handleSetSingleScenario = (group: string, value: string) => {
    modalCustomInheritanceModeStore.setSingleScenario(group, value)
  }

  const handleSetComplexScenario = (name: string) => {
    modalCustomInheritanceModeStore.setComplexScenario(name)
  }

  const handleAddAttribute = (action: ActionType) => {
    modalCustomInheritanceModeStore.addAttribute(action)
  }

  useEffect(() => {
    return () => dtreeStore.resetStatFuncData()
  }, [])

  return (
    <ModalBase refer={ref} minHeight={250}>
      <HeaderModal
        groupName={dtreeStore.groupNameToChange}
        handleClose={() =>
          modalCustomInheritanceModeStore.closeModal(ModalTypeEnum.Select)
        }
      />

      <CustomInheritanceModeContent
        problemGroups={problemGroups}
        handleSetScenario={handleSetSingleScenario}
        selectStates={selectStates}
        handleReset={handleSetComplexScenario}
        resetValue={resetValue}
      />

      <SelectModalButtons
        handleClose={() =>
          modalCustomInheritanceModeStore.closeModal(ModalTypeEnum.Select)
        }
        handleModals={() =>
          modalCustomInheritanceModeStore.openModalAttribute()
        }
        handleModalJoin={() => modalCustomInheritanceModeStore.openModalJoin()}
        handleAddAttribute={handleAddAttribute}
        disabled={!variants}
        currentGroup={currentGroup}
      />
    </ModalBase>
  )
})
