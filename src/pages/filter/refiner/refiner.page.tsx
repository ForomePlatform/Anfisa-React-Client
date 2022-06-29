import styles from './refiner.page.module.css'

import { ReactElement, useEffect } from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { pushQueryParams } from '@core/history'
import { useDatasetName } from '@core/hooks/use-dataset-name'
import { useParams } from '@core/hooks/use-params'
import datasetStore from '@store/dataset/dataset'
import dirInfoStore from '@store/dirinfo'
import filterStore from '@store/filter'
import filterPresetsStore from '@store/filter-presets'
import mainTableStore from '@store/ws/main-table.store'
import { ExportReport } from '@components/export-report'
import { Header } from '@components/header'
import { VariantsCount } from '@components/variants-count'
import { GlbPagesNames } from '@glb/glb-names'
import { FilterControl } from '@pages/filter/common/filter-control/filter-control'
import { FilterRefiner } from '@pages/filter/refiner/components/filter-refiner'
import { FilterControlOptionsNames } from '../common/filter-control/filter-control.const'
import { SolutionControlRefiner } from './components/solution-control-refiner'
import { applyPreset } from './components/solution-control-refiner/solution-control-refiner.utils'

export const RefinerPage = observer((): ReactElement => {
  const params = useParams()
  const presetName = params.get('preset') || ''
  const { isXL } = datasetStore

  const { variantCounts, dnaVariantsCounts, transcriptsCounts } =
    mainTableStore.fixedStatAmount

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

  useEffect(() => {
    presetName && applyPreset(presetName)

    if (filterPresetsStore.activePreset && !presetName) {
      pushQueryParams({ preset: filterPresetsStore.activePreset })
    }

    return () => {
      dirInfoStore.resetData()
    }
  }, [presetName])

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
