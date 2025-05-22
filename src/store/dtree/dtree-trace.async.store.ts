import { makeObservable, observable, runInAction } from 'mobx'

import { getApiUrl } from '@core/get-api-url'
import { BaseAsyncDataStore, TBaseDataStoreFetchOptions } from '@store/common'
import dtreeStore from '@store/dtree'
import {
  IDtreeTraceVariantData,
  TDtreeTraceResultData,
  TDtreeTraceVariantResult,
} from '@service-providers/decision-trees/decision-trees.interface'
import decisionTreesProvider from '@service-providers/decision-trees/decision-trees.provider'

export class DtreeTraceAsyncStore extends BaseAsyncDataStore<
  TDtreeTraceVariantResult,
  IDtreeTraceVariantData
> {
  public activeJobStatus: string | undefined

  constructor() {
    super()
    makeObservable(this, {
      activeJobStatus: observable,
    })
  }

  protected getCacheKey(query: IDtreeTraceVariantData): string | undefined {
    return query.variant.split(' ')[0] // + ':' + query.transcript // reserved for future use
  }

  public getCacheKeys(): Array<string> {
    return super.getCacheKeys()
  }

  public setQuery(query: IDtreeTraceVariantData): void {
    runInAction(() => {
      this.activeJobStatus = undefined
    })
    super.setQuery(query)
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
      return await this.getJobStatusAsync(response.task_id)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  private async getJobStatusAsync(
    taskId: string,
    interval = 1000,
  ): Promise<TDtreeTraceVariantResult> {
    if (this.abortController?.signal?.aborted) {
      throw new Error('User aborted')
    }

    const response = await fetch(getApiUrl(`job_status?task=${taskId}`))
    const data: [boolean | null | TDtreeTraceResultData, string] =
      await response.json()

    if (data[0] === null) {
      throw new Error(data[1])
    } else if (data[0]) {
      runInAction(() => {
        this.activeJobStatus = undefined
      })
      return data as TDtreeTraceVariantResult
    }

    runInAction(() => {
      this.activeJobStatus = data[1]
    })
    await new Promise(r => setTimeout(r, interval))
    return await this.getJobStatusAsync(taskId, interval)
  }
}
