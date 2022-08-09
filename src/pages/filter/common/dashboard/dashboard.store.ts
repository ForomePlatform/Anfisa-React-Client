import { Layout } from 'react-grid-layout'
import { cloneDeep } from 'lodash'
import { makeAutoObservable, reaction } from 'mobx'

import { DashboardGroupTypes } from '@core/enum/dashboard-group-types-enum'
import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { ModalSources } from '@core/enum/modal-sources'
import { ViewTypeDashboard } from '@core/enum/view-type-dashboard-enum'
import { LocalStoreManager } from '@core/storage-management'
import { datasetStore } from '@store/dataset'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import { TUnitGroups } from '@store/stat-units'
import { GlbPagesNames } from '@glb/glb-names'
import {
  DASHBOARD_LAYOUT,
  DASHBOARD_TABS,
} from '@pages/filter/common/dashboard/dashboard.constants'
import modalsVisibilityStore from '@pages/filter/dtree/components/modals/modals-visibility-store'
import {
  AttributeKinds,
  IFuncPropertyStatus,
  TPropertyStatus,
} from '@service-providers/common'
import { IExtendedTUnitGroup, ModifySet } from './dashboard.interfaces'
import {
  getLayoutOnSubTabHeightChange,
  getLayoutOnTabHeightChange,
  getNewTabLayout,
  getSortedTabs,
  getStartLayout,
  getUpdatedLayout,
} from './dashboard.utils'

export class DashboardStore {
  private _inCharts: boolean = false
  private _filterValue: string = ''

  private _groups: IExtendedTUnitGroup[] = []

  private _mainTabs: IExtendedTUnitGroup[] = []
  private _spareTabs: IExtendedTUnitGroup[] = []
  private _mainTabsLayout: Layout[] = []

  public viewType: ViewTypeDashboard = ViewTypeDashboard.List
  public page: GlbPagesNames | undefined
  public selectedEnumVariants: string[] = []

  public get showInCharts(): boolean {
    return this._inCharts
  }

  public get filterValue(): string {
    return this._filterValue
  }

  public get groups(): IExtendedTUnitGroup[] {
    return this._groups
  }

  public get mainTabs(): IExtendedTUnitGroup[] {
    return this._mainTabs
  }

  public get spareTabs(): IExtendedTUnitGroup[] {
    return this._spareTabs
  }

  public get mainTabsLayout(): Layout[] {
    return this._mainTabsLayout
  }

  constructor() {
    makeAutoObservable(this)

    reaction(() => this.dashBoardQuery, this.reset)

    reaction(
      () => this.mainTabs,
      () => {
        this.saveLayout()
        this.saveTabs()
      },
    )

    reaction(() => this.mainTabsLayout, this.saveLayout)
  }

  private saveLayout = () => {
    LocalStoreManager.write(
      DASHBOARD_LAYOUT,
      this.mainTabsLayout,
      datasetStore.datasetName,
    )
  }

  private saveTabs = () => {
    LocalStoreManager.write(
      DASHBOARD_TABS,
      this.mainTabs,
      datasetStore.datasetName,
    )
  }

  public setFilterValue = (value: string) => {
    this._filterValue = value
  }

  public setInCharts = (value: boolean) => {
    this._inCharts = value
  }

  public setMainTabs = (tabs: ModifySet<IExtendedTUnitGroup[]>) => {
    if (typeof tabs === 'function') {
      this._mainTabs = tabs(this._mainTabs)
      return
    }

    this._mainTabs = tabs
  }

  public setPage(page: GlbPagesNames) {
    this.page = page
  }

  public setEnumVariant(filter: string) {
    this.selectedEnumVariants = []
    this.selectedEnumVariants.push(filter)
  }

  public resetEnumVariant() {
    this.selectedEnumVariants = []
  }

  private setSpareTabs = (tabs: ModifySet<IExtendedTUnitGroup[]>) => {
    if (typeof tabs === 'function') {
      this._spareTabs = tabs(this._spareTabs)
      return
    }

    this._spareTabs = tabs
  }

  private setMainTabsLayout = (layout: ModifySet<Layout[]>) => {
    console.log('set layout', layout)
    if (typeof layout === 'function') {
      this._mainTabsLayout = layout(this._mainTabsLayout)
      return
    }

    this._mainTabsLayout = layout
  }

