import {
  IReactionDisposer,
  makeAutoObservable,
  reaction,
  runInAction,
} from 'mobx'
import { nanoid } from 'nanoid'

import { IStatFuncData, StatListType } from '@declarations'
import { ActionFilterEnum } from '@core/enum/action-filter.enum'
import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { getApiUrl } from '@core/get-api-url'
import { GlbPagesNames } from '@glb/glb-names'
import { FilterControlOptions } from '@pages/filter/ui/filter-control/filter-control.const'
import datasetProvider from '@service-providers/dataset-level/dataset.provider'
import { TCondition } from './../service-providers/common/common.interface'
import datasetStore from './dataset'

export type SelectedFiltersType = Record<
  string,
  Record<string, Record<string, number>>
>

export interface IRemoveFilter {
  filterId: string
  subFilterIdx: number
  filterType: string
}

export class FilterStore {
  private _selectedFilters = new Map<string, TCondition>()

  method!: GlbPagesNames | FilterControlOptions
  selectedGroupItem: StatListType = {}

  actionName?: ActionFilterEnum
  statFuncData: any = []
  memorizedSelectedFilters: SelectedFiltersType | undefined | any = undefined

  selectedFiltersHistory: SelectedFiltersType[] = []

  activeFilterId: string = ''
  isRedactorMode = false

  loadConditions: IReactionDisposer

  constructor() {
    makeAutoObservable(this)

    this.loadConditions = reaction(
      () => this.conditions,
      () => {
        if (this.conditions.length > 0 && this.method !== GlbPagesNames.Table) {
          datasetStore.fetchDsStatAsync()

          if (!datasetStore.isXL) {
            datasetStore.fetchWsListAsync()
          }
        }
      },
    )
  }

  public dispose() {
    this.loadConditions()
  }

  public get selectedFiltersArray(): [string, TCondition][] {
    return Array.from(this._selectedFilters)
  }

  public get conditions() {
    return Array.from(this._selectedFilters.values())
  }

  public get selectedFilter(): TCondition {
    return this._selectedFilters.get(this.activeFilterId)!
  }

  public addFilterBlock(condition: TCondition): void {
    const filterId: string = nanoid()

    this._selectedFilters.set(filterId, condition)
  }

  public removeFilterBlock(filterId: string): void {
    this._selectedFilters.delete(filterId)
    this.resetIsRedacorMode()
  }

  public addFilterToFilterBlock(condition: TCondition): void {
    this._selectedFilters.set(this.activeFilterId, condition)
  }

  public removeFilterFromFilterBlock({
    filterId,
    subFilterIdx,
    filterType,
  }: IRemoveFilter): void {
    const currentCondition = this._selectedFilters.get(filterId)!

    if (
      filterType === FilterKindEnum.Numeric ||
      currentCondition[3]?.length === 1
    ) {
      this._selectedFilters.delete(filterId)
      return
    }

    currentCondition[3]?.splice(subFilterIdx, 1)
  }

  public async fetchDsInfoAsync() {
    return await datasetProvider.getDsInfo({ ds: datasetStore.datasetName })
  }

  public async fetchProblemGroupsAsync() {
    const dsInfo = await this.fetchDsInfoAsync()

    return dsInfo.meta.samples
  }

  public async fetchStatFuncAsync(unit: string, param?: any) {
    const conditions = JSON.stringify(this.conditions)

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

  public resetData() {
    this.method = GlbPagesNames.Filter
    this.selectedGroupItem = {}
    this.resetSelectedFilters()
  }

  public resetSelectedFilters() {
    this._selectedFilters = new Map()
    this.resetIsRedacorMode()
    this.resetActiveFilterId()
  }

  public resetStatFuncData() {
    this.statFuncData = []
  }

  public setSelectedFiltersHistory(history: SelectedFiltersType[]) {
    this.selectedFiltersHistory = JSON.parse(JSON.stringify(history))
  }

  public setActiveFilterId(filterId: string) {
    this.activeFilterId = filterId
  }

  public resetActiveFilterId() {
    this.activeFilterId = ''
  }

  public setActionName(actionName?: ActionFilterEnum) {
    this.actionName = actionName
  }

  public resetActionName() {
    this.actionName = undefined
  }

  public setMethod(method: GlbPagesNames | FilterControlOptions) {
    this.method = method
  }

  public setSelectedGroupItem(item: StatListType) {
    this.selectedGroupItem = item
  }

  public resetSelectedGroupItem() {
    this.selectedGroupItem = {}
  }

  public setIsRedacorMode() {
    this.isRedactorMode = true
  }

  public resetIsRedacorMode() {
    this.isRedactorMode = false
  }

  public memorizeSelectedFilters() {
    this.memorizedSelectedFilters = this._selectedFilters
  }

  public applyMemorizedFilters() {
    if (this.memorizedSelectedFilters) {
      this._selectedFilters = this.memorizedSelectedFilters
    }
  }
}

export default new FilterStore()
