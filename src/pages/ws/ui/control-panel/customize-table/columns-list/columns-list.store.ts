import cloneDeep from 'lodash/cloneDeep'
import { makeAutoObservable, toJS } from 'mobx'

import { IColumns } from '@declarations'
import columnsStore, { columnsToIgnore } from '@store/ws/columns'

class ColumnListStore {
  public get filteredColumns(): IColumns[] {
    return columnsStore.localColumns.filter(
      (column: IColumns) => !columnsToIgnore.includes(column.title),
    )
  }

  constructor() {
    makeAutoObservable(this)
  }

  public toggleColumnHidden = (name: string) => {
    const newColumns = cloneDeep(columnsStore.localColumns).map(col => {
      if (col.title === name) {
        col.hidden = !col.hidden
      }

      return col
    })

    columnsStore.setLocalColumns(newColumns)
  }

  public reorderColumns = (sourceIndex: number, destinationIndex?: number) => {
    const items = Array.from(this.filteredColumns)
    const startItemsLength = items.length

    const [reorderItem] = items.splice(sourceIndex, 1)

    if (typeof destinationIndex === 'number') {
      items.splice(destinationIndex, 0, reorderItem)
    }

    if (items.length !== startItemsLength) {
      return
    }

    const extendedColumns: IColumns[] = [
      ...columnsToIgnore.map(col => ({ title: col, hidden: false })),
      ...items,
    ]

    columnsStore.setLocalColumns(toJS(extendedColumns))
  }

  public get visibleColumnsAmount(): number {
    return this.filteredColumns.filter(column => column.hidden === false).length
  }
}

export default new ColumnListStore()
