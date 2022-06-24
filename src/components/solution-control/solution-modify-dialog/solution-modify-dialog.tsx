import { FC } from 'react'

import { t } from '@i18n'
import { Dialog } from '@ui/dialog'

interface ISolutionModifyDialogProps {
  isOpen?: boolean
  onClose: () => void
  onModify: () => void
  solutionName?: string
  controlName: string
}

export const SolutionModifyDialog: FC<ISolutionModifyDialogProps> = ({
  isOpen,
  onModify,
  solutionName,
  controlName,
  onClose,
}) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      onApply={onModify}
      title={t('solutionControl.modifyDialog.title', { controlName })}
      cancelText={t('solutionControl.modifyDialog.cancel', { controlName })}
      applyText={t('solutionControl.modifyDialog.confirm', { controlName })}
    >
      <p>
        {t('solutionControl.modifyDialog.message', {
          controlName,
          solutionName,
        })}
      </p>
    </Dialog>
  )
}