  public setGroups = (
    groups: TUnitGroups,
    functionalUnits: IFuncPropertyStatus[],
  ) => {
    const extendedGroups: IExtendedTUnitGroup[] = groups.map(group => ({
      name: group.name,
      units: group.units.map(unit => Object.assign(unit, { isOpen: false })),
      power: group.power,
      isOpen: false,
      isFavorite: false,
    }))

    extendedGroups.push({
      name: 'Functional Units',
      units: functionalUnits.map(unit =>
        Object.assign(unit, { isOpen: false }),
      ),
      isOpen: false,
      isFavorite: false,
    })

    const savedTabs =
      LocalStoreManager.read<IExtendedTUnitGroup[] | undefined>(DASHBOARD_TABS)

    const savedLayout =
      LocalStoreManager.read<Layout[] | undefined>(DASHBOARD_LAYOUT)

    const mainTabs: IExtendedTUnitGroup[] =
      !savedTabs || savedTabs.length === 0
        ? extendedGroups.slice(0, 4)
        : savedTabs

    const spareTabs = extendedGroups.filter(
      group => !mainTabs.some(tab => tab.name === group.name),
    )

    const layout =
      !savedLayout || savedLayout.length === 0
        ? getStartLayout(extendedGroups)
        : savedLayout

    this._groups = extendedGroups
    this._mainTabs = mainTabs
    this._spareTabs = spareTabs
    this._mainTabsLayout = layout
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

  public selectGroup = (attribute: TPropertyStatus) => {
    const { kind, name, vgroup } = attribute
    const source = ModalSources.TreeStat

    this.page === GlbPagesNames.Refiner
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

  public changeTabPlace = (
    groupType: DashboardGroupTypes,
    groupName: string,
    groupIndex: number,
  ) => {
    const selectedGroup = this.groups.find(group => group.name === groupName)

    if (groupType === DashboardGroupTypes.Main) {
      this.setMainTabs(prev => prev.filter((_, index) => index !== groupIndex))
      this.setSpareTabs(prev => [selectedGroup!, ...prev])
      console.log(1)
      this.setMainTabsLayout(prev =>
        prev.filter(group => group.i !== groupName),
      )
      return
    }

    this.setSpareTabs(prev => prev.filter((_, index) => index !== groupIndex))
    this.setMainTabs(prev => [...prev, selectedGroup!])

    const newTabLayout = getNewTabLayout(selectedGroup!, this.mainTabsLayout)

    console.log(2)
    this.setMainTabsLayout(newTabLayout)
  }

  public layoutChange = (layout: Layout[]) => {
    this.saveLayout()

    console.log(3)
    this.setMainTabsLayout(layout)
  }

  public changeTabHeight = (index: number, id: string, isOpen: boolean) => {
    const newLayout = getLayoutOnTabHeightChange(
      id,
      index,
      isOpen,
      this.mainTabsLayout,
    )

    console.log(4)
    this.setMainTabsLayout(newLayout)
  }

  public changeSubTabHeight = (index: number, id: string, isOpen: boolean) => {
    const newLayout = getLayoutOnSubTabHeightChange(
      id,
      index,
      isOpen,
      this.mainTabsLayout,
    )

    console.log(5)
    this.setMainTabsLayout(newLayout)
  }

  public toggleUnit = (
    unitName: string,
    groupName: string,
    value?: boolean,
  ) => {
    let isOpen = true

    this._mainTabs = this._mainTabs.map(group => {
      if (group.name !== groupName) {
        return group
      }

      const units = group.units.map(unit => {
        if (unit.name !== unitName) {
          return unit
        }

        isOpen = value || !unit.isOpen

        return { ...unit, isOpen }
      })

      const groupIsOpen = !units.some(unit => !unit.isOpen)

      return { ...group, isOpen: groupIsOpen, units }
    })
  }

  public toggleGroup = (groupName: string, value?: boolean) => {
    let isOpen = true

    this._mainTabs = this._mainTabs.map(group => {
      if (group.name !== groupName) {
        return group
      }

      isOpen = value || !group.isOpen

      const units = group.units.map(unit => ({ ...unit, isOpen }))
      return {
        ...group,
        units,
        isOpen,
      }
    })
  }

  public toggleAll = (value?: boolean) => {
    this._mainTabs.forEach(({ name }) => this.toggleGroup(name, value))
  }

  public onFavorite = (
    type: DashboardGroupTypes,
    groupName: string,
    groupIndex: number,
  ) => {
    if (type === DashboardGroupTypes.Main) {
      const clonedTabs = cloneDeep(this.mainTabs)

      clonedTabs.forEach((item, index) => {
        if (item.name === groupName) {
          clonedTabs[index].isFavorite = !clonedTabs[index].isFavorite
        }
      })

      const sortedTabs = getSortedTabs(clonedTabs)
      this.setMainTabs(sortedTabs)
      console.log(6)
      this.setMainTabsLayout(getUpdatedLayout(sortedTabs, this.mainTabsLayout))

      return
    }

    const selectedGroup = this.groups.find(group => group.name === groupName)
    this.setSpareTabs(prev => prev.filter((_, index) => index !== groupIndex))

    const newMainTabs = [...this.mainTabs, selectedGroup!]
    const newLayout = getNewTabLayout(selectedGroup!, this.mainTabsLayout)

    newMainTabs.forEach((item, index) => {
      if (item.name === groupName) {
        newMainTabs[index].isFavorite = !newMainTabs[index].isFavorite
      }
    })

    const sortedTabs = getSortedTabs(newMainTabs)
    this.setMainTabs(sortedTabs)
    console.log(7)
    this.setMainTabsLayout(getUpdatedLayout(sortedTabs, newLayout))
  }

  public reset = () => {
    LocalStoreManager.delete(DASHBOARD_LAYOUT)
    LocalStoreManager.delete(DASHBOARD_TABS)

    this.toggleViewType(ViewTypeDashboard.List)

    this._mainTabsLayout = []
    this._mainTabs = []
    this._spareTabs = []
    this._groups = []
    this._filterValue = ''
    this._inCharts = false
  }
}
