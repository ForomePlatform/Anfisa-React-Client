import { computed, makeObservable } from 'mobx'

import { BaseAsyncDataStore, TBaseDataStoreFetchOptions } from '@store/common'
import {
  ITagSelect,
  wsDatasetProvider,
} from '@service-providers/ws-dataset-support'

type TTagSelectQuery = {
  datasetName: string
}

export class TagSelectAsyncStore extends BaseAsyncDataStore<
  ITagSelect,
  TTagSelectQuery
> {
  constructor() {
    super({
      dataObservable: 'shallow',
    })

    makeObservable(this, {
      tags: computed,
    })
  }

  public get tags(): string[] {
    return this.data?.tagList.filter(tag => tag !== '_note') ?? []
  }

  protected fetch(
    query: TTagSelectQuery,
    options: TBaseDataStoreFetchOptions,
  ): Promise<ITagSelect> {
    return wsDatasetProvider.getTagSelect(
      {
        ds: query.datasetName,
      },
      {
        signal: options.abortSignal,
      },
    )
  }
}
