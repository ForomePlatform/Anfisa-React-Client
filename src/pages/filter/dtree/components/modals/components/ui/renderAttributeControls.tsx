import { ActionType } from '@declarations'
import { ViewTypeDashboard } from '@core/enum/view-type-dashboard-enum'
import dashboardStore from '@pages/filter/common/dashboard'
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
}: IRenderAttributeDialogControlsProps) => {
  const handleAddAttribute = (action: ActionType) => {
    if (dashboardStore.viewType === ViewTypeDashboard.Tile) {
      dashboardStore.toggleViewType(ViewTypeDashboard.List)
    }
    addAttribute(action)
  }

  const handleSaveChanges = () => {
    if (dashboardStore.viewType === ViewTypeDashboard.Tile) {
      dashboardStore.toggleViewType(ViewTypeDashboard.List)
    }
    saveAttribute()
  }

  return initialCondition ? (
    <EditModalButtons
      handleClose={onClose}
      handleSaveChanges={handleSaveChanges}
      disabled={disabled}
    />
  ) : (
    <SelectModalButtons
      currentGroup={currentStepGroups}
      handleClose={onClose}
      handleModals={handleModals}
      disabled={disabled}
      handleAddAttribute={action => handleAddAttribute(action)}
    />
  )
}
