import { FC } from 'react'

import { t } from '@i18n'
import { SolutionChangeDialog } from '@components/solution-control/solution-change-dialog/solution-change-dialog'
import { ISolutionChangeModalProps } from '@components/solution-control/solution-change-dialog/solution-change-dialog.interfaces'

export const SolutionDeleteDialog: FC<ISolutionChangeModalProps> = ({
  solutionName,
  controlName,
  ...rest
}) => (
  <SolutionChangeDialog
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
