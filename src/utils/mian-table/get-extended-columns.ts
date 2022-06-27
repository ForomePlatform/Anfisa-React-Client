import { IColumns } from '@declarations'

export const getExtendedColumns = (columns: string[]): IColumns[] => {
  return columns.map(column => ({
    title: column,
    hidden: false,
  }))
}
