import { makeAutoObservable, toJS } from 'mobx'

import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import datasetStore, { DatasetStore } from '@store/dataset'
import filterStore, { FilterStore } from '@store/filter'
import {
  ConditionJoinMode,
  TCondition,
  TEnumCondition,
} from '@service-providers/common/common.interface'

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

  constructor(params: FilterAttributesStoreParams) {
    const { datasetStore, filterStore } = params

    this.datasetStore = datasetStore
    this.filterStore = filterStore

    makeAutoObservable(this)
  }

  get currentGroup(): FilterGroup {
    return {
      vgroup: this.filterStore.selectedGroupItem.vgroup,
      groupName: this.filterStore.selectedGroupItem.name,
    }
  }

  get allEnumVariants(): [string, number][] {
    return toJS(this.getAllEnumVariants(this.currentGroup))
  }

  get datasetEnumValues(): string[] {
    return toJS(this.getDatasetEnumValues(this.currentGroup))
  }

  updateEnumFilter(group: FilterGroup, values: string[]): void {
    const { groupName } = group

    const condition: TEnumCondition = [
      FilterKindEnum.Enum,
      groupName,
      ConditionJoinMode.OR,
      values,
    ]
    this.filterStore.addFilterBlock(condition)

    if (this.datasetStore.activePreset) {
      this.datasetStore.resetActivePreset()
    }

    datasetStore.fetchDsStatAsync()

    if (!this.datasetStore.isXL) {
      this.datasetStore.fetchWsListAsync()
    }
  }

  updateCurrentGroupEnumFilter(values: string[]): void {
    this.updateEnumFilter(this.currentGroup, values)
  }

  addValuesToEnumFilter(group: FilterGroup, values: string[]): void {
    const datasetValues = this.getDatasetEnumValues(group)

    this.updateEnumFilter(group, [...datasetValues, ...values])
  }

  addValuesToCurrentGroupEnumFilter(values: string[]): void {
    this.addValuesToEnumFilter(this.currentGroup, values)
  }

  private getAllEnumVariants(group: FilterGroup): [string, number][] {
    const { groupName } = group

    return (
      this.datasetStore.dsStat['stat-list']?.find(
        (item: any) => item.name === groupName,
      )?.variants ?? []
    )
  }

  private getDatasetEnumValues(group: FilterGroup): string[] {
    const { groupName } = group
    const { conditions } = filterStore

    return (
      conditions.find((element: TCondition) => element[1] === groupName)?.[3] ??
      []
    )
  }
}

export default new FilterAttributesStore({
  datasetStore,
  filterStore,
})
