import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { Checkbox } from '@ui/checkbox/checkbox'
import { PopupCard } from '@components/popup-card/popup-card'
import { Portal } from '@components/portal/portal'
import handleDatasetStore from '../handle-dataset.store'

export const ExportModal = observer(() => {
  useEffect(() => () => handleDatasetStore.resetExportData(), [])

  return (
    <Portal>
      <PopupCard
        title="Export Dataset"
        onClose={() => handleDatasetStore.toggleExportModal(false)}
        applyText="Export"
        className="w-80"
        onApply={handleDatasetStore.exportDataset}
        isLoading={handleDatasetStore.isExporting}
      >
        <Checkbox
          id={Math.random()}
          checked={handleDatasetStore.isSupportSelected}
          className="mb-4 text-12"
          onChange={e => handleDatasetStore.toggleSupport(e.target.checked)}
        >
          with support
        </Checkbox>

        <Checkbox
          id={Math.random()}
          checked={handleDatasetStore.isDocumentationSelected}
          className="mb-4 text-12"
          onChange={e =>
            handleDatasetStore.toggleDocumentation(e.target.checked)
          }
        >
          with documentation
        </Checkbox>
      </PopupCard>
    </Portal>
  )
})
