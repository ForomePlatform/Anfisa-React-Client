import { ReactElement, useEffect, useMemo, useState } from 'react'

import { t } from '@i18n'
import { Dialog } from '@ui/dialog'
import { Input } from '@ui/input'
import { ISolutionEntryDescription } from '@service-providers/common'
import { validatePresetName } from '@utils/validation/validatePresetName'

interface ISolutionCreateDialogProps {
  solutions: ISolutionEntryDescription[] | undefined
  isOpen?: boolean
  controlName: string
  onClose: () => void
  onCreate: (solutionName: string) => void
}

export const SolutionCreateDialog = ({
  solutions,
  isOpen,
  controlName,
  onClose,
  onCreate,
}: ISolutionCreateDialogProps): ReactElement => {
  const [solutionName, setSolutionName] = useState('')
  const [isValidationError, setIsValidationError] = useState(false)

  const isSameNameError = useMemo(
    () => solutions?.some(solution => solution.name === solutionName),
    [solutionName, solutions],
  )

  const hasError = isValidationError || isSameNameError
  const errorText = isValidationError
    ? t('filter.notValidName')
    : t('solutionControl.createDialog.solutionNameAlreadyExists', {
        controlName,
        solutionName,
      })

  useEffect(() => {
    !isOpen && setSolutionName('')
  }, [isOpen])

  useEffect(() => {
    const isValid = !solutionName.length || validatePresetName(solutionName)
    setIsValidationError(!isValid)
  }, [solutionName])

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={t('solutionControl.createDialog.title', { controlName })}
      applyText={t('general.create')}
      isApplyDisabled={hasError || !solutionName}
      onApply={() => onCreate(solutionName)}
    >
      <Input
        value={solutionName}
        label={t('solutionControl.createDialog.controlName', { controlName })}
        placeholder={t('solutionControl.createDialog.controlNamePlaceholder', {
          controlName,
        })}
        onChange={event => setSolutionName(event.target.value)}
      />
      {hasError && (
        <div className="text-red-secondary text-12">{errorText}</div>
      )}
    </Dialog>
  )
}
