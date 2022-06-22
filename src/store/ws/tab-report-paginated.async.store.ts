import { reaction } from 'mobx'

import { BaseAsyncPaginatedDataStore } from '@store/common'
import mainTableStore from '@store/ws/main-table.store'
import zoneStore from '@store/ws/zone'
import { TTagsDescriptor } from '@service-providers/ws-dataset-support/ws-dataset-support.interface'
import { TabReportAsyncStore, TTabReportQuery } from './tab-report.async.store'
import { WsListAsyncStore } from './ws-list.async.store'

const PAGE_SIZE = 50

export class TabReportPaginatedAsyncStore extends BaseAsyncPaginatedDataStore<TabReportAsyncStore> {
  private readonly wsListAsyncStore: WsListAsyncStore

  constructor(wsListStore: WsListAsyncStore) {
    super(TabReportAsyncStore)

    this.wsListAsyncStore = wsListStore

    reaction(
      () => wsListStore.data,
      () => {
        this.reset()
      },
    )
  }

  public getPageNo(recNo: number): number | undefined {
    const currentPage = this.pages.find(page => {
      if (page.data?.find(pageData => pageData._no === recNo)) {
        return true
      }
    })

    return currentPage ? this.pages.indexOf(currentPage) : undefined
  }

  public getRecIndex(pageNo: number, recNo: number): number | undefined {
    let recIndex

    this.pages[pageNo].data?.find((pageData, index) => {
      if (pageData._no === recNo) {
        recIndex = index

        return true
      }
    })

    return recIndex ?? undefined
  }

  public updateRowTags(recNo: number, tags: TTagsDescriptor) {
    const pageNo = this.getPageNo(recNo)

    if (typeof pageNo === 'number') {
      const recIndex = this.getRecIndex(pageNo, recNo)

      if (typeof recIndex === 'number') {
        this.pages[pageNo].data![recIndex] = {
          ...this.pages[pageNo].data![recIndex],
          _tags: tags,
        }
      }
    }

    zoneStore.hasDifferenceWithZoneTags(tags) &&
      mainTableStore.wsList.invalidate()

    zoneStore.fetchZoneTagsAsync()
  }

  protected getPageQuery(pageNum: number): TTabReportQuery | undefined {
    const ds = this.wsListAsyncStore.query?.datasetName
    const seq = this.wsListAsyncStore.data?.records
      .slice(pageNum * PAGE_SIZE, (pageNum + 1) * PAGE_SIZE)
      .map(record => record.no)

    if (!ds || !seq || !seq.length) {
      return undefined
    }

    return {
      ds,
      seq,
    }
  }
}
