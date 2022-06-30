import { makeAutoObservable, reaction } from 'mobx'

import { createHistoryObserver } from '@store/common'
import { VariantAspectsAsyncStore } from '@store/variant-aspects.async.store'
import mainTableStore from '@store/ws/main-table.store'
import { IReccntArguments } from '@service-providers/dataset-level'
import { datasetStore } from '../dataset'
import { TWsTagsAsyncStoreQuery, WsTagsAsyncStore } from './ws-tags.async.store'

export class VariantStore {
  readonly record = new VariantAspectsAsyncStore({ keepPreviousData: true })
  readonly tags = new WsTagsAsyncStore({
    onChange: mainTableStore.updateRecordTags,
  })

  readonly observeHistory = createHistoryObserver({
    variant: {
      get: () => (this.variantNo >= 0 ? this.variantNo.toString() : null),
      apply: value => {
        const variantNo = parseInt(value ?? '', 10)
        this.showVariant(
          !Number.isNaN(variantNo) && variantNo >= 0 ? variantNo : -1,
        )
      },
    },
  })

  variantNo = -1

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
    }
  }

  closeVariant = () => {
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
