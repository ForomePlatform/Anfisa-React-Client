import { Layout } from 'react-grid-layout'
import { cloneDeep } from 'lodash'
import { makeAutoObservable } from 'mobx'

import { DashboardGroupTypes } from '@core/enum/dashboard-group-types-enum'
import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { ModalSources } from '@core/enum/modal-sources'
import { ViewTypeDashboard } from '@core/enum/view-type-dashboard-enum'
import { LocalStoreManager } from '@core/storage-management'
import { createHistoryObserver } from '@store/common'
import { datasetStore } from '@store/dataset'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import { TUnitGroups } from '@store/stat-units'
import { GlbPagesNames } from '@glb/glb-names'
import {
  DASHBOARD_LAYOUT,
  DASHBOARD_MAIN_TABS,
  DASHBOARD_SPARE_TABS,
} from '@pages/filter/common/dashboard/dashboard.constants'
import modalsVisibilityStore from '@pages/filter/dtree/components/modals/modals-visibility-store'
import {
  AttributeKinds,
  IFuncPropertyStatus,
  TPropertyStatus,
} from '@service-providers/common'
import { IExtendedTUnitGroup, ModifySet } from './dashboard.interfaces'
import {
  getLayoutOnMassiveChange,
  getNewTabLayout,
  getSortedTabs,
  getStartLayout,
  getUpdatedLayout,
  tabUnit,
} from './dashboard.utils'

export class DashboardStore {
  private _inCharts: boolean = false
  private _filterValue: string = ''

  private _groups: IExtendedTUnitGroup[] = []

  private _mainTabs: IExtendedTUnitGroup[] = []
  private _spareTabs: IExtendedTUnitGroup[] = []
  private _mainTabsLayout: Layout[] = []
  private _beforeShowChartsOpened: Set<string> | null = null

  public viewType: ViewTypeDashboard = ViewTypeDashboard.List
  public page: GlbPagesNames | undefined
  public selectedEnumVariants: string[] = []

