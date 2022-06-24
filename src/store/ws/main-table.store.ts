import { makeAutoObservable, reaction, toJS } from 'mobx'

import datasetStore from '@store/dataset/dataset'
import filterStore from '@store/filter'
import filterPresetsStore from '@store/filter-presets'
import zoneStore from '@store/ws/zone'
import {
  TCondition,
  TItemsCount,
} from '@service-providers/common/common.interface'
import { TTagsDescriptor } from '@service-providers/ws-dataset-support'
import { TabReportPaginatedAsyncStore } from './tab-report-paginated.async.store'
import { IWsListQuery, WsListAsyncStore } from './ws-list.async.store'

export class MainTable {
  public wsList = new WsListAsyncStore()
  public tabReport = new TabReportPaginatedAsyncStore(this.wsList)

  memorizedConditions:
    | {
        conditions: ReadonlyArray<TCondition>
        activePreset: string
        zone: any[]
      }
    | undefined = undefined

  constructor() {
    makeAutoObservable(this)

    reaction(
      () => this.wsListQuery,
      query => {
        if (datasetStore.isXL) return

        if (!datasetStore.dsInfoData?.name) {
          this.wsList.reset()
        } else {
          this.wsList.setQuery(query)
        }
      },
    )
  }

  private get wsListQuery(): IWsListQuery {
    const conditions = !filterPresetsStore.activePreset
      ? filterStore.conditions
      : []
    return {
      datasetName: datasetStore.dsInfoData?.name,
      filter: filterPresetsStore.activePreset,
      conditions,
      zone: zoneStore.zone,
    }
  }

  public get wsRecords() {
    return this.wsList.data?.records
  }

  public get filteredNo(): number[] {
    return this.wsRecords
      ? this.wsRecords.map((variant: { no: number }) => variant.no)
      : []
  }

  public get statAmount(): TItemsCount | undefined {
    return filterStore.conditions.length || zoneStore.zone.length
      ? this.wsList.data?.filteredCounts
      : this.wsList.data?.totalCounts
  }

  public get fixedStatAmount() {
    const variantCounts = this.statAmount?.[0] ?? undefined
    const dnaVariantsCounts = this.statAmount?.[1] ?? undefined
    const transcriptsCounts = this.statAmount?.[2] ?? undefined

    return { variantCounts, dnaVariantsCounts, transcriptsCounts }
  }

  public get variantsForExport(): number | undefined {
    return datasetStore.isXL
      ? filterStore.stat.filteredCounts?.variants
      : this.fixedStatAmount.variantCounts
  }

  public memorizeFilterConditions() {
    this.memorizedConditions = {
      conditions: toJS(filterStore.conditions),
      activePreset: filterPresetsStore.activePreset,
      zone: toJS(zoneStore.zone),
    }
  }

  public updateRecordTags = (
    recNo: number,
    tags: TTagsDescriptor,
    prevTags?: TTagsDescriptor,
  ): void => {
    zoneStore.invalidateTags()

    if (zoneStore.hasDifferenceWithZoneTags(tags, prevTags)) {
      this.wsList.invalidate()
    } else {
      this.tabReport.updateRowTags(recNo, tags)
    }
  }
}

export default new MainTable()
