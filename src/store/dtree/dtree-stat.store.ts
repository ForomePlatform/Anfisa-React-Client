import { computed, IReactionDisposer, makeObservable, reaction } from 'mobx'

import { BaseStatUnitsStore, TBaseDataStoreFetchOptions } from '@store/common'
import { dtreeProvider, TDtreeStat } from '@service-providers/decision-trees'

type TDtreeStatRequest = {
  datasetName: string
  code: string
  stepIndex: string
}

export class DtreeStatStore extends BaseStatUnitsStore<
  TDtreeStat,
  TDtreeStatRequest
> {
  private readonly disposeCacheCleaner: IReactionDisposer

  constructor() {
    super()

    makeObservable<DtreeStatStore, 'cacheClearKey'>(this, {
      cacheClearKey: computed,
    })

    this.disposeCacheCleaner = reaction(
      () => this.cacheClearKey,
      () => {
        this.clearCache()
      },
    )
  }

  public dispose() {
    this.disposeCacheCleaner()
  }

  protected fetch(
    request: TDtreeStatRequest,
    { abortSignal }: TBaseDataStoreFetchOptions,
  ): Promise<TDtreeStat> {
    return dtreeProvider.getFullDtreeStat(
      {
        ds: request.datasetName,
        code: request.code,
        no: request.stepIndex,
      },
      {
        abortSignal,
        onPartialResponse: data => {
          this.data = data
        },
      },
    )
  }

  protected getCacheKey(request: TDtreeStatRequest): string | undefined {
    return request.stepIndex
  }

  private get cacheClearKey(): string {
    if (!this.request) {
      return ''
    }

    return this.request?.datasetName + '_' + this.request?.code
  }
}
