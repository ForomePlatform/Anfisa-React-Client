import styles from './secondary-ds.module.css'

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
  isAbleToBeDropped: boolean
  isActive: boolean
}

export const DeleteDataset: FC<IDeleteDatasetProps> = observer(
  ({ datasetName, isAbleToBeDropped, isActive }) => {
    const [deleteDialog, openDeleteDialog, closeDeleteDialog] = useModal()
    const { isOpen } = deleteDialog

    const handleOnDelete = () => {
      closeDeleteDialog()
      dirinfoStore.deleteDataset(datasetName)

      setTimeout(() => {
        dirinfoStore.dirinfo.invalidate()
      }, 0)
    }

    const onClick = (e: React.MouseEvent) => {
      e.stopPropagation()
      openDeleteDialog()
    }

    return (
      <>
        {isAbleToBeDropped && (
          <button onClick={e => onClick(e)}>
            <Icon
              name="Delete"
              className={cn(
                isActive ? styles.deleteBucket_active : styles.deleteBucket,
                'delete-bucket',
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
          <span>{t('ds.deleteDialog.message', { datasetName })}</span>
        </Dialog>
      </>
    )
  },
)
