import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { Input } from '@ui/input'
import { PopperModal } from '@components/popper-modal/popper-modal'
import { Portal } from '@components/portal/portal'
import { Upload } from '@components/upload/upload'
import handleDatasetStore from '../handle-dataset.store'

export const ImportModal = observer(() => {
  useEffect(() => () => handleDatasetStore.resetImportData(), [])

  return (
    <Portal>
      <PopperModal
        title="Import Dataset"
        onClose={() => handleDatasetStore.toggleImportModal(false)}
        position={'absolute'}
        applyText="Import"
        className="w-96"
        isApplyDisabled={handleDatasetStore.isImportDisabled}
        onApply={handleDatasetStore.importDataset}
        isLoading={handleDatasetStore.isImporting}
      >
        <div className="mb-4">
          <Input
            value={handleDatasetStore.importDatasetName}
            onChange={e => {
              handleDatasetStore.setDatasetName(e.target.value)
            }}
            label="Dataset Name"
            placeholder="Enter Dataset Name"
          />
        </div>
        <div className="flex items-center mb-4">
          <Upload
            onUpload={handleDatasetStore.setUploadedFiles}
            supportedFormats=".tgz, .gz"
          />
        </div>
      </PopperModal>
    </Portal>
  )
})
