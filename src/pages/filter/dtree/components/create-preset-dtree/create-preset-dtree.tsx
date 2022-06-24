import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { useModal } from '@core/hooks/use-modal'
import { t } from '@i18n'
import filterDtreesStore from '@store/filter-dtrees'
import { Button } from '@ui/button'
import { SolutionCreateDialog } from '@components/solution-control/solution-create-dialog'

export const CreatePresetDtree = observer((): ReactElement => {
  const { availableDtrees } = filterDtreesStore

  const [createDialog, openCreateDialog, closeCreateDialog] = useModal()

  return (
    <>
      <Button
        text={t('solutionControl.saveSolution', {
          controlName: t('solutionControl.decisionTree'),
        })}
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
})
