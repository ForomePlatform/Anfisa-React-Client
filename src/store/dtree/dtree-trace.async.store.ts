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
    return query.variant.split(' ')[0] + ':' + query.transcript
  }

  protected async fetch(
    query: IDtreeTraceVariantData,
    options: TBaseDataStoreFetchOptions,
  ): Promise<TDtreeTraceVariantResult> {
    const response = await decisionTreesProvider.traceVariant(
      dtreeStore.getTraceVariantQuery(query),
      {
        signal: options.abortSignal,
      },
    )

    return (await operationsProvider.getJobStatusAsync<TDtreeTraceVariantResult>(
      response.task_id,
    )) as TDtreeTraceVariantResult
  }
}
