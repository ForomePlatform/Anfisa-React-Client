import styles from './secondary-ds.module.css'

import { FC, useEffect, useMemo, useState } from 'react'
import cn from 'classnames'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { useParams } from '@core/hooks/use-params'
import defaultsStore from '@store/defaults'
import dirinfoStore from '@store/dirinfo'
import { Icon } from '@ui/icon'
import { LEVEL_DATASET_P } from '@pages/main/components/sidebar/datasets-list/datasets-list.constants'
import { IDirInfoDatasetDescriptor } from '@service-providers/vault-level/vault-level.interface'
import { DeleteDataset } from './delete-dataset'
import { secondaryDsNameByKey } from './secondary-ds-name-by-key'
interface IDatasetsListItemProps {
  item: IDirInfoDatasetDescriptor
  level?: number
  onSelect: (value: string) => void
  selectedItem: string
}

export const SecondaryDsItem: FC<IDatasetsListItemProps> = observer(
  ({ item, level = 1, onSelect, selectedItem }) => {
    const params = useParams()
    const { droppedDs } = defaultsStore

    const isAbleToBeDropped = useMemo(() => {
      return droppedDs.includes(item.name)
    }, [droppedDs, item.name])

    const isActive: boolean = item.name === selectedItem

    const [isOpenFolder, setIsOpenFolder] = useState(isActive)

    const isNullKind = item.kind === null
    const secondaryKeys: string[] = get(item, 'secondary', [])
    const hasChildren = secondaryKeys.length > 0
    const padding = level * LEVEL_DATASET_P

    const handleClick = () => {
      if (isNullKind && !hasChildren) {
        return
      }

      onSelect(item.name)
      if (hasChildren) {
        setIsOpenFolder(prev => !(prev && isActive))
        dirinfoStore.setDsInfo(item as IDirInfoDatasetDescriptor)
      }
    }

    useEffect(() => {
      setIsOpenFolder(secondaryKeys.includes(params.get('ds') || ''))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <>
        <div onClick={handleClick}>
          <div
            className={cn(
              styles.container,
              isActive ? styles.container_active : styles.container_passive,
            )}
            style={{ paddingLeft: `${padding}px` }}
          >
            <div className="flex items-center">
              <Icon
                name={hasChildren ? 'Folder' : 'File'}
                className={cn(isActive ? 'text-white' : 'text-blue-bright')}
              />

              <div className="ml-1.5">{item.name}</div>
            </div>

            <DeleteDataset
              datasetName={item.name}
              isAbleToBeDropped={isAbleToBeDropped}
              isActive={isActive}
            />
          </div>
        </div>

        {!isOpenFolder &&
          hasChildren &&
          secondaryKeys.map(
            secondaryDsNameByKey(onSelect, selectedItem, level + 1),
          )}
      </>
    )
  },
)
