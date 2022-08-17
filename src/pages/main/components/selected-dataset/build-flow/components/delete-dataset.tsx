import React, { FC } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { useModal } from '@core/hooks/use-modal'
import { t } from '@i18n'
import dirinfoStore from '@store/dirinfo'
import { Dialog } from '@ui/dialog'
import { Icon } from '@ui/icon'

interface IDeleteDatasetProps {
  datasetName: string
  isBucketVisible: boolean
  isActive: boolean
}

export const DeleteDataset: FC<IDeleteDatasetProps> = observer(
  ({ datasetName, isBucketVisible, isActive }) => {
    const [deleteDialog, openDeleteDialog, closeDeleteDialog] = useModal()
    const { isOpen } = deleteDialog

    const handleOnDelete = () => {
      closeDeleteDialog()
      dirinfoStore.deleteDataset(datasetName)
      dirinfoStore.dirinfo.invalidate()
    }

    const onClick = (e: React.MouseEvent) => {
      e.stopPropagation()
      openDeleteDialog()
    }

    return (
      <>
        {isBucketVisible && (
          <button onClick={e => onClick(e)}>
            <Icon
              name="Delete"
              className={cn(
                isActive
                  ? 'text-white hover:text-grey-blue'
                  : 'text-blue-bright hover:text-blue-hover',
              )}
            />
          </button>
        )}

        <Dialog
          isOpen={isOpen}
          onClose={closeDeleteDialog}
          title={t('ds.deleteDialog.title')}
          cancelText={t('ds.deleteDialog.cancel')}
          applyText={t('ds.deleteDialog.confirm')}
          onApply={handleOnDelete}
        >
          <p>{t('ds.deleteDialog.message', { datasetName })}</p>
        </Dialog>
      </>
    )
  },
)
