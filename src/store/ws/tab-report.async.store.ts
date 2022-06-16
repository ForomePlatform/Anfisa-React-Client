import { BaseAsyncDataStore, TBaseDataStoreFetchOptions } from '@store/common'
import {
  datasetProvider,
  ITabReportArguments,
  TTabReport,
} from '@service-providers/dataset-level'

export type TTabReportQuery = Omit<ITabReportArguments, 'schema'>

export class TabReportAsyncStore extends BaseAsyncDataStore<
  TTabReport,
  TTabReportQuery
> {
  constructor() {
    super({
      dataObservable: 'shallow',
    })
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
