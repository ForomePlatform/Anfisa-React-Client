import styles from './refiner.page.module.css'

import { ReactElement } from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { useDatasetName } from '@core/hooks/use-dataset-name'
import datasetStore from '@store/dataset/dataset'
import filterStore from '@store/filter'
import filterPresetsStore from '@store/filter-presets'
import { ExportReport } from '@components/export-report'
import { Header } from '@components/header'
import { VariantsCount } from '@components/variants-count'
import { GlbPagesNames } from '@glb/glb-names'
import { FilterControl } from '@pages/filter/common/filter-control/filter-control'
import { FilterRefiner } from '@pages/filter/refiner/components/filter-refiner'
import { FilterControlOptionsNames } from '../common/filter-control/filter-control.const'
import { SolutionControlRefiner } from './components/solution-control-refiner'

export const RefinerPage = observer((): ReactElement => {
  const { isXL } = datasetStore

  const { variantCounts, dnaVariantsCounts, transcriptsCounts } =
    filterStore.totalCounts

  const { availablePresets: availableSolutionEntries, activePreset } =
    filterPresetsStore

  const createPreset = (presetName: string): void => {
    filterPresetsStore.createPreset(presetName, filterStore.conditions)
  }

  const modifiedPreset = filterStore.isPresetModified
    ? filterPresetsStore.activePreset
    : undefined

  const isEntryCreationAllowed = activePreset
    ? modifiedPreset === activePreset
    : !filterStore.isConditionsEmpty

  useDatasetName()

  filterPresetsStore.observeHistory.useHook()

  return (
    <div className={styles.refinerPage}>
      <Header className={styles.refinerPage__header}>
        <VariantsCount
          variantCounts={
            isXL ? toJS(datasetStore.dsInfoData?.total) : variantCounts
          }
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
        goForward={filterStore.actionHistory.goForward}
        goBackward={filterStore.actionHistory.goBackward}
        className={styles.refinerPage__controls}
      />

      <FilterRefiner className={styles.refinerPage__refiner} />
    </div>
  )
})
