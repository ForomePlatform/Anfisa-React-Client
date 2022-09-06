import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import { Dialog } from '@ui/dialog'
import { NumericCondition } from '@components/conditions/numeric'
import {
  AttributeKinds,
  TNumericConditionBounds,
} from '@service-providers/common'
import { INumericDialogProps } from '../../modals.interfaces'
import modalsControlStore from '../../modals-control-store'
import modalsVisibilityStore from '../../modals-visibility-store'
import { renderAttributeDialogControls } from '../ui/renderAttributeControls'

export const NumericDialog = observer(
  ({
    attributeStore,
    onAddNumeric,
    onSaveNumeric,
  }: INumericDialogProps): ReactElement | null => {
    const {
      attributeStatus,
      initialCondition,
      initialNumericValue,
      attributeName,
    } = attributeStore

    const { currentStepGroups } = modalsControlStore

    if (!attributeStatus || attributeStatus.kind !== 'numeric') {
      return null
    }

    const handleModals = () => {
      modalsVisibilityStore.closeNumericDialog()
      modalsVisibilityStore.openSelectAttributeDialog()
    }

    const handleSaveChanges = (value: TNumericConditionBounds) => {
      onSaveNumeric({
        attributeKind: AttributeKinds.NUMERIC,
        attributeName,
        value,
      })
      modalsVisibilityStore.closeNumericDialog()
    }

    const handleAddAttribute = (
      action: ActionType,
      value: TNumericConditionBounds,
    ) => {
      onAddNumeric({
        action,
        attributeKind: AttributeKinds.NUMERIC,
        attributeName,
        value,
      })

      modalsVisibilityStore.closeNumericDialog()
    }

    return (
      <Dialog
        isOpen={modalsVisibilityStore.isNumericDialogVisible}
        onClose={modalsVisibilityStore.closeNumericDialog}
        title={attributeName}
        width="m"
        isHiddenActions={true}
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
  },
)
