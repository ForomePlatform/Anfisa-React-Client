import { makeAutoObservable } from 'mobx'

import { ViewTypeDashboard } from '@core/enum/view-type-dashboard-enum'

export class DashboardStore {
  public viewType: ViewTypeDashboard = ViewTypeDashboard.List

  constructor() {
    makeAutoObservable(this)
  }

  public toggleViewType = (viewType: ViewTypeDashboard) => {
    this.viewType = viewType
  }
}
