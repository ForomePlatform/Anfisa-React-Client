import { makeAutoObservable } from 'mobx'

import { ViewTypeEnum } from '@core/enum/view-type-enum'
import { tableColumnMap } from '@core/table-column-map'

export const columnsToIgnore: string[] = ['Gene', 'Variant']

class ColumnsStore {
  columns: any[] = Object.values(tableColumnMap)
  viewType: ViewTypeEnum = ViewTypeEnum.Cozy
  selectedColumns: string[] = Object.values(tableColumnMap)

  constructor() {
    makeAutoObservable(this)
  }

  resetColumns() {
    this.columns = this.selectedColumns
  }

  setViewType(viewType: ViewTypeEnum) {
    this.viewType = viewType
  }

  public selectAllColumns = () => {
    const clearedColumns =
      typeof this.columns[0] !== 'string'
        ? this.columns.map(column => ({
            title: column.title,
            hidden: false,
          }))
        : this.columns.map(column => ({
            title: column,
            hidden: false,
          }))

    this.setColumns(clearedColumns)
  }

  public clearAllColumns = () => {
    const clearedColumns = this.getExtendedColumns.map(column => ({
      title: column.title,
      hidden: !columnsToIgnore.includes(column.title),
    }))

    this.setColumns(clearedColumns)
  }

  setColumns(columns: any[]) {
    this.columns = columns
  }

  filterColumns() {
    this.selectedColumns = this.columns
      .filter(column => !column.hidden)
      .map(column => column.title ?? column)
  }

  getColumnsForOpenDrawer() {
    return this.getExtendedColumns.filter(column => !column.hidden).splice(0, 2)
  }

  get getExtendedColumns() {
    if (typeof this.columns[0] !== 'string') {
      return this.columns
    }

    return this.columns.map(column => ({
      title: column,
      hidden: false,
    }))
  }
}

export default new ColumnsStore()
