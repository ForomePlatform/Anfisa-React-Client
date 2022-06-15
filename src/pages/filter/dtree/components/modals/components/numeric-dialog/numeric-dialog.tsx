import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import { Dialog } from '@ui/dialog'
import { NumericCondition } from '@components/conditions/numeric'
import {
  AttributeKinds,
  TNumericConditionBounds,
} from '@service-providers/common'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { changeNumericAttribute } from '@utils/changeAttribute/changeNumericAttribute'
import { dtreeAttributeStore } from '../../../attributes/dtree-attributes.store'
import modalsControlStore from '../../modals-control-store'
import modalsVisibilityStore from '../../modals-visibility-store'
import { renderAttributeDialogControls } from '../ui/renderAttributeControls'

export const NumericDialog = observer((): ReactElement | null => {
  const {
    attributeStatus,
    initialCondition,
    initialNumericValue,
    attributeName,
  } = dtreeAttributeStore

  const { currentStepGroups } = modalsControlStore

  if (!attributeStatus || attributeStatus.kind !== 'numeric') {
    return null
  }

  const handleModals = () => {
    modalsVisibilityStore.closeNumericDialog()
    modalsVisibilityStore.openModalAttribute()
  }

  const handleSaveChanges = (value: TNumericConditionBounds) => {
    changeNumericAttribute(value)
    modalsVisibilityStore.closeNumericDialog()
  }

  const handleAddAttribute = (
    action: ActionType,
    value: TNumericConditionBounds,
  ) => {
    addAttributeToStep({
      action,
      attributeType: AttributeKinds.NUMERIC,
      filters: value,
    })
    modalsVisibilityStore.closeNumericDialog()
  }

  return (
    <Dialog
      isOpen={modalsVisibilityStore.isNumericDialogVisible}
      onClose={modalsVisibilityStore.closeNumericDialog}
      title={attributeName}
      width="m"
      actions={''}
    >
      <NumericCondition
        className="pt-3"
        attrData={attributeStatus}
        initialValue={initialNumericValue}
        controls={({ value, hasErrors }) => {
          const disabled =
            hasErrors ||
            (value[0] == null && value[2] == null) ||
            (typeof attributeStatus.min !== 'number' &&
              typeof attributeStatus.max !== 'number')

          return renderAttributeDialogControls({
            initialCondition,
            currentStepGroups,
            onClose: modalsVisibilityStore.closeNumericDialog,
            handleModals,
            disabled,
            saveAttribute: () => handleSaveChanges(value),
            addAttribute: action => handleAddAttribute(action, value),
          })
        }}
      />
    </Dialog>
  )
})
