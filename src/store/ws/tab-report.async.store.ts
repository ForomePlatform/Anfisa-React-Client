import { action, makeObservable } from 'mobx'

import { BaseAsyncDataStore, TBaseDataStoreFetchOptions } from '@store/common'
import {
  datasetProvider,
  ITabReportArguments,
  TTabReport,
} from '@service-providers/dataset-level'
import { TTagsDescriptor } from '@service-providers/ws-dataset-support'

export type TTabReportQuery = Omit<ITabReportArguments, 'schema'>

export class TabReportAsyncStore extends BaseAsyncDataStore<
  TTabReport,
  TTabReportQuery
> {
  constructor() {
    super({
      dataObservable: 'shallow',
    })

    makeObservable(this, {
      updateRowTags: action,
    })
  }

  public getRecordIndex(recNo: number): number {
    return this.data?.findIndex(record => record._no === recNo) ?? -1
  }

  public updateRowTags(index: number, tags: TTagsDescriptor) {
    if (this.data) {
      this.data[index] = {
        ...this.data[index],
        _tags: tags,
      }
    }
  }

  protected async fetch(
    query: TTabReportQuery,
    options: TBaseDataStoreFetchOptions,
  ): Promise<TTabReport> {
    return datasetProvider.getTabReport(
      {
        ds: query.ds,
        schema: 'xbr',
        seq: query.seq,
      },
      {
        signal: options.abortSignal,
      },
    )
  }
}
