import { makeAutoObservable, reaction } from 'mobx'

import { VariantAspectsAsyncStore } from '@store/variant-aspects.async.store'
import mainTableStore from '@store/ws/main-table.store'
import { IReccntArguments } from '@service-providers/dataset-level'
import datasetStore from '../dataset/dataset'
import { TWsTagsAsyncStoreQuery, WsTagsAsyncStore } from './ws-tags.async.store'

export class VariantStore {
  readonly record = new VariantAspectsAsyncStore({ keepPreviousData: true })
  readonly tags = new WsTagsAsyncStore()

  isDrawerVisible = false
  index = -1
  isTagsModified = false

  constructor() {
    makeAutoObservable(this)

    reaction(() => this.recordQuery, this.record.handleQuery)
    reaction(() => this.tagsQuery, this.tags.handleQuery)
  }

  public get datasetName(): string {
    return datasetStore.datasetName
  }

  setIsTagsModified(value: boolean) {
    this.isTagsModified = value
  }

  prevVariant() {
    mainTableStore.filteredNo.length === 0
      ? (this.index += 1)
      : (this.index =
          mainTableStore.filteredNo[
            mainTableStore.filteredNo.indexOf(this.index) - 1
          ])
  }

  nextVariant() {
    mainTableStore.filteredNo.length === 0
      ? (this.index += 1)
      : (this.index =
          mainTableStore.filteredNo[
            mainTableStore.filteredNo.indexOf(this.index) + 1
          ])
  }

  setDrawerVisible(visible: boolean) {
    this.isDrawerVisible = visible
  }

  setIndex(index: number) {
    this.index = index
  }

  // updateGeneralTags(tagName: string) {
  //   this.generalTags = [...this.generalTags, tagName]
  // }
  //
  // updateTagsWithNotes(tagWithNote: any[], operation = 'add') {
  //   if (operation === 'add') {
  //     let keyProp = ''
  //
  //     for (const key in this.tagsWithNotes) {
  //       if (key === tagWithNote[0]) {
  //         keyProp = key
  //       }
  //     }
  //
  //     keyProp
  //       ? (this.tagsWithNotes[keyProp] = tagWithNote[1])
  //       : (this.tagsWithNotes[tagWithNote[0]] = tagWithNote[1])
  //   } else {
  //     delete this.tagsWithNotes[tagWithNote[0]]
  //   }
  // }

  private get recordQuery(): IReccntArguments | undefined {
    if (!this.datasetName || this.index < 0) {
      return undefined
    }

    const details = mainTableStore.wsRecords?.find(
      record => record.no === this.index,
    )
    const query: IReccntArguments = {
      ds: this.datasetName,
      rec: this.index,
    }

    const isVariantWithoutGene = details?.lb.includes('[None]')

    if (!isVariantWithoutGene) {
      query.details = details?.dt
    }

    return query
  }

  private get tagsQuery(): TWsTagsAsyncStoreQuery | undefined {
    if (!this.datasetName || this.index < 0) {
      return undefined
    }

    return {
      ds: this.datasetName,
      rec: this.index,
    }
  }
}

export default new VariantStore()
