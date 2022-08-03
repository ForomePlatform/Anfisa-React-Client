import { Layout } from 'react-grid-layout'
import { makeAutoObservable, reaction } from 'mobx'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { ModalSources } from '@core/enum/modal-sources'
import { ViewTypeDashboard } from '@core/enum/view-type-dashboard-enum'
import { LocalStoreManager } from '@core/storage-management'
import datasetStore from '@store/dataset/dataset'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import { TUnitGroups } from '@store/stat-units'
import { GlbPagesNames } from '@glb/glb-names'
import modalsVisibilityStore from '@pages/filter/dtree/components/modals/modals-visibility-store'
import {
  AttributeKinds,
  IFuncPropertyStatus,
  TPropertyStatus,
} from '@service-providers/common'
import { IExtendedTUnitGroups } from './dashboard.interfaces'
import { getStartLayout } from './dashboard.utils'

export class DashboardStore {
  public viewType: ViewTypeDashboard = ViewTypeDashboard.List

  constructor() {
    makeAutoObservable(this)

    reaction(
      () => this.dashBoardQuery,
      () => {
        LocalStoreManager.delete('dashboardLayout')
        this.toggleViewType(ViewTypeDashboard.List)
      },
    )
  }

  private get dashBoardQuery() {
    return {
      datasetName: datasetStore.datasetName,
      method: filterStore.method,
    }
  }

  public toggleViewType = (viewType: ViewTypeDashboard) => {
    this.viewType = viewType
  }

  public getLayout(groups: IExtendedTUnitGroups[]): Layout[] {
    const localStorageLayout = LocalStoreManager.read('dashboardLayout')

    return localStorageLayout || getStartLayout(groups)
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

  public selectGroup = (attribute: TPropertyStatus) => {
    const { kind, name, vgroup } = attribute
    const source = ModalSources.TreeStat

    // TODO: is there any better way?
    filterStore.method === GlbPagesNames.Refiner
      ? filterStore.setAttributeToAdd(name)
      : dtreeStore.addSelectedGroup([vgroup, name])

    if (kind === AttributeKinds.ENUM) {
      modalsVisibilityStore.openEnumDialog(name, undefined, source)
    } else if (kind === AttributeKinds.NUMERIC) {
      modalsVisibilityStore.openNumericDialog(name, undefined, source)
    } else if (kind === AttributeKinds.FUNC) {
      switch (name as FuncStepTypesEnum) {
        case FuncStepTypesEnum.InheritanceMode:
          modalsVisibilityStore.openInheritanceModeDialog(
            name,
            undefined,
            source,
          )
          break
        case FuncStepTypesEnum.CustomInheritanceMode:
          modalsVisibilityStore.openCustomInheritanceModeDialog(
            name,
            undefined,
            source,
          )
          break
        case FuncStepTypesEnum.CompoundHet:
          modalsVisibilityStore.openCompoundHetDialog(name, undefined, source)
          break
        case FuncStepTypesEnum.CompoundRequest:
          modalsVisibilityStore.openCompoundRequestDialog(
            name,
            undefined,
            source,
          )
          break
        case FuncStepTypesEnum.GeneRegion:
          modalsVisibilityStore.openGeneRegionDialog(name, undefined, source)
          break
      }
    }
  }
}
