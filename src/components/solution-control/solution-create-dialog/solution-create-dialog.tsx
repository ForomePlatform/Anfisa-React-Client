import { ReactElement, useEffect, useState } from 'react'

import {
  ExploreGenomeTypesDictionary,
  genomeTypesOptions,
  TGenomeOptionsKeys,
} from '@core/enum/explore-genome-types-enum'
import { t } from '@i18n'
import { Dialog } from '@ui/dialog'
import { Input } from '@ui/input'
import { Select } from '@ui/select'
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
  const [selectValue, setSelectValue] = useState<string | undefined>(undefined)
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

  const onChangeRubric = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    setSelectValue(value)

    if (value === 'empty') {
      setRubric(undefined)
      return
    }

    const rubricKey = Object.entries(ExploreGenomeTypesDictionary).find(
      ([, val]) => val === value,
    )?.[0]

    setRubric(rubricKey as TGenomeOptionsKeys)
  }

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
        error={hasError ? errorText : undefined}
      />

      <div className="flex flex-col mt-[16px] text-12">
        <label>{t('solutionControl.createDialog.assignSolutionPack')}</label>
        <Select
          options={genomeTypesOptions}
          className="py-[5px] px-[4px]"
          value={selectValue}
          onChange={onChangeRubric}
          reset
          resetText="Choose the type"
        />
      </div>
    </Dialog>
  )
}
