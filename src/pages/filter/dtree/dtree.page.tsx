import styles from './dtree.page.module.css'

import { ReactElement, useEffect } from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { useDatasetName } from '@core/hooks/use-dataset-name'
import { useParams } from '@core/hooks/use-params'
import datasetStore from '@store/dataset/dataset'
import dtreeStore from '@store/dtree'
import filterDtreesStore from '@store/filter-dtrees'
import { Header } from '@components/header'
import { VariantsCount } from '@components/variants-count'
import { GlbPagesNames } from '@glb/glb-names'
import { FilterControl } from '../common/filter-control/filter-control'
import { FilterControlOptionsNames } from '../common/filter-control/filter-control.const'
import { SolutionControlDtree } from './components/control-panel/solution-control-dtree'
import { TextEditorButton } from './components/control-panel/text-editor-button'
import { ModalsContainer } from './components/modals/modals-container'
import { QueryBuilder } from './components/query-builder/query-builder'

const MIN_CODE_LENGTH = 13

export const DtreePage = observer((): ReactElement => {
  const { isXL } = datasetStore

  const { availableDtrees: availableSolutionEntries } = filterDtreesStore

  const createDtree = (treeName: string): void => {
    filterDtreesStore.createDtree(treeName)
  }

  const modifiedDtree = dtreeStore.isDtreeModified
    ? dtreeStore.currentDtreeName
    : undefined

  const isEntryCreationAllowed = filterDtreesStore.activeDtree
    ? modifiedDtree === filterDtreesStore.activeDtree
    : dtreeStore.dtreeCode.length >= MIN_CODE_LENGTH

  useDatasetName()
  filterDtreesStore.observeHistory.useHook()

  const params = useParams()
  const dsName = params.get('ds') || ''
  const dtreeName = params.get('dtree') || ''

  useEffect(() => {
    const initAsync = async () => {
      await dtreeStore.fetchDtreeSetAsync({
        ds: dsName,
        tm: '0',
        code: 'return False',
      })
    }

    if (!dtreeName) {
      initAsync()
    }

    return () => dtreeStore.actionHistory.resetHistory()
  }, [dsName, dtreeName])

  const { variantCounts, dnaVariantsCounts, transcriptsCounts } =
    dtreeStore.totalCounts

  return (
    <>
      <ModalsContainer />

      <div className={styles.dtreePage}>
        <Header className={styles.dtreePage__header}>
          <VariantsCount
            variantCounts={
              isXL ? toJS(datasetStore.dsInfoData?.total) : variantCounts
            }
            transcriptsCounts={transcriptsCounts}
            dnaVariantsCounts={dnaVariantsCounts}
            showDnaVariants={!isXL}
            showTranscripts={!isXL}
          />
        </Header>

        <FilterControl
          pageName={FilterControlOptionsNames[GlbPagesNames.Dtree]}
          SolutionControl={SolutionControlDtree}
          createSolutionEntry={createDtree}
          availableSolutionEntries={availableSolutionEntries}
          isEntryCreationAllowed={isEntryCreationAllowed}
          isBackwardAllowed={dtreeStore.actionHistory.isBackwardAllowed}
          isForwardAllowed={dtreeStore.actionHistory.isForwardAllowed}
          goForward={dtreeStore.actionHistory.goForward}
          goBackward={dtreeStore.actionHistory.goBackward}
          className={styles.dtreePage__controls}
          TextEditorButton={TextEditorButton}
        />

        <QueryBuilder className={styles.dtreePage__queryBuilder} />
      </div>
    </>
  )
})
