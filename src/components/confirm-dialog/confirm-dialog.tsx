import { FC } from 'react'

import { Dialog } from '@ui/dialog'
import { IConfirmDialogProps } from './confirm-dialog.interfaces'

export const ConfirmDialog: FC<IConfirmDialogProps> = ({
  isOpen,
  onClose,
  onApply,
  applyText,
  cancelText,
  message,
  title,
}) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      onApply={onApply}
      title={title}
      cancelText={cancelText}
      applyText={applyText}
    >
      <p>{message}</p>
    </Dialog>
  )
}
