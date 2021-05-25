import { isObject } from 'lodash'
import get from 'lodash/get'
import { makeAutoObservable, runInAction } from 'mobx'

import {
  ANYType,
  DsStatType,
  StatList,
  TabReportType,
  WsListType,
  WsTagsType,
} from '../..'
import { ExportTypeEnum } from '../core/enum/export-type.enum'
import { getApiUrl } from '../core/get-api-url'
import { tableColumnMap } from '../core/table-column-map'

class DatasetStore {
  dsStat: DsStatType = {}
  wsList: WsListType = {}
  reccnt: ANYType = []
  tabReport: TabReportType[] = []
  wsTags: WsTagsType = {}
  selectedTags: string[] = []
  columns: string[] = Object.values(tableColumnMap)
  filteredNo: number[] = []

  activePreset = ''
  searchColumnValue = ''

  indexTabReport = 0
  indexFilteredNo = 0

  isLoadingTabReport = false
  isFetchingMore = false
  isLoadingDsStat = false

  constructor() {
    makeAutoObservable(this)
  }

  removeColumn(name: string) {
    this.columns = this.columns.filter(column => column !== name)
  }

  addColumn(name: string) {
    this.columns.push(name)
  }

  setSearchColumnValue(value: string) {
    this.searchColumnValue = value
  }

  setActivePreset(value: string) {
    this.activePreset = value
  }

  removeTag(tagName: string) {
    this.selectedTags = this.selectedTags.filter(tag => tag !== tagName)
  }

  setColumns(columns: string[]) {
    this.columns = columns
  }

  resetData() {
    this.indexTabReport = 0
    this.tabReport = []
    this.wsTags = {}
    this.dsStat = {}
    this.activePreset = ''
    this.selectedTags = []
    this.wsList = {}
    this.reccnt = []
    this.searchColumnValue = ''
  }

  get getColumns() {
    if (this.searchColumnValue) {
      return Object.values(tableColumnMap).filter(key =>
        key
          .toLocaleLowerCase()
          .includes(this.searchColumnValue.toLocaleLowerCase()),
      )
    }

    return Object.values(tableColumnMap)
  }

  get getFilterRefiner() {
    const groups: Record<string, StatList[]> = {}

    this.dsStat['stat-list'] &&
      this.dsStat['stat-list'].forEach((item: StatList) => {
        if (groups[item.vgroup]) {
          groups[item.vgroup] = [...groups[item.vgroup], item]
        } else {
          groups[item.vgroup] = [item]
        }
      })

    return groups
  }

  async fetchDsStatAsync(dsName: string | null) {
    this.isLoadingDsStat = true
    this.isLoadingTabReport = true

    const response = await fetch(getApiUrl(`ds_stat?ds=${dsName}`), {
      method: 'POST',
    })

    const result = await response.json()

    runInAction(() => {
      this.dsStat = result
      this.isLoadingDsStat = false
    })
  }

  async fetchWsListAsync(dsName: string | null) {
    const response = await fetch(getApiUrl(`ws_list?ds=${dsName}`), {
      method: 'POST',
    })

    const result = await response.json()

    runInAction(() => {
      this.wsList = result
    })
  }

  async fetchReccntAsync(dsName: string | null) {
    const response = await fetch(getApiUrl(`reccnt?ds=${dsName}&rec=${11}`))
    const result = await response.json()

    runInAction(() => {
      this.reccnt = result
    })
  }

  async fetchTabReportAsync(dsName: string | null) {
    const variantsAmount = get(this, 'dsStat.total-counts.0', 0)

    if (this.indexTabReport === 0) {
      this.isLoadingTabReport = true
    }

    if (this.indexTabReport !== 0 && this.indexTabReport < variantsAmount) {
      this.isFetchingMore = true
    }

    if (variantsAmount > this.indexTabReport) {
      const arrayLength = variantsAmount < 50 ? variantsAmount : 50

      const seq = Array.from(
        { length: arrayLength },
        (_, i) => i + this.indexTabReport,
      )

      await this._fetchTabReportAsync(dsName || '', seq)

      runInAction(() => {
        this.indexTabReport += 50
      })
    }
  }

  async _fetchTabReportAsync(dsName: string, seq: number[]) {
    if (seq.length === 0) {
      this.isLoadingTabReport = false
      this.isFetchingMore = false

      return
    }

    const response = await fetch(getApiUrl(`tab_report`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        ds: String(dsName),
        schema: 'xbr',
        seq: JSON.stringify(seq),
      }),
    })

    const result = await response.json()

    console.log('result tab report', result)
    runInAction(() => {
      this.tabReport = [...this.tabReport, ...result]
      this.isLoadingTabReport = false
      this.isFetchingMore = false
    })
  }

  async fetchFilteredTabReportAsync(dsName: string) {
    const seq = this.filteredNo.slice(
      this.indexFilteredNo,
      this.indexFilteredNo + 2,
    )

    if (this.indexFilteredNo === 0) {
      this.isLoadingTabReport = true
      this.tabReport = []
    } else {
      this.isFetchingMore = true
    }

    await this._fetchTabReportAsync(dsName, seq)

    this.indexFilteredNo += 2
    this.isFetchingMore = false
  }

  async fetchWsTagsAsync(dsName: string | null) {
    const response = await fetch(getApiUrl(`ws_tags?ds=${dsName}&rec=${0}`), {
      method: 'POST',
    })

    const result = await response.json()

    runInAction(() => {
      this.wsTags = result
      this.selectedTags = [...result['op-tags'], ...result['check-tags']]
    })
  }

  async fetchPresetTaskIdAsync(dsName: string, filter: string) {
    const response = await fetch(
      getApiUrl(`ds_list?ds=${dsName}&filter=${filter}`),
    )

    const result = await response.json()

    await this.fetchJobStatusAsync(result['task_id'], dsName)
  }

  async fetchJobStatusAsync(taskId: string, dsName: string) {
    const response = await fetch(getApiUrl(`job_status?task=${taskId}`))
    const result = await response.json()

    this.filteredNo = result[0].records
      ? result[0].records.map((variant: { no: number }) => variant.no)
      : []

    await this.fetchFilteredTabReportAsync(dsName)
  }

  async exportReportAsync(dsName: string | null, exportType?: ExportTypeEnum) {
    if (exportType === ExportTypeEnum.Excel) {
      const response = await fetch(getApiUrl(`export?ds=${dsName}`), {
        method: 'POST',
      })

      const result = await response.json()
      const responseFile = await fetch(getApiUrl(result.fname))

      await responseFile.blob().then(blob => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')

        a.href = url
        a.download = `${dsName}.xlsx`
        a.click()

        return
      })
    }

    if (exportType === ExportTypeEnum.CSV) {
      const response = await fetch(
        getApiUrl(`csv_export?ds=${dsName}&schema=xbr`),
        {
          method: 'POST',
        },
      )

      await response.blob().then(blob => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')

        a.href = url
        a.download = `${dsName}.csv`
        a.click()

        return
      })
    }
  }
}

export default new DatasetStore()
