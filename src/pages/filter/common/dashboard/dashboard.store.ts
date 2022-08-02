import { makeAutoObservable } from 'mobx'

import { ViewTypeDashboard } from '@core/enum/view-type-dashboard-enum'
import { TUnitGroups } from '@store/stat-units'
import { IFuncPropertyStatus } from '@service-providers/common'
import { IExtendedTUnitGroups } from './dashboard.interfaces'

export default class DashboardStore {
  public viewType: ViewTypeDashboard = ViewTypeDashboard.List

  constructor() {
    makeAutoObservable(this)
  }

  public toggleViewType = (viewType: ViewTypeDashboard) => {
    this.viewType = viewType
  }

  public geExtendedGroups(
    groups: TUnitGroups,
    functionalUnits: IFuncPropertyStatus[],
  ): IExtendedTUnitGroups[] {
    const extendedGroups: IExtendedTUnitGroups[] = groups.map(group => ({
      name: group.name,
      units: group.units,
      power: group.power,
    }))

    extendedGroups.push({
      name: 'Functional Units',
      units: functionalUnits,
    })

    return extendedGroups
  }

  public getFilteredGroups(
    groups: IExtendedTUnitGroups[],
    preparedFilterValue: string,
  ): IExtendedTUnitGroups[] {
    return groups
      .map(group => {
        return {
          ...group,
          attributes: group.units.filter(attr =>
            attr.name.toLowerCase().includes(preparedFilterValue),
          ),
        }
      })
      .filter(group => group.attributes.length > 0)
  }
}
