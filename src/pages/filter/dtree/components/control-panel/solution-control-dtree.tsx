import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import filterDtreesStore from '@store/filter-dtrees'
import { SolutionControl } from '@components/solution-control'

export const SolutionControlDtree = observer((): ReactElement => {
  const { activeDtree, availableDtrees } = filterDtreesStore

  return (
    <SolutionControl
      selected={activeDtree}
      solutions={availableDtrees}
      controlName={t('solutionControl.decisionTree')}
      onApply={filterDtreesStore.setActiveDtree}
      onModify={filterDtreesStore.modifyDtree}
      onDelete={filterDtreesStore.deleteDtree}
    />
  )
})
