import { ReactElement, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import { ModeTypes } from '@core/enum/mode-types-enum'
import dtreeStore from '@store/dtree'
import activeStepStore from '@pages/filter/dtree/active-step.store'
import dtreeModalStore from '@pages/filter/dtree/modals/modals-visibility.store'
import { AllNotMods } from '@pages/filter/dtree/ui/query-builder/ui/all-not-mods'
import { SelectModalButtons } from '@pages/filter/dtree/ui/query-builder/ui/select-modal-buttons'
import { ApproxStateModalMods } from '../../../ui/query-builder/ui/approx-state-modal-mods'
import { DisabledVariantsAmount } from '../../../ui/query-builder/ui/disabled-variants-amount'
import { HeaderModal } from '../../../ui/query-builder/ui/header-modal'
import { ModalBase } from '../../../ui/query-builder/ui/modal-base'
import modalEditStore from '../../modals-control.strore'
import { EditModalButtons } from '../edit-modal-buttons'
import modalCompoundHetStore from './modal-compound-het.store'

export const ModalCompoundHet = observer((): ReactElement => {
  const { variants, approxValues, approxOptions, currentStepGroups } =
    modalEditStore

  const { stateOptions, stateCondition, approxCondition } =
    modalCompoundHetStore

  const currentStepIndex = activeStepStore.activeStepIndex
  const currentGroupIndex = dtreeModalStore.groupIndexToChange

  const currentGroup =
    dtreeStore.stepData[currentStepIndex].groups[currentGroupIndex]

  const currentGroupToModify = dtreeStore.stepData[currentStepIndex].groups

  useEffect(() => {
    modalCompoundHetStore.fetchStatFunc(currentGroup)

    return () => dtreeStore.resetStatFuncData()
  }, [currentGroup])

  const handleSetCondition = (value: string, type: string) => {
    modalCompoundHetStore.setCondition(value, type)
  }

  const handleAddAttribute = (action: ActionType) => {
    modalCompoundHetStore.addAttribute(action)
  }

  return (
    <ModalBase minHeight={250}>
      <HeaderModal
        groupName={dtreeModalStore.groupNameToChange}
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

        <AllNotMods
          isNotModeChecked={modalCompoundHetStore.currentMode === ModeTypes.Not}
          isNotModeDisabled={variants ? variants.length === 0 : true}
          toggleNotMode={() =>
            modalCompoundHetStore.setCurrentMode(ModeTypes.Not)
          }
        />
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
          handleModalJoin={() => modalEditStore.openModalJoin()}
          disabled={!variants}
          currentGroup={currentGroupToModify ?? currentStepGroups}
          handleAddAttribute={handleAddAttribute}
        />
      )}
    </ModalBase>
  )
})
