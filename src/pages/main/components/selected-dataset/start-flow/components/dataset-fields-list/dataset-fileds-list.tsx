import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import datasetStore from '@store/dataset/dataset'
import dirinfoStore from '@store/dirinfo'
import { DatasetInfo } from '@pages/main/components/selected-dataset/components/dataset-info'
import { InfoDetails } from './components/info-details'

export const DatasetsFieldsList = observer((): ReactElement => {
  const hasInfoDetails = !!dirinfoStore.infoFrameLink
  const { dsInfoData: info, isLoading } = datasetStore

  return (
    <>
      {hasInfoDetails && <InfoDetails />}
      {!hasInfoDetails && <DatasetInfo info={info} isLoading={isLoading} />}
    </>
  )
})
