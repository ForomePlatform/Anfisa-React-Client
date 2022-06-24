import { makeAutoObservable } from 'mobx'

import { IColumns } from '@declarations'
import { ViewTypeEnum } from '@core/enum/view-type-enum'
import { tableColumnMap } from '@core/table-column-map'
import variantStore from '@store/ws/variant'
// import { variantColumnTable } from '@pages/ws/columns'
import { getExtendedColumns } from '@utils/mian-table/get-extended-columns'

export const columnsToIgnore: string[] = ['Gene', 'Variant']

class ColumnsStore {
  public columns: IColumns[] = getExtendedColumns(Object.values(tableColumnMap))
  public localColumns: IColumns[] = getExtendedColumns(
    Object.values(tableColumnMap),
  )
  public viewType: ViewTypeEnum = ViewTypeEnum.Cozy

  constructor() {
    makeAutoObservable(this)
  }

  public get selectedDataColumns() {
    const selectedColumns = this.columns
      .filter(column => !column.hidden)
      .map(column => column.title ?? column)

    return []
  }

  public get collapsedSelectedDataColumns() {
    return this.selectedDataColumns.slice(0, 2)
  }

  public get columnDataListForRender() {
    return false
  }

  public setColumns(columns: IColumns[]) {
    this.columns = columns
  }

  public resetColumns() {
    // if (!variantStore.drawerVisible) {
    //   this.localColumns = this.columns
    // }
  }

  public setLocalColumns(columns: IColumns[]) {
    this.localColumns = columns
  }

  public toggleColumns = (isHidden: boolean) => {
    const toggledColumns = this.localColumns.map((column, index) => ({
      title: column.title,
      hidden: index > 1 ? isHidden : false,
    }))

    this.setLocalColumns(toggledColumns)
  }

  public applyColumns() {
    this.setColumns(this.localColumns)
  }

  public setViewType(viewType: ViewTypeEnum) {
    this.viewType = viewType
  }

  public getColumnsForOpenDrawer() {
    const columnsForOpenDrawer = this.columns
      .filter(column => !column.hidden)
      .splice(0, 2)

    return columnsForOpenDrawer
  }

  public onCloseDrawer() {
    this.setColumns(this.localColumns)

    // variantStore.setDrawerVisible(false)
  }
}

export default new ColumnsStore()
