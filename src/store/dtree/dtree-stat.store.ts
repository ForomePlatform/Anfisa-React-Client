import { computed, IReactionDisposer, makeObservable, reaction } from 'mobx'

import { TBaseDataStoreFetchOptions } from '@store/common'
import { BaseStatUnitsStore } from '@store/stat-units'
import { dtreeProvider, TDtreeStat } from '@service-providers/decision-trees'

type TDtreeStatQuery = {
  datasetName: string
  code: string
  stepIndex: string
  priorityUnit?: string[]
}

export class DtreeStatStore extends BaseStatUnitsStore<
  TDtreeStat,
  TDtreeStatQuery
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
    query: TDtreeStatQuery,
    { abortSignal }: TBaseDataStoreFetchOptions,
  ): Promise<TDtreeStat> {
    return dtreeProvider.getFullDtreeStat(
      {
        ds: query.datasetName,
        code: query.code,
        no: query.stepIndex,
      },
      {
        abortSignal,
        onPartialResponse: data => {
          this.setData(data)
        },
        priorityUnit: query.priorityUnit,
      },
    )
  }

  protected getCacheKey(request: TDtreeStatQuery): string | undefined {
    return request.stepIndex
  }

  private get cacheClearKey(): string {
    if (!this.query) {
      return ''
    }

    return this.query?.datasetName + '_' + this.query?.code
  }
}
