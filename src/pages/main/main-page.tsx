import { ReactElement, useEffect } from 'react'

import { useParams } from '@core/hooks/use-params'
import datasetStore from '@store/dataset/dataset'
import dirinfoStore from '@store/dirinfo'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import zoneStore from '@store/ws/zone.store'
import { Header } from '@components/header'
import { SelectedDataset } from './components/selected-dataset/selected-dataset'
import { Datasets } from './components/sidebar/datasets'

export const MainPage = (): ReactElement => {
  const params = useParams()

  useEffect(() => {
    const handlerAsync = async () => {
      const dsName = params.get('ds') || ''

      dirinfoStore.setSelectedDirinfoName(dsName)
      datasetStore.setDatasetName(dsName)
    }
    handlerAsync()
  }, [params])

  useEffect(() => {
    zoneStore.clearZone()
    filterStore.reset()
    dtreeStore.actionHistory.resetHistory()
    dtreeStore.resetAlgorithmFilterValue()
    zoneStore.resetAllSelectedItems()
  }, [])

  return (
    <div className="min-h-full h-full flex flex-col">
      <Header />
      <div className="flex flex-row flex-grow h-full overflow-hidden">
        <Datasets />

        <SelectedDataset />
      </div>
    </div>
  )
}
