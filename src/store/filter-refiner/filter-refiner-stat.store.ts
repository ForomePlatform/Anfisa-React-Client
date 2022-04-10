import { BaseStatUnitsStore, TBaseDataStoreFetchOptions } from '@store/common'
import { TCondition } from '@service-providers/common'
import { filteringProvider, TDsStat } from '@service-providers/filtering-regime'

export type TFilterRefinerStatRequest = {
  datasetName: string
  conditions: TCondition[]
}

export class FilterRefinerStatStore extends BaseStatUnitsStore<
  TDsStat,
  TFilterRefinerStatRequest
> {
  constructor() {
    super()
  }

  protected fetch(
    request: TFilterRefinerStatRequest,
    { abortSignal }: TBaseDataStoreFetchOptions,
  ): Promise<TDsStat> {
    return filteringProvider.getFullDsStat(
      {
        ds: request.datasetName,
        conditions: request.conditions,
      },
      {
        abortSignal,
        onPartialResponse: data => {
          this.data = data
        },
      },
    )
  }
}
