import { ReactElement } from 'react'

import { useModal } from '@core/hooks/use-modal'
import { t } from '@i18n'
import filterPresetsStore from '@store/filter-presets'
import { Button } from '@ui/button'
import { SolutionCreateDialog } from '@components/solution-control/solution-create-dialog'
import { createPreset } from './create-preset-refiner.utils'

export const CreatePresetRefiner = (): ReactElement => {
  const { availablePresets } = filterPresetsStore

  const [createDialog, openCreateDialog, closeCreateDialog] = useModal()

  return (
    <>
      <Button
        text={t('solutionControl.saveSolution', {
          controlName: t('solutionControl.filterPreset'),
        })}
        className="whitespace-nowrap"
        variant="secondary-dark"
        onClick={openCreateDialog}
      />
      <SolutionCreateDialog
        {...createDialog}
        solutions={availablePresets}
        onClose={closeCreateDialog}
        controlName={t('solutionControl.filterPreset')}
        onCreate={solutionName => {
          closeCreateDialog()
          createPreset(solutionName)
        }}
      />
    </>
  )
}
