import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import datasetStore from '@store/dataset/dataset'
import filterStore from '@store/filter'
import filterPresetsStore from '@store/filter-presets'
import zoneStore from '@store/ws/zone'
import {
  TCondition,
  TItemsCount,
} from '@service-providers/common/common.interface'
import { TTabReport } from '@service-providers/dataset-level'
import wsDatasetProvider from '@service-providers/ws-dataset-support/ws-dataset-support.provider'
import { TabReportPaginatedAsyncStore } from './tab-report-paginated.async.store'
import variantStore from './variant'
import { IWsListQuery, WsListAsyncStore } from './ws-list.async.store'

export class MainTable {
  public wsList = new WsListAsyncStore()
  public tabReport = new TabReportPaginatedAsyncStore(this.wsList)

  public isTableResizing = false
  public openedVariantPageNo = 0

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

  public get tabReportPagesData(): TTabReport {
    const pagesData: TTabReport = []

    this.tabReport.pages.forEach(page =>
      page.data?.forEach(item => {
        pagesData.push(toJS(item))
      }),
    )

    return pagesData
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

  // update zone tags if smth was added in drawer
  async fetchWsTagsAsync() {
    if (datasetStore.isXL) return

    const wsTags = await wsDatasetProvider.wsTags({
      ds: datasetStore.datasetName,
      rec: variantStore.index,
    })

    runInAction(() => {
      zoneStore.tags = [...wsTags.opTags, ...wsTags.checkTags].filter(
        item => item !== '_note',
      )
    })
  }

  setIsTableRecizing(value: boolean) {
    this.isTableResizing = value
  }

  setOpenedVariantPageNo(variantIndex: number) {
    const totalPagesAmount = this.tabReport.pagesCount
    const totalVariantsLoaded = this.tabReportPagesData.length

    const variantPerPage = totalVariantsLoaded / totalPagesAmount
    const difference = variantIndex - variantPerPage

    this.openedVariantPageNo =
      difference < 1 ? 0 : Math.ceil(difference / variantPerPage)
  }

  memorizeFilterConditions() {
    this.memorizedConditions = {
      conditions: toJS(filterStore.conditions),
      activePreset: filterPresetsStore.activePreset,
      zone: toJS(zoneStore.zone),
    }
  }
}

export default new MainTable()
