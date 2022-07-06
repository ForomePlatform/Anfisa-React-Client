import { reaction } from 'mobx'

import { BaseAsyncPaginatedDataStore } from '@store/common'
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

  public getPageWithRecord(
    recNo: number,
  ): [TabReportAsyncStore | undefined, number] {
    for (const page of this.pages) {
      const recIndex = page.getRecordIndex(recNo)

      if (recIndex > -1) {
        return [page, recIndex]
      }
    }

    return [undefined, -1]
  }

  public updateRowTags(recNo: number, tags: TTagsDescriptor) {
    const [page, index] = this.getPageWithRecord(recNo)

    if (page && page.data && index > -1) {
      page.updateRowTags(index, tags)
    }
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
