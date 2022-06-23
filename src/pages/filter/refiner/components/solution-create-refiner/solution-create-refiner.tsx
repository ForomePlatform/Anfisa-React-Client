import { ReactElement } from 'react'

import { useModal } from '@core/hooks/use-modal'
import { t } from '@i18n'
import filterStore from '@store/filter'
import filterPresetsStore from '@store/filter-presets'
import { Button } from '@ui/button'
import { SolutionCreateDialog } from '@components/solution-control/solution-create-dialog'
import { createPreset } from './solution-create-refiner.utils'

export const SolutionCreateRefiner = (): ReactElement => {
  const { availablePresets } = filterPresetsStore

  const [createDialog, openCreateDialog, closeCreateDialog] = useModal()

  return (
    <>
      <Button
        disabled={filterStore.isConditionsEmpty}
        text={t('variant.savePreset')}
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