  readonly observeHistory = createHistoryObserver({
    viewType: {
      get: () => this.viewType,
      apply: viewType => {
        this.toggleViewType(
          (viewType as ViewTypeDashboard) || ViewTypeDashboard.List,
        )
      },
    },
  })

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
  }

  private saveLayout = () => {
    LocalStoreManager.write(
      DASHBOARD_LAYOUT,
      this.mainTabsLayout,
      datasetStore.datasetName,
    )
  }

  private saveMainTabs = () => {
    LocalStoreManager.write(
      DASHBOARD_MAIN_TABS,
      this.mainTabs,
      datasetStore.datasetName,
    )
  }

  private saveSpareTabs = () => {
    LocalStoreManager.write(
      DASHBOARD_SPARE_TABS,
      this.spareTabs,
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

    const savedMainTabs = LocalStoreManager.read<
      IExtendedTUnitGroup[] | undefined
    >(DASHBOARD_MAIN_TABS, datasetStore.datasetName)

    const savedSpareTabs = LocalStoreManager.read<
      IExtendedTUnitGroup[] | undefined
    >(DASHBOARD_SPARE_TABS, datasetStore.datasetName)

    const savedLayout = LocalStoreManager.read<Layout[] | undefined>(
      DASHBOARD_LAYOUT,
      datasetStore.datasetName,
    )

    const mainTabs =
      !savedMainTabs || !savedMainTabs.length
        ? extendedGroups.slice(0, 4)
        : savedMainTabs

    const updatedMainTabs = mainTabs.map(tab => {
      const group = extendedGroups.find(group => group.name === tab.name)

      const groupUnits = group
        ? group.units.map((unit, index) => {
            return {
              ...unit,
              isOpen: tab.units[index].isOpen,
            }
          })
        : tab.units

      return {
        ...tab,
        units: groupUnits,
      }
    })

    const spareTabs =
      !savedSpareTabs || !savedSpareTabs.length
        ? extendedGroups.filter(
            group => !updatedMainTabs.some(tab => tab.name === group.name),
          )
        : savedSpareTabs

    const layout =
      !savedLayout || !savedLayout.length
        ? getStartLayout(extendedGroups)
        : savedLayout

    this._groups = extendedGroups
    this._mainTabs = updatedMainTabs
    this._spareTabs = spareTabs
    this._mainTabsLayout = layout
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
    if (groupType === DashboardGroupTypes.Main) {
      const selectedGroup = this.mainTabs.find(
        group => group.name === groupName,
      )!

      this.setMainTabs(prev => prev.filter((_, index) => index !== groupIndex))
      this.setSpareTabs(prev => [selectedGroup!, ...prev])
      this.setMainTabsLayout(prev =>
        prev.filter(group => group.i !== groupName),
      )
    } else {
      const selectedGroup = this.spareTabs.find(
        group => group.name === groupName,
      )!

      if (selectedGroup.isFavorite) {
        selectedGroup.isFavorite = !selectedGroup.isFavorite
        this.onToggleFavorite(groupType, groupName, groupIndex)
      } else {
        this.setSpareTabs(prev =>
          prev.filter((_, index) => index !== groupIndex),
        )
        this.setMainTabs(prev => [
          ...prev,
          {
            ...selectedGroup,
            isOpen: this._inCharts,
            units: selectedGroup.units.map(unit => ({
              ...unit,
              isOpen: this._inCharts,
            })),
          },
        ])

        const newTabLayout = getNewTabLayout(selectedGroup, this.mainTabsLayout)

        this.setMainTabsLayout(newTabLayout)
      }
    }
  }

  public onLayoutChange = (layout: Layout[]) => {
    this.saveLayout()
    this.saveMainTabs()
    this.saveSpareTabs()
    this.setMainTabsLayout(layout)
  }

  public changeTabsHeight = () => {
    const newLayout = getLayoutOnMassiveChange(
      this.mainTabs,
      this.mainTabsLayout,
    )

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

  public toggleCharts = () => {
    if (this._inCharts) {
      const openedUnits = this._beforeShowChartsOpened ?? new Set<string>()
      this._beforeShowChartsOpened = null
      this.setMainTabs(prev =>
        prev.map(tab => {
          const units = tab.units.map(unit => ({
            ...unit,
            isOpen: openedUnits.has(tabUnit(unit, tab)),
          }))

          const groupIsOpen = !units.some(unit => !unit.isOpen)

          return { ...tab, isOpen: groupIsOpen, units }
        }),
      )
      this.setInCharts(false)
      return
    }

    const openedUnits = new Set<string>()
    this.mainTabs.forEach(group =>
      group.units.forEach(unit => {
        if (unit.isOpen) {
          openedUnits.add(tabUnit(unit, group))
        }
      }),
    )

    this._beforeShowChartsOpened = openedUnits
    this.setInCharts(true)
    this.toggleAll(true)
  }

  public onToggleFavorite = (
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
      this.setMainTabsLayout(getUpdatedLayout(sortedTabs, this.mainTabsLayout))
    } else {
      const selectedGroup = this.spareTabs.find(
        group => group.name === groupName,
      )

      if (selectedGroup?.isFavorite) {
        selectedGroup.isFavorite = !selectedGroup.isFavorite
      } else {
        this.setSpareTabs(prev =>
          prev.filter((_, index) => index !== groupIndex),
        )

        const newMainTabs = [...this.mainTabs, selectedGroup!]
        const newLayout = getNewTabLayout(selectedGroup!, this.mainTabsLayout)

        newMainTabs.forEach((item, index) => {
          if (item.name === groupName) {
            newMainTabs[index].isFavorite = !newMainTabs[index].isFavorite
          }
        })

        const sortedTabs = getSortedTabs(newMainTabs)
        this.setMainTabs(sortedTabs)
        this.setMainTabsLayout(getUpdatedLayout(sortedTabs, newLayout))
      }
    }
  }

  public reset = () => {
    this.toggleViewType(ViewTypeDashboard.List)

    this._beforeShowChartsOpened = null
    this._mainTabsLayout = []
    this._mainTabs = []
    this._spareTabs = []
    this._groups = []
    this._filterValue = ''
    this._inCharts = false
  }
}
