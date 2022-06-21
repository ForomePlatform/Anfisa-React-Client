import { makeAutoObservable, reaction } from 'mobx'

import { getQueryParam, pushQueryParams } from '@core/history'
import { VariantAspectsAsyncStore } from '@store/variant-aspects.async.store'
import mainTableStore from '@store/ws/main-table.store'
import { IReccntArguments } from '@service-providers/dataset-level'
import datasetStore from '../dataset/dataset'
import { TWsTagsAsyncStoreQuery, WsTagsAsyncStore } from './ws-tags.async.store'

export class VariantStore {
  readonly record = new VariantAspectsAsyncStore({ keepPreviousData: true })
  readonly tags = new WsTagsAsyncStore()

  private isHistoryObserved = false

  variantNo = -1
  isTagsModified = false

  constructor() {
    makeAutoObservable(this)

    reaction(() => this.recordQuery, this.record.handleQuery)
    reaction(() => this.tagsQuery, this.tags.handleQuery)
  }

  public get variantNumber(): number {
    return this.variantNo
  }

  public get datasetName(): string {
    return datasetStore.datasetName
  }

  public get isVariantShown(): boolean {
    return this.variantNo >= 0
  }

  setIsTagsModified(value: boolean) {
    this.isTagsModified = value
  }

  observeVariantHistory() {
    this.isHistoryObserved = true
    const handler = () => {
      const variantNo = parseInt(getQueryParam('variant') ?? '', 10)

      this.isHistoryObserved = false

      if (!Number.isNaN(variantNo)) {
        this.showVariant(variantNo)
      } else {
        this.closeVariant()
      }

      this.isHistoryObserved = true
    }

    handler()

    window.addEventListener('popstate', handler)

    return () => {
      this.isHistoryObserved = false
      window.removeEventListener('popstate', handler)
    }
  }

  prevVariant() {
    this.showVariant(
      mainTableStore.filteredNo.length === 0
        ? this.variantNo + 1
        : mainTableStore.filteredNo[
            mainTableStore.filteredNo.indexOf(this.variantNo) - 1
          ],
    )
  }

  nextVariant() {
    this.showVariant(
      mainTableStore.filteredNo.length === 0
        ? this.variantNo + 1
        : mainTableStore.filteredNo[
            mainTableStore.filteredNo.indexOf(this.variantNo) + 1
          ],
    )
  }

  showVariant(variantNo: number) {
    if (this.variantNo !== variantNo) {
      this.variantNo = variantNo

      if (this.isHistoryObserved) {
        pushQueryParams({
          variant: variantNo >= 0 ? `${variantNo}` : null,
        })
      }
    }
  }

  closeVariant() {
    this.setIsTagsModified(false)
    this.showVariant(-1)
  }

  private get recordQuery(): IReccntArguments | undefined {
    if (!this.datasetName || this.variantNo < 0) {
      return undefined
    }

    const details = mainTableStore.wsRecords?.find(
      record => record.no === this.variantNo,
    )
    const query: IReccntArguments = {
      ds: this.datasetName,
      rec: this.variantNo,
    }

    const isVariantWithoutGene = details?.lb.includes('[None]')

    if (!isVariantWithoutGene) {
      query.details = details?.dt
    }

    return query
  }

  private get tagsQuery(): TWsTagsAsyncStoreQuery | undefined {
    if (!this.datasetName || this.variantNo < 0) {
      return undefined
    }

    return {
      ds: this.datasetName,
      rec: this.variantNo,
    }
  }
}

export default new VariantStore()
