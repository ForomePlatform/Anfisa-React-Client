import Checkbox from 'react-three-state-checkbox'
import { observer } from 'mobx-react-lite'

import { PopperModal } from '@components/popper-modal/PopperModal'
import { Portal } from '@components/portal/portal'
import handleDatasetStore from '../handle-dataset.store'

export const ExportModal = observer(() => {
  return (
    <Portal>
      <PopperModal
        title="Export Dataset"
        onClose={() => handleDatasetStore.toggleExportModal(false)}
        position={'absolute'}
        applyText="Export"
        className="w-80"
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
