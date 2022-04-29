/* eslint-disable max-lines */
import { makeAutoObservable, runInAction, toJS } from 'mobx'

import dirInfoStore from '@store/dirinfo'
import variantStore from '@store/ws/variant'
import zoneStore from '@store/ws/zone'
import {
  IRecordDescriptor,
  TCondition,
  TItemsCount,
} from '@service-providers/common/common.interface'
import datasetProvider from '@service-providers/dataset-level/dataset.provider'
import {
  IDsListArguments,
  ITabReport,
} from '@service-providers/dataset-level/dataset-level.interface'
import { IWsListArguments } from '@service-providers/ws-dataset-support/ws-dataset-support.interface'
import wsDatasetProvider from '@service-providers/ws-dataset-support/ws-dataset-support.provider'

const INCREASE_INDEX = 50

export class DatasetStore {
  wsRecords: IRecordDescriptor[] = []
  tabReport: ITabReport[] = []
  datasetName = ''

  selectedVariantNumber?: number
  filteredNo: number[] = []
  variantsAmount = 0
  offset = 0
  statAmount: TItemsCount | null = null
  indexTabReport = 0
  indexFilteredNo = 0

  isLoadingTabReport = false
  isFetchingMore = false
  isFilterDisabled = false
  reportsLoaded = false

  memorizedConditions:
    | {
        conditions: ReadonlyArray<TCondition>
        activePreset: string
        zone: any[]
      }
    | undefined = undefined

  // TODO: temporary for avoid circular dependencies
  getConditions = (): ReadonlyArray<TCondition> => []
  getActivePreset = (): string => ''
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getJobStatusAsync = (taskId: string): Promise<any> => Promise.resolve()

  constructor() {
    makeAutoObservable(this)
  }

  setIndexTabReport(value: number): void {
    this.indexTabReport = value
  }

  setIndexFilteredNo(value: number): void {
    this.indexFilteredNo = value
  }

  setFilteredNo(value: number[]): void {
    this.filteredNo = value
  }

  setTableOffest(value: number) {
    this.offset = value
  }

  setIsFilterDisabled(value: boolean) {
    this.isFilterDisabled = value
  }

  setSelectedVariantNumber(index: number | undefined) {
    this.selectedVariantNumber = index
  }

  setIsLoadingTabReport(value: boolean) {
    this.isLoadingTabReport = value
  }

  setDatasetName(datasetName: string) {
    this.datasetName = datasetName
  }

  resetData() {
    this.datasetName = ''
    this.variantsAmount = 0
    this.statAmount = null
    this.wsRecords = []
    this.tabReport = []
  }

  async initDatasetAsync(datasetName: string = this.datasetName) {
    this.datasetName = datasetName

    await dirInfoStore.fetchDsinfoAsync(datasetName)
    await this.fetchWsListAsync('withoutTabReport')
    await this.fetchFilteredTabReportAsync()
  }

  async fetchTabReportAsync() {
    if (
      this.indexTabReport !== 0 &&
      this.indexTabReport < this.variantsAmount
    ) {
      this.isFetchingMore = true
    }

    if (this.variantsAmount > this.indexTabReport) {
      const arrayLength =
        this.variantsAmount < INCREASE_INDEX
          ? this.variantsAmount
          : INCREASE_INDEX

      const seq = Array.from(
        { length: arrayLength },
        (_, i) => i + this.indexTabReport,
      )

      await this._fetchTabReportAsync(this.datasetName, seq)

      runInAction(() => {
        this.indexTabReport += INCREASE_INDEX
      })
    }
  }

  async _fetchTabReportAsync(dsName: string, seq: number[]) {
    if (seq.length === 0) {
      this.setIsLoadingTabReport(false)
      this.isFetchingMore = false

      return
    }

    const tabReport = await datasetProvider.getTabReport({
      ds: dsName,
      schema: 'xbr',
      seq,
    })

    runInAction(() => {
      this.tabReport = [...this.tabReport, ...tabReport]
      this.reportsLoaded = this.tabReport.length === this.filteredNo.length
      this.isFetchingMore = false
    })

    this.setIsLoadingTabReport(false)
  }

  async fetchFilteredTabReportAsync() {
    let seq: number[] = []

    if (
      this.selectedVariantNumber !== undefined &&
      this.selectedVariantNumber > 0
    ) {
      const lastVariant = this.filteredNo[this.filteredNo.length - 1]

      const currentSet = Math.ceil(this.selectedVariantNumber / INCREASE_INDEX)
      const lastVariantInSet = currentSet * INCREASE_INDEX

      seq =
        lastVariantInSet >= lastVariant
          ? this.filteredNo
          : this.filteredNo.slice(0, lastVariantInSet)
    } else {
      seq = this.filteredNo.slice(
        this.indexFilteredNo,
        this.indexFilteredNo + INCREASE_INDEX,
      )
    }

    if (this.indexFilteredNo === 0) {
      this.setIsLoadingTabReport(true)
      this.tabReport = []
    } else {
      this.isFetchingMore = true
    }

    await this._fetchTabReportAsync(this.datasetName, seq)

    this.indexFilteredNo += INCREASE_INDEX
    this.isFetchingMore = false
    // eslint-disable-next-line unicorn/no-useless-undefined
    this.setSelectedVariantNumber(undefined)
  }

  async fetchWsListAsync(kind?: string) {
    this.setIsLoadingTabReport(true)

    const params: IWsListArguments | IDsListArguments = {
      ds: this.datasetName,
      filter: this.getActivePreset(),
    }

    if (!this.isFilterDisabled) {
      params.conditions = kind === 'reset' ? [] : this.getConditions()
      ;(params as IWsListArguments).zone = zoneStore.zone
    }

    this.indexFilteredNo = 0

    const wsList = await wsDatasetProvider.getWsList(params)
    runInAction(() => {
      this.filteredNo = wsList.records
        ? wsList.records.map((variant: { no: number }) => variant.no)
        : []

      this.statAmount = wsList['filtered-counts']
      this.wsRecords = wsList.records
    })

    if (kind !== 'withoutTabReport') await this.fetchFilteredTabReportAsync()

    return this.filteredNo
  }

  async fetchWsTagsAsync() {
    if (dirInfoStore.isXL) return

    const wsTags = await wsDatasetProvider.getWsTags({
      ds: this.datasetName,
      rec: variantStore.index,
    })

    runInAction(() => {
      zoneStore.tags = [...wsTags['op-tags'], ...wsTags['check-tags']].filter(
        item => item !== '_note',
      )
    })
  }

  memorizeFilterConditions() {
    this.memorizedConditions = {
      conditions: toJS(this.getConditions()),
      activePreset: this.getActivePreset(),
      zone: toJS(zoneStore.zone),
    }
  }

  get fixedStatAmount() {
    const variantCounts = this.statAmount?.[0] ?? null
    const dnaVariantsCounts = this.statAmount?.[1] ?? null
    const transcriptsCounts = this.statAmount?.[2] ?? null

    return { variantCounts, dnaVariantsCounts, transcriptsCounts }
  }
}

export default new DatasetStore()
