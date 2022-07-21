import { FC } from 'react'

import { t } from '@i18n'
import { ConfirmDialog, IConfirmModalProps } from '@components/confirm-dialog'

export const SolutionDeleteDialog: FC<IConfirmModalProps> = ({
  solutionName,
  controlName,
  ...rest
}) => (
  <ConfirmDialog
    message={t('solutionControl.deleteDialog.message', {
      controlName,
      solutionName,
    })}
    title={t('solutionControl.deleteDialog.title', { controlName })}
    cancelText={t('solutionControl.deleteDialog.cancel', { controlName })}
    applyText={t('solutionControl.deleteDialog.confirm', { controlName })}
    {...rest}
  />
)
