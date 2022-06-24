import { observer } from 'mobx-react-lite'

import { usePopover } from '@core/hooks/use-popover'
import { HandleDatasetButton } from '@pages/main/components/handle-dataset/handle-dataset-button'
import { ExportDialog } from '../dialogs/export-dialog'
import { ImportDialog } from '../dialogs/import-dialog'
import handleDatasetStore from './handle-dataset.store'
import { HandleDatasetPopover } from './handle-dataset-popover'

export const HandleDataset = observer(() => {
  const { popoverAnchor, isPopoverOpen, onToggle, closePopover } = usePopover()

  const handleOpenImportDialog = () => {
    closePopover()
    handleDatasetStore.toggleImportModal(true)
  }

  const handleOpenExportDialog = () => {
    if (handleDatasetStore.isExportDisabled) {
      return
    }

    closePopover()
    handleDatasetStore.toggleExportModal(true)
  }
  return (
    <div className="ml-4 flex">
      <HandleDatasetButton onShowPopover={onToggle} />

      <HandleDatasetPopover
        isOpen={isPopoverOpen}
        disabled={handleDatasetStore.isExportDisabled}
        anchorEl={popoverAnchor}
        onToggleImport={handleOpenImportDialog}
        onToggleExport={handleOpenExportDialog}
        onClose={closePopover}
      />
      <ImportDialog />

      <ExportDialog />
    </div>
  )
})
