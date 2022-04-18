import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import dirinfoStore from '@store/dirinfo'
import { IDirInfoDatasetDescriptor } from '@service-providers/vault-level/vault-level.interface'
import { DatasetsListItem } from './datasets-list-item'

export const DatasetsList = observer(
  (): ReactElement => (
    <div
      style={{ height: 'calc(100vh - 260px)' }}
      className="overflow-y-auto overflow-x-hidden"
    >
      {dirinfoStore.dsDistKeys.map(key => {
        const { dirinfo } = dirinfoStore
        if (dirinfo) {
          const item: IDirInfoDatasetDescriptor = dirinfo['ds-dict'][key]

          if (!item || item.ancestors.length > 0) {
            return
          }

          return <DatasetsListItem item={item} key={item.name} />
        }
        return null
      })}
    </div>
  ),
)
