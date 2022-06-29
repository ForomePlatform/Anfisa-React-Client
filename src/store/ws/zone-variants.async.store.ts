import { computed, makeObservable } from 'mobx'

import { BaseAsyncDataStore, TBaseDataStoreFetchOptions } from '@store/common'
import {
  IZoneWithVariants,
  wsDatasetProvider,
} from '@service-providers/ws-dataset-support'

type TZoneVariantsQuery = {
  datasetName: string
}

export class ZoneVariantsAsyncStore extends BaseAsyncDataStore<
  IZoneWithVariants,
  TZoneVariantsQuery
> {
  private readonly zone: string

  constructor(zone: string) {
    super({
      dataObservable: 'ref',
    })
    this.zone = zone

    makeObservable(this, {
      variants: computed,
    })
  }

  public get variants(): string[] {
    return this.data?.variants ?? []
  }

  protected fetch(
    { datasetName }: TZoneVariantsQuery,
    options: TBaseDataStoreFetchOptions,
  ): Promise<IZoneWithVariants> {
    return wsDatasetProvider.getZoneVariants(
      {
        ds: datasetName,
        zone: this.zone,
      },
      {
        signal: options.abortSignal,
      },
    )
  }
}
