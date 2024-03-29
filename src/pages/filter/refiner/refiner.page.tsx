import styles from './refiner.page.module.css'

import { ReactElement, useEffect } from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { ViewTypeDashboard } from '@core/enum/view-type-dashboard-enum'
import { useDatasetName } from '@core/hooks/use-dataset-name'
import { t } from '@i18n'
import datasetStore from '@store/dataset/dataset'
import defaultsStore from '@store/defaults'
import filterStore from '@store/filter'
import filterPresetsStore from '@store/filter-presets'
import { ExportReport } from '@components/export-report'
import { Header } from '@components/header'
import { VariantsCount } from '@components/variants-count'
import { GlbPagesNames } from '@glb/glb-names'
import { FilterControl } from '@pages/filter/common/filter-control/filter-control'
import { IgvModal } from '@pages/filter/dtree/components/modals/components/igv'
import { FilterRefiner } from '@pages/filter/refiner/components/filter-refiner'
import dashboardStore, { Dashboard } from '../common/dashboard'
import { FilterControlOptionsNames } from '../common/filter-control/filter-control.const'
import { viewVariantsStore } from '../common/view-variants/store'
import { ModalsContainer } from '../dtree/components/modals/modals-container'
import modalsVisibilityStore from '../dtree/components/modals/modals-visibility-store'
import { refinerAttributeStore } from './components/attributes/refiner-attributes.store'
import { refinerFunctionsStore } from './components/attributes/refiner-functions.store'
import { savePanelAttribute } from './components/middle-column/panels/utils/save-pannel-attribute'
import { SolutionControlRefiner } from './components/solution-control-refiner'

export const RefinerPage = observer((): ReactElement => {
  const { isXL } = datasetStore

  const { wsMaxCount } = defaultsStore

  const {
    stat: { unitGroups, functionalUnits, isFetching },
  } = filterStore

  const { variantCounts, dnaVariantsCounts, transcriptsCounts } =
    filterStore.totalCounts

  const { availablePresets: availableSolutionEntries, activePreset } =
    filterPresetsStore

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

  const isTooManyVariants = filterCounts && filterCounts.variants > wsMaxCount

  useDatasetName()

  filterPresetsStore.observeHistory.useHook()
  dashboardStore.observeHistory.useHook()

  useEffect(() => {
    return () => filterStore.actionHistory.resetHistory()
  }, [])

  return (
    <>
      <ModalsContainer
        attributeStore={refinerAttributeStore}
        funcStore={refinerFunctionsStore}
        onAddEnum={savePanelAttribute}
        onSaveEnum={savePanelAttribute}
        onAddNumeric={savePanelAttribute}
        onSaveNumeric={savePanelAttribute}
        onAddFunc={savePanelAttribute}
        onSaveFunc={savePanelAttribute}
      />

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
          availableSolutionEntries={availableSolutionEntries}
          isBackwardAllowed={filterStore.actionHistory.isBackwardAllowed}
          isForwardAllowed={filterStore.actionHistory.isForwardAllowed}
          isEntryCreationAllowed={isEntryCreationAllowed}
          disabledCreateDataset={
            filterStore.conditions.length === 0 ||
            !filterCounts ||
            filterCounts.variants > wsMaxCount
          }
          createDatasetTooltip={
            isTooManyVariants
              ? t('dsCreation.tooManyVariants', { max: wsMaxCount })
              : ''
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
            dataReady={filterStore.downloadedAmount === 100}
            page={GlbPagesNames.Refiner}
            groups={unitGroups}
            functionalUnits={functionalUnits}
            isFetching={isFetching}
          />
        )}
      </div>
    </>
  )
})
