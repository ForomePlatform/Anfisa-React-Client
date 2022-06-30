import styles from './dtree.page.module.css'

import { ReactElement } from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { SolutionTypesEnum } from '@core/enum/solution-types-enum'
import { useDatasetName } from '@core/hooks/use-dataset-name'
import { useSolution } from '@core/hooks/use-solution'
import datasetStore from '@store/dataset/dataset'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
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

export const DtreePage = observer((): ReactElement => {
  const { isXL } = datasetStore

  useDatasetName()

  useSolution(SolutionTypesEnum.Dtree, filterDtreesStore.activeDtree)

  filterDtreesStore.observeHistory.useHook()

  const getFiltersValue = (type: string) => {
    if (type === 'all') {
      if (isXL) return toJS(datasetStore.dsInfoData?.total)

      if (filterStore.method === GlbPagesNames.Dtree) {
        return dtreeStore.statAmount?.variants
      }

      if (filterStore.method === GlbPagesNames.Refiner) {
        return filterStore.stat.filteredCounts?.variants
      }
    }

    if (type === 'transcribedVariants') {
      if (filterStore.method === GlbPagesNames.Dtree) {
        return dtreeStore.statAmount?.transcribedVariants
      }

      if (filterStore.method === GlbPagesNames.Refiner) {
        return filterStore.stat.filteredCounts?.variants
      }
    }

    if (type === 'transcripts') {
      if (filterStore.method === GlbPagesNames.Dtree) {
        return dtreeStore.statAmount?.transcripts
      }

      if (filterStore.method === GlbPagesNames.Refiner) {
        return filterStore.stat.filteredCounts?.transcripts
      }
    }
  }

  return (
    <>
      <ModalsContainer />

      <div className={styles.dtreePage}>
        <Header className={styles.dtreePage__header}>
          <VariantsCount
            variantCounts={getFiltersValue('all')}
            transcriptsCounts={getFiltersValue('transcripts')}
            dnaVariantsCounts={getFiltersValue('transcribedVariants')}
            showDnaVariants={!isXL}
            showTranscripts={!isXL}
          />
        </Header>

        <FilterControl
          pageName={FilterControlOptionsNames[GlbPagesNames.Dtree]}
          SolutionControl={SolutionControlDtree}
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
