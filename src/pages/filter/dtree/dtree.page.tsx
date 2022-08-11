import styles from './dtree.page.module.css'

import { ReactElement, useEffect } from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { ViewTypeDashboard } from '@core/enum/view-type-dashboard-enum'
import { useDatasetName } from '@core/hooks/use-dataset-name'
import { useParams } from '@core/hooks/use-params'
import datasetStore from '@store/dataset/dataset'
import dtreeStore from '@store/dtree'
import filterDtreesStore from '@store/filter-dtrees'
import { Header } from '@components/header'
import { VariantsCount } from '@components/variants-count'
import { GlbPagesNames } from '@glb/glb-names'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { changeEnumAttribute } from '@utils/changeAttribute/changeEnumAttribute'
import { changeNumericAttribute } from '@utils/changeAttribute/changeNumericAttribute'
import { saveAttribute } from '@utils/changeAttribute/saveAttribute'
import dashboardStore, { Dashboard } from '../common/dashboard'
import {
  FilterControl,
  XL_COUNT_OF_VARIANTS,
} from '../common/filter-control/filter-control'
import { FilterControlOptionsNames } from '../common/filter-control/filter-control.const'
import { dtreeAttributeStore } from './components/attributes/dtree-attributes.store'
import { dtreeFunctionsStore } from './components/attributes/dtree-functions.store'
import { SolutionControlDtree } from './components/control-panel/solution-control-dtree'
import { TextEditorButton } from './components/control-panel/text-editor-button'
import { ModalsContainer } from './components/modals/modals-container'
import { QueryBuilder } from './components/query-builder/query-builder'

const MIN_CODE_LENGTH = 13

export const DtreePage = observer((): ReactElement => {
  const { isXL } = datasetStore

  const { unitGroups, functionalUnits, isFetching } = dtreeStore.stat

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
  dashboardStore.observeHistory.useHook()

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
      <ModalsContainer
        attributeStore={dtreeAttributeStore}
        funcStore={dtreeFunctionsStore}
        onAddEnum={addAttributeToStep}
        onSaveEnum={changeEnumAttribute}
        onAddNumeric={addAttributeToStep}
        onSaveNumeric={changeNumericAttribute}
        onAddFunc={addAttributeToStep}
        onSaveFunc={saveAttribute}
      />

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
          disabledCreateDataset={
            dtreeStore.dtreeStepIndices.length === 0 ||
            !dtreeStore.totalFilteredCounts ||
            dtreeStore.totalFilteredCounts.accepted > XL_COUNT_OF_VARIANTS
          }
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

        {dashboardStore.viewType === ViewTypeDashboard.List ? (
          <QueryBuilder className={styles.dtreePage__queryBuilder} />
        ) : (
          <Dashboard
            page={GlbPagesNames.Dtree}
            dataReady={dtreeStore.dataReady === 100}
            groups={unitGroups}
            functionalUnits={functionalUnits}
            isFetching={isFetching}
          />
        )}
      </div>
    </>
  )
})
