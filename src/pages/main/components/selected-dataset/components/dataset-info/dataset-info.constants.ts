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
    render: (it: string) => new Date(it).toISOString(),
  },
  {
    field: 'ancestors',
    fieldName: 'Base dataset',
    optional: true,
    render: (it: string[][]) => {
      if (it.length === 0) {
        return null
      }

      return it[0][0]
    },
  },
  {
    field: 'ancestors',
    fieldName: 'Base loaded at',
    optional: true,
    render: (it: string[][]) => {
      if (it.length === 0 || it[0].length !== 3) {
        return null
      }

      return new Date(it[0][2]).toISOString()
    },
  },
  {
    field: 'ancestors',
    fieldName: 'Root dataset',
    optional: true,
    render: (it: string[][]) => {
      if (it.length === 0) {
        return null
      }

      return it[it.length - 1][0]
    },
  },
]
