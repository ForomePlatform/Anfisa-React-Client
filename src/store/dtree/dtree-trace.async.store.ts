import { BaseAsyncDataStore, TBaseDataStoreFetchOptions } from '@store/common'
import dtreeStore from '@store/dtree'
import {
  IDtreeTraceVariantData,
  TDtreeTraceVariantResult,
} from '@service-providers/decision-trees/decision-trees.interface'
import decisionTreesProvider from '@service-providers/decision-trees/decision-trees.provider'
import operationsProvider from '@service-providers/operations/operations.provider'

export class DtreeTraceAsyncStore extends BaseAsyncDataStore<
  TDtreeTraceVariantResult,
  IDtreeTraceVariantData
> {
  constructor() {
    super()
  }

  protected getCacheKey(query: IDtreeTraceVariantData): string | undefined {
    return query.variant.split(' ')[0] // + ':' + query.transcript // reserved for future use
  }

  public getCacheKeys(): Array<string> {
    return super.getCacheKeys()
  }

  protected async fetch(
    query: IDtreeTraceVariantData,
    options: TBaseDataStoreFetchOptions,
  ): Promise<TDtreeTraceVariantResult> {
    try {
      const response = await decisionTreesProvider.traceVariant(
        dtreeStore.getTraceVariantQuery(query),
        {
          signal: options.abortSignal,
        },
      )
      const data =
        (await operationsProvider.getJobStatusAsync<TDtreeTraceVariantResult>(
          response.task_id,
          500,
          options.abortSignal,
        )) as TDtreeTraceVariantResult
      return data
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
