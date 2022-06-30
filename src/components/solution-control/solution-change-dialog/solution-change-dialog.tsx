import { FC } from 'react'

import { Dialog } from '@ui/dialog'
import { ISolutionChangeDialogProps } from './solution-change-dialog.interfaces'

export const SolutionChangeDialog: FC<ISolutionChangeDialogProps> = ({
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
