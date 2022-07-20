import { t } from '@i18n'
import { IDsInfo } from '@service-providers/dataset-level'
import { Row } from './dataset-info.interfaces'

export const INFO: ReadonlyArray<Row<keyof IDsInfo>> = [
  { field: 'name', fieldName: t('home.infoPanel.info.name') },
  { field: 'kind', fieldName: t('home.infoPanel.info.kind') },
  { field: 'total', fieldName: t('home.infoPanel.info.variants') },
  {
    // @ts-ignore
    field: 'createTime',
    fieldName: t('home.infoPanel.info.createdAt'),
    render: (time: string) => new Date(time).toISOString(),
  },
  {
    field: 'ancestors',
    fieldName: t('home.infoPanel.info.baseDataset'),
    optional: true,
    render: (ancestors: string[][]) => {
      if (ancestors.length === 0) {
        return null
      }

      return ancestors[0][0]
    },
  },
  {
    field: 'ancestors',
    fieldName: t('home.infoPanel.info.baseLoaded'),
    optional: true,
    render: (ancestors: string[][]) => {
      if (ancestors.length === 0 || ancestors[0].length !== 3) {
        return null
      }

      return new Date(ancestors[0][2]).toISOString()
    },
  },
  {
    field: 'ancestors',
    fieldName: t('home.infoPanel.info.rootDataset'),
    optional: true,
    render: (ancestors: string[][]) => {
      if (ancestors.length === 0) {
        return null
      }

      return ancestors[ancestors.length - 1][0]
    },
  },
]
