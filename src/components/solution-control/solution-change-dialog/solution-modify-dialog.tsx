import { FC } from 'react'

import { t } from '@i18n'
import { SolutionChangeDialog } from '@components/solution-control/solution-change-dialog/solution-change-dialog'
import { ISolutionChangeModalProps } from '@components/solution-control/solution-change-dialog/solution-change-dialog.interfaces'

export const SolutionModifyDialog: FC<ISolutionChangeModalProps> = ({
  solutionName,
  controlName,
  ...rest
}) => (
  <SolutionChangeDialog
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
