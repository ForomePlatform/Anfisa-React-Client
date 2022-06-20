import { tableColumnMap, TMainTableColumn } from '@core/table-column-map'
import { columnDefs } from './variants-table'
import { IVariantsTableColumn } from './variants-table/components'

/**
 * TODO: should be refactored with columnsStore
 *       now columnsStore handles columns as titles,
 *       but should be just keys
 */
export const getColumns = (
  selectedColumns: string[],
): IVariantsTableColumn[] => {
  const entries = Object.entries(tableColumnMap)

  const columns: IVariantsTableColumn[] = []

  for (const columnTitle of selectedColumns) {
    const columnName = entries.find(
      ([, title]) => title === columnTitle,
    )?.[0] as TMainTableColumn | undefined

    if (!columnName) {
      continue
    }

    const column = columnDefs.find(({ name }) => name === columnName)

    if (column) {
      columns.push(column)
    }
  }

  return columns
}
