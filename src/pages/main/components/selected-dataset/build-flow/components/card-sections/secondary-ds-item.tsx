import { FC, useEffect, useState } from 'react'
import cn from 'classnames'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { useParams } from '@core/hooks/use-params'
import dirinfoStore from '@store/dirinfo'
import { Icon } from '@ui/icon'
import { LEVEL_DATASET_P } from '@pages/main/components/sidebar/datasets-list/datasets-list.constants'
import { IDirInfoDatasetDescriptor } from '@service-providers/vault-level/vault-level.interface'
import { secondaryDsNameByKey } from '../secondary-ds-name-by-key'

interface IDatasetsListItemProps {
  item: IDirInfoDatasetDescriptor
  level?: number
  onSelect: (value: string) => void
  selectedItem: string
}

export const SecondaryDsItem: FC<IDatasetsListItemProps> = observer(
  ({ item, level = 1, onSelect, selectedItem }) => {
    const params = useParams()

    const isActive: boolean = item.name === selectedItem

    const [isOpenFolder, setIsOpenFolder] = useState(isActive)

    const isNullKind = item.kind === null
    const secondaryKeys: string[] = get(item, 'secondary', [])
    const hasChildren = secondaryKeys.length > 0

    useEffect(() => {
      setIsOpenFolder(secondaryKeys.includes(params.get('ds') || ''))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleClick = () => {
      if (isNullKind && !hasChildren) return
      onSelect(item.name)
      if (hasChildren) {
        setIsOpenFolder(prev => !(prev && isActive))
        dirinfoStore.setDsInfo(item as IDirInfoDatasetDescriptor)
      }
    }

    const padding = level * LEVEL_DATASET_P
    return (
      <>
        <div onClick={handleClick}>
          <div
            className={cn(
              'w-full flex items-center py-2 leading-5 cursor-pointer px-4',
              isActive ? 'bg-blue-bright text-white' : 'hover:bg-blue-light',
            )}
            style={{ paddingLeft: `${padding}px` }}
          >
            <Icon
              name="File"
              className={cn(isActive ? 'text-white' : 'text-blue-bright')}
            />

            <div className="ml-1.5">{item.name}</div>
          </div>
        </div>

        {isOpenFolder &&
          hasChildren &&
          secondaryKeys.map(
            secondaryDsNameByKey(level + 1, onSelect, selectedItem),
          )}
      </>
    )
  },
)
