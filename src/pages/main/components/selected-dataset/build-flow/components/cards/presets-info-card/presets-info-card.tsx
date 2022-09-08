import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { ICardProps } from '@pages/main/components/selected-dataset/build-flow/components/wizard/wizard.interface'
import wizardStore from '@pages/main/components/selected-dataset/build-flow/components/wizard/wizard.store'
import { DatasetInfo } from '@pages/main/components/selected-dataset/components/dataset-info'

export const PresetsInfoCard = observer(
  ({ maxHeight }: Partial<ICardProps>): ReactElement => {
    const { data: info, isLoading } = wizardStore.dsInfo

    return (
      <DatasetInfo
        info={info}
        isLoading={isLoading}
        position="left"
        style={{ height: maxHeight, minHeight: '500px' }}
      />
    )
  },
)
