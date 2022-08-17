import { ReactElement, useCallback } from 'react'

import { TGenomeOptionsKeys } from '@core/enum/explore-genome-types-enum'
import { useModal } from '@core/hooks/use-modal'
import { t } from '@i18n'
import filterStore from '@store/filter'
import filterDtreesStore from '@store/filter-dtrees'
import filterPresetsStore from '@store/filter-presets'
import { Button } from '@ui/button'
import { SolutionCreateDialog } from '@components/solution-control/solution-create-dialog'
import { ISolutionEntryDescription } from '@service-providers/common'
import { FilterControlOptionsNames } from '../filter-control.const'

interface ICreateEntryProps {
  pageName: FilterControlOptionsNames
  availableSolutionEntries: ISolutionEntryDescription[] | undefined
}

export const CreateEntryButton = ({
  pageName,
  availableSolutionEntries,
}: ICreateEntryProps): ReactElement => {
  const [createDialog, openCreateDialog, closeCreateDialog] = useModal()

  const solutionName =
    pageName === FilterControlOptionsNames.dtree ? pageName : 'Preset'

  const onCreateSolution = useCallback(
    (entryName: string, rubric?: TGenomeOptionsKeys) => {
      closeCreateDialog()

      if (pageName === FilterControlOptionsNames.dtree) {
        filterDtreesStore.createDtree(entryName, rubric)
      } else if (pageName === FilterControlOptionsNames.refiner) {
        filterPresetsStore.createPreset(
          entryName,
          filterStore.conditions,
          rubric,
        )
      }
    },
    [closeCreateDialog, pageName],
  )

  return (
    <>
      <Button
        text={t('solutionControl.createEntry', { solutionName })}
        className="whitespace-nowrap"
        variant="secondary-dark"
        onClick={openCreateDialog}
      />
      <SolutionCreateDialog
        {...createDialog}
        solutions={availableSolutionEntries}
        onClose={closeCreateDialog}
        controlName={solutionName}
        onCreate={onCreateSolution}
      />
    </>
  )
}
