import { makeAutoObservable, reaction, toJS } from 'mobx'

import { ViewTypeTableEnum } from '@core/enum/view-type-table-enum'
import { LocalStoreManager } from '@core/storage-management/local-store-manager'
import { t } from '@i18n'
import { TCustomizeTableValues } from './control-panel/customize-table'
import { columnDefs, IVariantsTableColumn } from './variants'

interface IWsOptionalColumn {
  name: string
  isHidden?: boolean
}

interface IWsUiStoreData {
  viewType: ViewTypeTableEnum
  columns: IWsOptionalColumn[]
}

const optionalColumns: IWsOptionalColumn[] = columnDefs
  .filter(column => !column.isRequired)
  .map(column => ({ name: column.name }))

const coerceColumns = (
  columns: IWsOptionalColumn[] | undefined,
): IWsOptionalColumn[] => {
  const result: IWsOptionalColumn[] = []

  if (columns) {
    for (const column of columns) {
      if (columnDefs.some(def => def.name === column.name)) {
        result.push(column)
      }
    }
  }
  if (result.length < optionalColumns.length) {
    for (const column of optionalColumns) {
      if (!result.some(item => item.name === column.name)) {
        result.push(column)
      }
    }
  }

  return result
}

class WsUiStore {
  private static readonly STORE_KEY = 'wsUi'

  public viewType: ViewTypeTableEnum = ViewTypeTableEnum.Cozy
  private optionalColumns: IWsOptionalColumn[]

  constructor() {
    makeAutoObservable(this)
    const { columns, viewType } = WsUiStore.restoreData()

    this.optionalColumns = columns
    this.viewType = viewType

    reaction(() => this.data, WsUiStore.saveData)
  }

  public get columns(): IVariantsTableColumn[] {
    const optionalColumns: IVariantsTableColumn[] = []

    for (const { name, isHidden } of this.optionalColumns) {
      if (isHidden) {
        continue
      }
      const columnDef = columnDefs.find(def => def.name === name)
      if (columnDef) {
        optionalColumns.push(columnDef)
      }
    }

    return columnDefs
      .filter(column => column.isRequired)
      .concat(optionalColumns)
  }

  public get customizeTableValues(): TCustomizeTableValues {
    const columns: TCustomizeTableValues['columns'] = []

    for (const { name, isHidden } of this.optionalColumns) {
      const columnDef = columnDefs.find(def => def.name === name)

      if (columnDef) {
        columns.push({
          name,
          isHidden,
          title: t(columnDef.title),
        })
      }
    }

    return {
      viewType: this.viewType,
      columns,
    }
  }

  public setOptionalColumns(columns: IWsOptionalColumn[]): void {
    this.optionalColumns = columns
  }

  public setViewType(viewType: ViewTypeTableEnum): void {
    this.viewType = viewType
  }

  private get data(): IWsUiStoreData {
    return {
      viewType: this.viewType,
      columns: toJS(this.optionalColumns),
    }
  }

  private static restoreData(): IWsUiStoreData {
    const data: Partial<IWsUiStoreData> | undefined = LocalStoreManager.read(
      WsUiStore.STORE_KEY,
    )
    return {
      viewType: data?.viewType ?? ViewTypeTableEnum.Cozy,
      columns: coerceColumns(data?.columns),
    }
  }

  private static saveData(data: IWsUiStoreData): void {
    LocalStoreManager.write(WsUiStore.STORE_KEY, data)
  }
}

export const wsUiStore = new WsUiStore()
