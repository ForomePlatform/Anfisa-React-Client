import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import dirinfoStore from '@store/dirinfo'
import { Loader } from '@ui/loader'
import { datasetNameByKey } from '@pages/main/components/sidebar/datasets-list/datasets-list.utils'

export const DatasetsList = observer((): ReactElement => {
  const { isFetching } = dirinfoStore.dirinfo
  return (
    <div className="overflow-y-auto overflow-x-hidden">
      {isFetching ? (
        <Loader size="m" />
      ) : (
        dirinfoStore.dsDistKeys.map(datasetNameByKey())
      )}
    </div>
  )
})
