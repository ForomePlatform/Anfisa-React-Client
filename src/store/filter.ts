import cloneDeep from 'lodash/cloneDeep'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import { makeAutoObservable, runInAction, toJS } from 'mobx'
import { TVariant } from 'service-providers/common/common.interface'

import { IStatFuncData, StatListType } from '@declarations'
import { ActionFilterEnum } from '@core/enum/action-filter.enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import { getApiUrl } from '@core/get-api-url'
import { GlbPagesNames } from '@glb/glb-names'
import { FilterControlOptions } from '@pages/filter/ui/filter-control/filter-control.const'
import datasetStore from './dataset'

export type SelectedFiltersType = Record<
  string,
  Record<string, Record<string, number>>
>

interface AddSelectedFiltersI {
  group: string
  groupItemName: string
  variant?: TVariant
  variants?: any[]
  modeTypes?: boolean[]
}

export class FilterStore {
  method!: GlbPagesNames | FilterControlOptions
  selectedGroupItem: StatListType = {}
  dtreeSet: any = {}
  selectedFilters: SelectedFiltersType = {}
  actionName?: ActionFilterEnum
  statFuncData: any = []
  filterCondition: Record<string, any> = {}
  memorizedSelectedFilters: SelectedFiltersType | undefined = undefined

  selectedFiltersHistory: SelectedFiltersType[] = []

  constructor() {
    makeAutoObservable(this)
  }

  setActionName(actionName?: ActionFilterEnum) {
    this.actionName = actionName
  }

  resetActionName() {
    this.actionName = undefined
  }

  setMethod(method: GlbPagesNames | FilterControlOptions) {
    this.method = method
  }

  setSelectedGroupItem(item: StatListType) {
    this.selectedGroupItem = item
  }

  addSelectedFilters({
    group,
    groupItemName,
    variant,
    variants,
    modeTypes,
  }: AddSelectedFiltersI) {
    if (!this.selectedFilters[group]) {
      this.selectedFilters[group] = {}
    }

    if (!this.selectedFilters[group][groupItemName]) {
      this.selectedFilters[group][groupItemName] = {}
    }

    if (variants) {
      variants.forEach(item => {
        this.selectedFilters[group][groupItemName][item[0]] = item[1]
      })
    }

    if (variant) {
      this.selectedFilters[group][groupItemName][variant[0]] = variant[1]
    }
    console.log(modeTypes)

    // temporarilly, remove this agr begin required
    if (modeTypes) {
      if (modeTypes[0]) {
        this.selectedFilters[group][groupItemName][ModeTypes.All] = 1
      }

      if (modeTypes[1]) {
        this.selectedFilters[group][groupItemName][ModeTypes.Not] = 1
      }

      console.log(toJS(this.selectedFilters))
    }
  }

  removeSelectedFilters({
    group,
    groupItemName,
    variant,
  }: AddSelectedFiltersI) {
    if (!this.selectedFilters[group]) {
      return
    }

    if (this.selectedFilters[group][groupItemName] && variant) {
      delete this.selectedFilters[group][groupItemName][variant[0]]
    }

    if (isEmpty(this.selectedFilters[group][groupItemName])) {
      delete this.selectedFilters[group][groupItemName]
    }

    if (isEmpty(this.selectedFilters[group])) {
      delete this.selectedFilters[group]
    }
  }

  addSelectedFilterGroup(
    group: string,
    groupItemName: string,
    variants: any[],
  ) {
    if (!this.selectedFilters[group]) {
      this.selectedFilters[group] = {}
    }

    if (!this.selectedFilters[group][groupItemName]) {
      this.selectedFilters[group][groupItemName] = {}
    }

    variants.forEach(variant => {
      this.selectedFilters[group][groupItemName][variant[0]] = variant[1]
    })
  }

  removeSelectedFiltersGroup(group: string, groupItemName: string) {
    if (this.selectedFilters[group][groupItemName]) {
      delete this.selectedFilters[group][groupItemName]
    }

    if (isEmpty(this.selectedFilters[group])) {
      delete this.selectedFilters[group]
    }
  }

  async fetchDsInfoAsync() {
    const response = await fetch(
      getApiUrl(`dsinfo?ds=${datasetStore.datasetName}`),
    )

    const result = await response.json()

    return result
  }

  async fetchProblemGroupsAsync() {
    const dsInfo = await this.fetchDsInfoAsync()

    return Object.keys(get(dsInfo, 'meta.samples', {}))
  }

  async fetchStatFuncAsync(unit: string, param?: any) {
    const conditions = JSON.stringify(datasetStore.conditions)

    const body = new URLSearchParams({
      ds: datasetStore.datasetName,
      conditions,
      rq_id: String(Date.now()),
      unit,
    })

    param && body.append('param', param)

    const response = await fetch(getApiUrl('statfunc'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })

    const result: IStatFuncData = await response.json()

    runInAction(() => {
      this.statFuncData = result
    })

    return result
  }

  resetData() {
    this.method = GlbPagesNames.Filter
    this.selectedGroupItem = {}
    this.dtreeSet = {}
    this.selectedFilters = {}
  }

  resetStatFuncData() {
    this.statFuncData = []
  }

  setSelectedFilters(filters: SelectedFiltersType) {
    this.selectedFilters = JSON.parse(JSON.stringify(filters))
  }

  setSelectedFiltersHistory(history: SelectedFiltersType[]) {
    this.selectedFiltersHistory = JSON.parse(JSON.stringify(history))
  }

  setFilterCondition<T = any>(filterName: string, values: T) {
    this.filterCondition[filterName] = cloneDeep(values)
  }

  readFilterCondition<T = any>(filterName: string) {
    return this.filterCondition[filterName]
      ? (this.filterCondition[filterName] as T)
      : undefined
  }

  resetFilterCondition() {
    this.filterCondition = {}
  }

  clearFilterCondition(filterName: string, subFilterName?: string) {
    subFilterName
      ? delete this.filterCondition[filterName][subFilterName]
      : delete this.filterCondition[filterName]
  }

  memorizeSelectedFilters() {
    this.memorizedSelectedFilters = toJS(this.selectedFilters)
  }

  applyMemorizedFilters() {
    if (this.memorizedSelectedFilters) {
      this.selectedFilters = this.memorizedSelectedFilters
    }
  }
}

export default new FilterStore()
