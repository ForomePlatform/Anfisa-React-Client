import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import dtreeStore from '@store/dtree'
import { EnumCondition } from '@components/enum-condition/enum-condition'
import { BaseAttributeStore } from '@pages/filter/common/attributes/base-attribute.store'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { changeEnumAttribute } from '@utils/changeAttribute/changeEnumAttribute'
import activeStepStore from '../../../active-step.store'
import modalsControlStore from '../../modals-control-store'
import modalsVisibilityStore from '../../modals-visibility-store'
import { HeaderModal } from '../ui/header-modal'
import { ModalBase } from '../ui/modal-base'

export const ModalEnum = observer((): ReactElement => {
  const attributeStatus = modalsControlStore.attributeStatusToChange
  const currentStepIndex = activeStepStore.activeStepIndex
  const currentGroupIndex = modalsVisibilityStore.groupIndexToChange
  const initialCondition =
    dtreeStore.stepData[currentStepIndex].groups[currentGroupIndex]

  const {
    attributeName,
    enumVariants,
    attributeSubKind,
    initialEnumVariants,
    initialEnumMode,
  } = new BaseAttributeStore(attributeStatus, initialCondition)

  const saveEnum = (
    selectedVariants: string[],
    mode: ModeTypes | undefined,
  ) => {
    changeEnumAttribute(mode, selectedVariants)
    modalsVisibilityStore.closeModalEnum()
  }

  const addEnum = (
    action: ActionType,
    mode: ModeTypes | undefined,
    selectedVariants: string[],
  ) => {
    addAttributeToStep(
      action,
      FilterKindEnum.Enum,
      selectedVariants,
      null,
      mode,
    )
    modalsVisibilityStore.closeModalEnum()
  }

  return (
    <ModalBase minHeight={200}>
      <HeaderModal
        groupName={attributeName}
        handleClose={modalsVisibilityStore.closeModalEnum}
      />

      <EnumCondition
        attributeName={attributeName}
        enumVariants={enumVariants}
        attributeSubKind={attributeSubKind}
        initialEnumVariants={initialEnumVariants}
        initialEnumMode={initialEnumMode}
        initialCondition={initialCondition}
        currentStepGroups={
          dtreeStore.stepData[activeStepStore.activeStepIndex].groups
        }
        saveEnum={saveEnum}
        addEnum={addEnum}
      />
    </ModalBase>
  )
})
