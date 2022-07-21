import dirinfoStore from '@store/dirinfo'
import { DatasetsListItem } from '@pages/main/components/sidebar/datasets-list/datasets-list-item'
import { IDirInfoDatasetDescriptor } from '@service-providers/vault-level/vault-level.interface'

export const datasetNameByKey =
  (level: number = 0) =>
  (key: string) => {
    const { dirInfoData } = dirinfoStore

    if (!dirInfoData) return null

    const item: IDirInfoDatasetDescriptor | null = dirInfoData.dsDict[key]

    if (!item || (!level && item.ancestors.length > 0)) {
      return null
    }

    return <DatasetsListItem item={item} key={item.name} level={level} />
  }
