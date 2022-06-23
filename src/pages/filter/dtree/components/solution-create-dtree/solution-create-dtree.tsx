import { ReactElement } from 'react'

import { useModal } from '@core/hooks/use-modal'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import filterDtreesStore from '@store/filter-dtrees'
import { Button } from '@ui/button'
import { SolutionCreateDialog } from '@components/solution-control/solution-create-dialog'

const MIN_CODE_LENGTH = 13

export const SolutionCreateDtree = (): ReactElement => {
  const { availableDtrees } = filterDtreesStore

  const [createDialog, openCreateDialog, closeCreateDialog] = useModal()

  return (
    <>
      <Button
        disabled={dtreeStore.dtreeCode.length < MIN_CODE_LENGTH}
        text={t('variant.savePreset')}
        className="whitespace-nowrap"
        variant="secondary-dark"
        onClick={openCreateDialog}
      />
      <SolutionCreateDialog
        {...createDialog}
        solutions={availableDtrees}
        onClose={closeCreateDialog}
        controlName={t('solutionControl.decisionTree')}
        onCreate={solutionName => {
          closeCreateDialog()
          filterDtreesStore.createDtree(solutionName)
        }}
      />
    </>
  )
}
