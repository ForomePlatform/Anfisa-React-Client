import { ReactElement, useState } from 'react'

import { t } from '@i18n'
import { Button } from '@ui/button'
import { Dialog } from '@ui/dialog'
import { Input } from '@ui/input'

interface IPresetCreateDialog {
  isOpen?: boolean
  onClose: () => void
  onCreate: (presetName: string) => void
}

export const PresetCreateDialog = ({
  isOpen,
  onClose,
  onCreate,
}: IPresetCreateDialog): ReactElement => {
  const [presetName, setPresetName] = useState('')

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={t('presetControl.createDialog.title')}
      actions={
        <>
          <Button
            variant="tertiary"
            onClick={onClose}
            text={t('general.cancel')}
          />
          <Button
            variant="primary"
            disabled={!presetName}
            onClick={() => {
              onCreate(presetName)
            }}
            text={t('general.create')}
          />
        </>
      }
    >
      <Input
        value={presetName}
        label={t('presetControl.createDialog.presetName')}
        placeholder={t('presetControl.createDialog.presetNamePlaceholder')}
        onChange={event => setPresetName(event.target.value)}
      />
    </Dialog>
  )
}
