import { ReactElement, useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import dtreeStore from '@store/dtree'
import { getFuncParams } from '@utils/getFuncParams'
import { getResetType } from '@utils/getResetType'
import { CustomInheritanceModeContent } from '../../../query-builder/ui/custom-inheritance-mode-content'
import { HeaderModal } from '../../../query-builder/ui/header-modal'
import { ModalBase } from '../../../query-builder/ui/modal-base'
import modalEditStore from '../../modal-edit.store'
import { EditModalButtons } from '../edit-modal-buttons'
import modalCustomInheritanceModeStore from './modal-custom-inheritance-mode.store'

export const ModalEditCustomInheritanceMode = observer((): ReactElement => {
  const ref = useRef(null)

  const { currentGroup, groupName, variants, problemGroups } = modalEditStore

  const { resetValue, firstSelectValue, secondSelectValue, thirdSelectValue } =
    modalCustomInheritanceModeStore

  useEffect(() => {
    const scenarioString = getFuncParams(
      groupName,
      currentGroup[currentGroup.length - 1],
    )
      .slice(10)
      .replace(/\s+/g, '')

    modalCustomInheritanceModeStore.setResetValue(
      getResetType(currentGroup[currentGroup.length - 1].scenario),
    )

    const params = `{"scenario":${scenarioString}}`

    dtreeStore.fetchStatFuncAsync(groupName, params)

    return () => dtreeStore.resetStatFuncData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const selectStates = [firstSelectValue, secondSelectValue, thirdSelectValue]

  const handleSetSingleScenario = (group: string, value: string) => {
    modalCustomInheritanceModeStore.setSingleScenario(group, value)
  }

  const handleSetComplexScenario = (name: string) => {
    modalCustomInheritanceModeStore.setComplexScenario(name)
  }

  return (
    <ModalBase refer={ref} minHeight={250}>
      <HeaderModal
        groupName={dtreeStore.groupNameToChange}
        handleClose={() => modalCustomInheritanceModeStore.closeModal()}
      />

      <CustomInheritanceModeContent
        problemGroups={problemGroups}
        handleSetScenario={handleSetSingleScenario}
        selectStates={selectStates}
        handleReset={handleSetComplexScenario}
        resetValue={resetValue}
      />

      <EditModalButtons
        handleClose={() => modalCustomInheritanceModeStore.closeModal()}
        handleSaveChanges={() => modalCustomInheritanceModeStore.saveChanges()}
        disabled={!variants}
      />
    </ModalBase>
  )
})
