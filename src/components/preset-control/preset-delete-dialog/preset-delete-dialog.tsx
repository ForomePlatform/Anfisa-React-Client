import { ReactElement } from 'react'

import { t } from '@i18n'
import { Button } from '@ui/button'
import { Dialog } from '@ui/dialog'

interface IPresetDeleteDialog {
  isOpen?: boolean
  onClose: () => void
  onDelete: () => void
  presetName: string
}

export const PresetDeleteDialog = ({
  isOpen,
  onClose,
  onDelete,
  presetName,
}: IPresetDeleteDialog): ReactElement => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={t('presetControl.deleteDialog.title')}
      actions={
        <>
          <Button
            variant="secondary"
            onClick={onClose}
            text={t('presetControl.deleteDialog.cancel')}
          />
          <Button
            variant="primary"
            onClick={onDelete}
            text={t('presetControl.deleteDialog.confirm')}
          />
        </>
      }
    >
      <p>{t('presetControl.deleteDialog.message', { presetName })}</p>
    </Dialog>
  )
}
