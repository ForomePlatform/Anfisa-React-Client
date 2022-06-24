import styles from './refiner.page.module.css'

import { ReactElement, useEffect } from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { useDatasetName } from '@core/hooks/use-dataset-name'
import datasetStore from '@store/dataset/dataset'
import dirInfoStore from '@store/dirinfo'
import filterStore from '@store/filter'
import mainTableStore from '@store/ws/main-table.store'
import { ExportReport } from '@components/export-report'
import { Header } from '@components/header'
import { VariantsCount } from '@components/variants-count'
import { GlbPagesNames } from '@glb/glb-names'
import { FilterControl } from '@pages/filter/common/filter-control/filter-control'
import { FilterRefiner } from '@pages/filter/refiner/components/filter-refiner'
import { FilterControlOptionsNames } from '../common/filter-control/filter-control.const'
import { SolutionControlRefiner } from './components/solution-control-refiner'
import { SolutionCreateRefiner } from './components/solution-create-refiner'

export const RefinerPage = observer((): ReactElement => {
  const { isXL } = datasetStore

  const { variantCounts, dnaVariantsCounts, transcriptsCounts } =
    mainTableStore.fixedStatAmount

  const isSaveButtonShown = !filterStore.isConditionsEmpty

  useDatasetName()

  useEffect(() => {
    return () => {
      dirInfoStore.resetData()
    }
  }, [])

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
        SolutionCreate={SolutionCreateRefiner}
        isBackwardAllowed={filterStore.actionHistory.isBackwardAllowed}
        isForwardAllowed={filterStore.actionHistory.isForwardAllowed}
        isSaveButtonShown={isSaveButtonShown}
        goForward={filterStore.actionHistory.goForward}
        goBackward={filterStore.actionHistory.goBackward}
        className={styles.refinerPage__controls}
      />

      <FilterRefiner className={styles.refinerPage__refiner} />
    </div>
  )
})
