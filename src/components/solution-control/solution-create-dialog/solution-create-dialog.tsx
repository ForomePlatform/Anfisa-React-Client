import { ReactElement, useEffect, useState } from 'react'

import {
  ExploreGenomeTypesDictionary,
  genomeTypesOptions,
  TGenomeOptionsKeys,
} from '@core/enum/explore-genome-types-enum'
import { t } from '@i18n'
import { Dialog } from '@ui/dialog'
import { Input } from '@ui/input'
import { Dropdown } from '@components/dropdown'
import { IDropdownValue } from '@components/dropdown/dropdown.interfaces'
import { ISolutionEntryDescription } from '@service-providers/common'
import { validatePresetName } from '@utils/validation/validatePresetName'

interface ISolutionCreateDialogProps {
  solutions: ISolutionEntryDescription[] | undefined
  isOpen?: boolean
  controlName: string
  onClose: () => void
  onCreate: (solutionName: string, rubric?: TGenomeOptionsKeys) => void
}

export const SolutionCreateDialog = ({
  solutions,
  isOpen,
  controlName,
  onClose,
  onCreate,
}: ISolutionCreateDialogProps): ReactElement => {
  const [solutionName, setSolutionName] = useState('')
  const [rubric, setRubric] =
    useState<TGenomeOptionsKeys | undefined>(undefined)
  const [isValidationError, setIsValidationError] = useState(false)
  const [isSameNameError, setIsSameNameError] = useState(false)

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
    setIsSameNameError(
      !!solutions?.some(solution => solution.name === solutionName),
    )
  }, [solutionName, solutions])

  const value: IDropdownValue<TGenomeOptionsKeys>[] = !rubric
    ? []
    : [{ value: rubric, label: ExploreGenomeTypesDictionary[rubric] }]

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={t('solutionControl.createDialog.title', { controlName })}
      applyText={t('general.create')}
      isApplyDisabled={hasError || !solutionName}
      onApply={() => onCreate(solutionName, rubric)}
    >
      <Input
        value={solutionName}
        label={t('solutionControl.createDialog.controlName', { controlName })}
        placeholder={t('solutionControl.createDialog.controlNamePlaceholder', {
          controlName,
        })}
        onChange={event => setSolutionName(event.target.value)}
      />

      <div className="flex flex-col mt-[16px] text-12">
        <label>{t('solutionControl.createDialog.assignSolutionPack')}</label>

        <Dropdown
          onChange={option => setRubric(option.value)}
          values={value}
          options={genomeTypesOptions}
          reset={() => setRubric(undefined)}
          placeholder="Choose the type"
        />
      </div>

      {hasError && (
        <div className="text-red-secondary text-12">{errorText}</div>
      )}
    </Dialog>
  )
}
