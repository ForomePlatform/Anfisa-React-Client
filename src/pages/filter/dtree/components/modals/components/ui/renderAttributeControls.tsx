import { ActionType } from '@declarations'
import { TCondition } from '@service-providers/common'
import { EditModalButtons } from './edit-modal-buttons'
import { SelectModalButtons } from './select-modal-buttons'

interface IRenderAttributeDialogControlsProps {
  initialCondition: TCondition | undefined
  currentStepGroups: string[]
  onClose: () => void
  handleModals: () => void
  disabled: boolean
  saveAttribute: () => void
  addAttribute: (action: ActionType) => void
}

export const renderAttributeDialogControls = ({
  initialCondition,
  currentStepGroups,
  onClose,
  handleModals,
  disabled,
  saveAttribute,
  addAttribute,
}: IRenderAttributeDialogControlsProps) =>
  initialCondition ? (
    <EditModalButtons
      handleClose={onClose}
      handleSaveChanges={saveAttribute}
      disabled={disabled}
    />
  ) : (
    <SelectModalButtons
      currentGroup={currentStepGroups}
      handleClose={onClose}
      handleModals={handleModals}
      disabled={disabled}
      handleAddAttribute={action => addAttribute(action)}
    />
  )
