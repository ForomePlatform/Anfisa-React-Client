import dirinfoStore from '@store/dirinfo'
import { IDirInfoDatasetDescriptor } from '@service-providers/vault-level/vault-level.interface'
import { SecondaryDsItem } from './secondary-ds-item'

export const secondaryDsNameByKey =
  (
    level: number = 0,
    onSelect: (value: string) => void,
    selectedItem: string,
  ) =>
  (key: string) => {
    const { dirInfoData } = dirinfoStore

    if (!dirInfoData) return null

    const item: IDirInfoDatasetDescriptor | null = dirInfoData.dsDict[key]

    if (!item) {
      return null
    }

    return (
      <SecondaryDsItem
        item={item}
        key={item.name}
        level={level}
        onSelect={onSelect}
        selectedItem={selectedItem}
      />
    )
  }
