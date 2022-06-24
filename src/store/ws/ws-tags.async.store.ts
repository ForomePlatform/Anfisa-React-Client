import { action, computed, makeObservable, toJS } from 'mobx'

import { BaseAsyncDataStore, TBaseDataStoreFetchOptions } from '@store/common'
import {
  IWsTags,
  IWsTagsArguments,
  TTagsDescriptor,
  TTagsDescriptorSpecial,
} from '@service-providers/ws-dataset-support/ws-dataset-support.interface'
import wsDatasetProvider from '@service-providers/ws-dataset-support/ws-dataset-support.provider'

export type TWsTagsAsyncStoreQuery = Omit<IWsTagsArguments, 'tags'>

const NOTE_KEY: keyof TTagsDescriptorSpecial = '_note'

const isNotSpecial = (tag: string) => tag !== NOTE_KEY

interface IWsTagsAsyncStoreParams {
  onChange: (rec: number, tags: TTagsDescriptor) => void
}

export class WsTagsAsyncStore extends BaseAsyncDataStore<
  IWsTags,
  TWsTagsAsyncStoreQuery
> {
  onChange: (rec: number, tags: TTagsDescriptor) => void

  constructor(parmas: IWsTagsAsyncStoreParams) {
    super()
    this.onChange = parmas.onChange

    makeObservable(this, {
      availableTags: computed,
      recordTags: computed,
      noteText: computed,
      onChange: action,
    })
  }

  public get availableTags(): string[] {
    return (
      toJS(this.data?.checkTags)?.concat(
        toJS(this.data?.opTags.filter(isNotSpecial) ?? []),
      ) ?? []
    )
  }

  public get recordTags(): string[] {
    return Object.keys(this.data?.recTags ?? {}).filter(isNotSpecial)
  }

  public get noteText(): string {
    return this.data?.recTags?.[NOTE_KEY] ?? ''
  }

  public saveTags(newTags: string[]): void {
    const recTags = toJS(this.data?.recTags)

    if (!recTags) {
      return
    }

    const tags: TTagsDescriptor = {}

    if (recTags._note) {
      tags._note = recTags._note
    }

    for (const tag of newTags) {
      tags[tag] = true
    }

    return this.updateTags(tags)
  }

  public saveNote(noteText: string | null): void {
    const tags = toJS(this.data?.recTags)

    if (!tags) {
      return
    }

    if (noteText) {
      tags._note = noteText
    } else {
      delete tags._note
    }

    return this.updateTags(tags)
  }

  public updateTags(tags: TTagsDescriptor): void {
    if (this.query) {
      const { ds, rec } = this.query

      wsDatasetProvider
        .wsTags({
          ds,
          rec,
          tags,
        })
        .then(result => {
          this.onChange?.(rec, tags)
          if (this.query?.ds === ds && this.query?.rec === rec) {
            this.setData(result)
          }
        })
    }
  }

  protected fetch(
    query: TWsTagsAsyncStoreQuery,
    options: TBaseDataStoreFetchOptions,
  ): Promise<IWsTags> {
    return wsDatasetProvider.wsTags(query, { signal: options.abortSignal })
  }
}
