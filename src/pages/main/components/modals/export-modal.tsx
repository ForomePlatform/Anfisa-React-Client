import Checkbox from 'react-three-state-checkbox'
import { observer } from 'mobx-react-lite'

import { PopperModal } from '@components/popper-modal/popper-modal'
import { Portal } from '@components/portal/portal'
import handleDatasetStore from '../handle-dataset.store'
import { useEffect } from 'react'

export const ExportModal = observer(() => {
  useEffect(() => () => handleDatasetStore.resetExportData(), [])

  return (
    <Portal>
      <PopperModal
        title="Export Dataset"
        onClose={() => handleDatasetStore.toggleExportModal(false)}
        position={'absolute'}
        applyText="Export"
        className="w-80"
        onApply={handleDatasetStore.exportDataset}
        isLoading={handleDatasetStore.isExporting}
      >
        <div className="flex items-center mb-4">
          <Checkbox
            checked={handleDatasetStore.isSupportSelected}
            className="w-4 h-4"
            onChange={e => handleDatasetStore.toggleSupport(e.target.checked)}
          />

          <span className="text-12 ml-1">with support</span>
        </div>
        <div className="flex items-center mb-4">
          <Checkbox
            checked={handleDatasetStore.isDocumentationSelected}
            className="w-4 h-4"
            onChange={e =>
              handleDatasetStore.toggleDocumentation(e.target.checked)
            }
          />

          <span className="text-12 ml-1">with documentation</span>
        </div>
      </PopperModal>
    </Portal>
  )
})
