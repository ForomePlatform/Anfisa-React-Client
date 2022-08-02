import styles from './refiner.page.module.css'

import { ReactElement, useEffect } from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { ViewTypeDashboard } from '@core/enum/view-type-dashboard-enum'
import { useDatasetName } from '@core/hooks/use-dataset-name'
import datasetStore from '@store/dataset/dataset'
import filterStore from '@store/filter'
import filterPresetsStore from '@store/filter-presets'
import { ExportReport } from '@components/export-report'
import { Header } from '@components/header'
import { VariantsCount } from '@components/variants-count'
import { GlbPagesNames } from '@glb/glb-names'
import {
  FilterControl,
  XL_COUNT_OF_VARIANTS,
} from '@pages/filter/common/filter-control/filter-control'
import { IgvModal } from '@pages/filter/dtree/components/modals/components/igv'
import { FilterRefiner } from '@pages/filter/refiner/components/filter-refiner'
import dashboardStore, { Dashboard } from '../common/dashboard'
import { FilterControlOptionsNames } from '../common/filter-control/filter-control.const'
import { viewVariantsStore } from '../common/view-variants/store'
import modalsVisibilityStore from '../dtree/components/modals/modals-visibility-store'
import { SolutionControlRefiner } from './components/solution-control-refiner'

export const RefinerPage = observer((): ReactElement => {
  const { isXL } = datasetStore

  const {
    stat: { unitGroups, functionalUnits, isFetching },
  } = filterStore

  const { variantCounts, dnaVariantsCounts, transcriptsCounts } =
    filterStore.totalCounts

  const { availablePresets: availableSolutionEntries, activePreset } =
    filterPresetsStore

  const createPreset = (presetName: string): void => {
    filterPresetsStore.createPreset(presetName, filterStore.conditions)
  }

  const filterCounts = filterStore.stat.filteredCounts

  const modifiedPreset = filterStore.isPresetModified
    ? filterPresetsStore.activePreset
    : undefined

  const isEntryCreationAllowed = activePreset
    ? modifiedPreset === activePreset
    : !filterStore.isConditionsEmpty

  const allVariants = isXL
    ? toJS(datasetStore.dsInfoData?.total)
    : variantCounts

  useDatasetName()

  filterPresetsStore.observeHistory.useHook()

  useEffect(() => {
    return () => filterStore.actionHistory.resetHistory()
  }, [])

  return (
    <div className={styles.refinerPage}>
      <Header className={styles.refinerPage__header}>
        <VariantsCount
          variantCounts={allVariants}
          transcriptsCounts={transcriptsCounts}
          dnaVariantsCounts={dnaVariantsCounts}
          showDnaVariants={!isXL}
          showTranscripts={!isXL}
        >
          <ExportReport />
        </VariantsCount>
      </Header>

      <FilterControl
        pageName={FilterControlOptionsNames[GlbPagesNames.Refiner]}
        SolutionControl={SolutionControlRefiner}
        createSolutionEntry={createPreset}
        availableSolutionEntries={availableSolutionEntries}
        isBackwardAllowed={filterStore.actionHistory.isBackwardAllowed}
        isForwardAllowed={filterStore.actionHistory.isForwardAllowed}
        isEntryCreationAllowed={isEntryCreationAllowed}
        disabledCreateDataset={
          filterStore.conditions.length === 0 ||
          !filterCounts ||
          filterCounts.variants > XL_COUNT_OF_VARIANTS
        }
        goForward={filterStore.actionHistory.goForward}
        goBackward={filterStore.actionHistory.goBackward}
        className={styles.refinerPage__controls}
      />

      <IgvModal
        isOpen={modalsVisibilityStore.isIgvModalVisible}
        igvParams={viewVariantsStore.record.igvParams}
      />

      {dashboardStore.viewType === ViewTypeDashboard.List ? (
        <FilterRefiner
          className={styles.refinerPage__refiner}
          groups={unitGroups}
          functionalUnits={functionalUnits}
          isFetching={isFetching}
        />
      ) : (
        <Dashboard
          groups={unitGroups}
          functionalUnits={functionalUnits}
          isFetching={isFetching}
        />
      )}
    </div>
  )
})
