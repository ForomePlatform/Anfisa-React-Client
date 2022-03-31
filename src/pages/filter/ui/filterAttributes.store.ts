import { difference } from 'lodash'
import { makeAutoObservable, toJS } from 'mobx'

import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import datasetStore, { DatasetStore } from '@store/dataset'
import filterStore, { FilterStore } from '@store/filter'
import { TEnumCondition } from '@service-providers/common/common.interface'
import { getConditionJoinMode } from '@utils/getConditionJoinMode'

type FilterAttributesStoreParams = {
  datasetStore: DatasetStore
  filterStore: FilterStore
}

type FilterGroup = {
  vgroup: string
  groupName: string
}

/**
 * TODO: I think it would be better to update the state of filters
 *       based on the setConditionsAsync response,
 *       than use separately updated filter state in filterStore
 */

export class FilterAttributesStore {
  private datasetStore: DatasetStore
  private filterStore: FilterStore

  currentMode?: ModeTypes

  constructor(params: FilterAttributesStoreParams) {
    const { datasetStore, filterStore } = params

    this.datasetStore = datasetStore
    this.filterStore = filterStore

    makeAutoObservable(this)
  }

  public setCurrentMode(modeType?: ModeTypes): void {
    this.currentMode = modeType ?? undefined
  }

  public resetCurrentMode(): void {
    this.currentMode = undefined
  }

  public get currentGroup(): FilterGroup {
    return {
      vgroup: this.filterStore.selectedGroupItem.vgroup,
      groupName: this.filterStore.selectedGroupItem.name,
    }
  }

  get filteredEnumVariants(): [string, number][] {
    return toJS(this.getAllEnumVariants(this.currentGroup))
  }

  get allEnumVariants(): [string, number][] {
    const allEnumVariants: [string, number][] =
      this.datasetStore.dsStat['stat-list']?.find(
        (item: any) => item.name === this.currentGroup.groupName,
      )?.variants ?? []

    return toJS(allEnumVariants)
  }

  public get groupSubKind(): string {
    return this.filterStore.selectedGroupItem['sub-kind']
  }

  updateEnumFilter(group: FilterGroup, values: string[]): void {
    const { groupName } = group

    const condition: TEnumCondition = [
      FilterKindEnum.Enum,
      groupName,
      getConditionJoinMode(this.currentMode),
      values,
    ]

    this.filterStore.isRedactorMode
      ? this.filterStore.addFilterToFilterBlock(condition)
      : this.filterStore.addFilterBlock(condition)

    if (this.datasetStore.activePreset) {
      this.datasetStore.resetActivePreset()
    }

    this.resetCurrentMode()
  }

  public updateCurrentGroupEnumFilter(values: string[]): void {
    this.updateEnumFilter(this.currentGroup, values)
  }

  addValuesToEnumFilter(group: FilterGroup, values: string[]): void {
    this.updateEnumFilter(group, values)
  }

  public addValuesToCurrentGroupEnumFilter(values: string[]): void {
    this.addValuesToEnumFilter(this.currentGroup, values)
  }

  private getAllEnumVariants(group: FilterGroup): [string, number][] {
    const { groupName } = group

    const { selectedFilter } = filterStore

    const allSelectedFilters: [string, number][] =
      this.datasetStore.dsStat['stat-list']?.find(
        (item: any) => item.name === groupName,
      )?.variants ?? []

    const filteredSelectedFilters = allSelectedFilters.filter(
      ([, filterValue]) => filterValue > 0,
    )

    if (selectedFilter) {
      // There are some cases when preset contains third party filters with 0 variants
      // Thats why we have to insert them in order to show

      const selectedFiltersNames = selectedFilter[3]

      const allSelectedFiltersNames = allSelectedFilters.map(item => item[0])

      const thirdPartyFilters = difference(
        selectedFiltersNames,
        allSelectedFiltersNames,
      )

      thirdPartyFilters.forEach(filterName =>
        filteredSelectedFilters.push([filterName, 0]),
      )

      return filteredSelectedFilters
    }

    return filteredSelectedFilters
  }
}

export default new FilterAttributesStore({
  datasetStore,
  filterStore,
})
