import noop from 'lodash/noop'
import { observer } from 'mobx-react-lite'

import {
  ISimplePopperModalProps,
  SimplePopperModal,
} from '@components/simple-popper-modal/simple-popper-modal'
import { SimplePopperModalItem } from '@components/simple-popper-modal/simple-popper-modal-item'
import handleDatasetStore from '../handle-dataset.store'

export const HandleDatasetModal = observer(
  ({ close }: ISimplePopperModalProps) => {
    return (
      <SimplePopperModal close={close} className="w-32">
        <SimplePopperModalItem
          onClick={() => {
            handleDatasetStore.toggleImportModal(true)
            close()
          }}
          iconName="Import"
        >
          Import
        </SimplePopperModalItem>
        <SimplePopperModalItem
          isDisabled={handleDatasetStore.isExportDisabled}
          onClick={
            !handleDatasetStore.isExportDisabled
              ? () => {
                  handleDatasetStore.toggleExportModal(true)
                  close()
                }
              : noop
          }
          iconName="Export"
        >
          Export
        </SimplePopperModalItem>
      </SimplePopperModal>
    )
  },
)
