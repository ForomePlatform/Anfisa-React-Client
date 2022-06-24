import { makeAutoObservable, toJS } from 'mobx'

import { ViewTypeTableEnum } from '@core/enum/view-type-table-enum'
import { TCustomizableListItem } from '@components/customizable-list'
import { wsUiStore } from '@pages/ws/ui/ws-ui.store'

class CustomizeTableStore {
  public viewType: ViewTypeTableEnum = wsUiStore.customizeTableValues.viewType
  public columns: TCustomizableListItem[] =
    wsUiStore.customizeTableValues.columns

  constructor() {
    makeAutoObservable(this)

    this.refresh()
  }

  public refresh() {
    this.viewType = wsUiStore.customizeTableValues.viewType
    this.columns = wsUiStore.customizeTableValues.columns
  }

  public applyValues(): void {
    wsUiStore.setViewType(this.viewType)
    wsUiStore.setOptionalColumns(toJS(this.columns))
  }

  public toggleAllColumns(isHidden: boolean): void {
    this.columns.forEach(column => {
      column.isHidden = isHidden
    })
  }

  public setViewType = (viewType: ViewTypeTableEnum): void => {
    this.viewType = viewType
  }

  public setColumns = (columns: TCustomizableListItem[]): void => {
    this.columns = columns
  }

  public hideAllColumns = () => this.toggleAllColumns(true)

  public showAllColumns = () => this.toggleAllColumns(false)
}

export const customizeTableStore = new CustomizeTableStore()
