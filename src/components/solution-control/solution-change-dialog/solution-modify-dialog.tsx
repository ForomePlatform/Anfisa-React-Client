import { FC } from 'react'

import { t } from '@i18n'
import { ConfirmDialog, IConfirmModalProps } from '@components/confirm-dialog'

export const SolutionModifyDialog: FC<IConfirmModalProps> = ({
  solutionName,
  controlName,
  ...rest
}) => (
  <ConfirmDialog
    message={t('solutionControl.modifyDialog.message', {
      controlName,
      solutionName,
    })}
    title={t('solutionControl.modifyDialog.title', { controlName })}
    cancelText={t('solutionControl.modifyDialog.cancel', { controlName })}
    applyText={t('solutionControl.modifyDialog.confirm', { controlName })}
    {...rest}
  />
)
