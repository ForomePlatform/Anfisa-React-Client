import { ReactElement } from 'react'

import { useModal } from '@core/hooks/use-modal'
import { t } from '@i18n'
import { Button } from '@ui/button'
import { SolutionCreateDialog } from '@components/solution-control/solution-create-dialog'
import { ISolutionEntryDescription } from '@service-providers/common'

interface ICreateEntryProps {
  solutionName: string
  availableSolutionEntries: ISolutionEntryDescription[] | undefined
  createSolutionEntry: (entryName: string) => void
}

export const CreateEntryButton = ({
  solutionName,
  availableSolutionEntries,
  createSolutionEntry,
}: ICreateEntryProps): ReactElement => {
  const [createDialog, openCreateDialog, closeCreateDialog] = useModal()

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
        onCreate={entryName => {
          closeCreateDialog()
          createSolutionEntry(entryName)
        }}
      />
    </>
  )
}
