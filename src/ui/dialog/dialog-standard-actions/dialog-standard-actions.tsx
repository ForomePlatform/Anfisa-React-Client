import { ReactElement } from 'react'

import { t } from '@i18n'
import { Button } from '@ui/button'
import { TEditorTheme } from '@pages/filter/dtree/components/modals/components/text-editor-dialog'

export interface IDialogStandardActionsProps {
  cancelText?: string
  applyText?: string
  onClose?: () => void
  onApply?: () => void
  handleChangeTheme?: () => void
  isApplyDisabled?: boolean
  isLoading?: boolean
  theme?: TEditorTheme
}

export const DialogStandardActions = ({
  cancelText,
  applyText,
  onClose,
  onApply,
  isApplyDisabled,
  isLoading,
}: IDialogStandardActionsProps): ReactElement => {
  return (
    <>
      <Button
        text={cancelText || t('general.cancel')}
        variant="tertiary"
        onClick={onClose}
      />
      <Button
        className="relative"
        disabled={isApplyDisabled || isLoading}
        isLoading={isLoading}
        text={applyText || t('general.apply')}
        onClick={onApply}
      />
    </>
  )
}
