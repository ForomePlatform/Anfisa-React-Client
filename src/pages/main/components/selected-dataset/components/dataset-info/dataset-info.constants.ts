import { IDsInfo } from '@service-providers/dataset-level'
import { Row } from './dataset-info.interfaces'

export const INFO: ReadonlyArray<Row<keyof IDsInfo>> = [
  { field: 'name', fieldName: 'Name' },
  { field: 'kind', fieldName: 'Kind' },
  { field: 'total', fieldName: 'Variants' },
  {
    // @ts-ignore
    field: 'createTime',
    fieldName: 'Created at',
    render: (time: string) => new Date(time).toISOString(),
  },
  {
    field: 'ancestors',
    fieldName: 'Base dataset',
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
    fieldName: 'Base loaded at',
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
    fieldName: 'Root dataset',
    optional: true,
    render: (ancestors: string[][]) => {
      if (ancestors.length === 0) {
        return null
      }

      return ancestors[ancestors.length - 1][0]
    },
  },
]
