import { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { useModal } from '@core/hooks/use-modal'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import dirinfoStore from '@store/dirinfo'
import { Routes } from '@router/routes.enum'
import { Button } from '@ui/button'
import { DatasetDeleteDialog } from './dataset-delete-dialog'

interface IProps {
  className?: string
}

export const DeleteDatasetButton = observer(
  ({ className }: IProps): ReactElement => {
    const { isPossibleDeleteDataset, datasetName } = datasetStore

    const [deleteDialog, openDeleteDialog, closeDeleteDialog] = useModal()

    const history = useHistory()

    const handleOnDelete = () => {
      closeDeleteDialog()
      dirinfoStore.deleteDataset(datasetName)
      history.push(Routes.Root)
      dirinfoStore.dirinfo.invalidate()
    }

    return (
      <>
        {isPossibleDeleteDataset && (
          <Button
            text={t('ds.deleteDataset')}
            onClick={() => {
              openDeleteDialog()
            }}
            className={className}
          />
        )}

        <DatasetDeleteDialog
          {...deleteDialog}
          onClose={closeDeleteDialog}
          onDelete={handleOnDelete}
        />
      </>
    )
  },
)
