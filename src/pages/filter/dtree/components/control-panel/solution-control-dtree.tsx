import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import filterDtreesStore from '@store/filter-dtrees'
import { SolutionControl } from '@components/solution-control'

export const SolutionControlDtree = observer((): ReactElement => {
  const { activeDtree, availableDtrees, isFetchingDtrees } = filterDtreesStore

  return (
    <SolutionControl
      selected={activeDtree}
      solutions={availableDtrees}
      isFetchingSolutions={isFetchingDtrees}
      modifiedSolution={
        dtreeStore.isDtreeModified ? dtreeStore.currentDtreeName : undefined
      }
      controlName={t('solutionControl.decisionTree')}
      onApply={filterDtreesStore.setActiveDtree}
      onReset={dtreeStore.clearAll}
      isResetActive={!!filterDtreesStore.activeDtree}
      onModify={filterDtreesStore.modifyDtree}
      onDelete={filterDtreesStore.deleteDtree}
    />
  )
})
