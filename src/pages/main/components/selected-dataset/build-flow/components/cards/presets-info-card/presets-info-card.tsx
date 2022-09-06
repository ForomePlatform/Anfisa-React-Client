import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import wizardStore from '@pages/main/components/selected-dataset/build-flow/components/wizard/wizard.store'
import { DatasetInfo } from '@pages/main/components/selected-dataset/components/dataset-info'

export const PresetsInfoCard = observer((): ReactElement => {
  const { data: info, isLoading } = wizardStore.dsInfo

  return (
    <DatasetInfo
      info={info}
      isLoading={isLoading}
      position="left"
      className="max-h-[50vh]"
    />
  )
})
