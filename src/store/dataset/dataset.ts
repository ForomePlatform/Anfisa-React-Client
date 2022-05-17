import { makeAutoObservable, reaction } from 'mobx'

import {
  HgModes,
  IDsInfo,
} from '@service-providers/dataset-level/dataset-level.interface'
import { DsInfoAsyncStore } from './ds-info.async.store'

const CHECK_WORD_FOR_DELETE_DATSET = 'test'
export class DatasetStore {
  private readonly dsInfo = new DsInfoAsyncStore()

  datasetName = ''

  get isPossibleDeleteDataset(): boolean {
    return this.datasetName.toLowerCase().includes(CHECK_WORD_FOR_DELETE_DATSET)
  }

  constructor() {
    makeAutoObservable(this)

    reaction(
      () => this.datasetName,
      datasetName => {
        if (!this.datasetName) {
          return
        } else {
          this.dsInfo.setQuery({ datasetName })
        }
      },
    )
  }

  public get dsInfoData(): IDsInfo | undefined {
    return this.dsInfo.data
  }

  public get isXL(): boolean {
    return this.dsInfoData?.kind === 'xl'
  }

  public setDatasetName(datasetName: string) {
    this.datasetName = datasetName
  }

  public get locusMode(): HgModes | undefined {
    const meta = this.dsInfoData?.meta
    const hgModeValue = meta?.modes?.[0]
    return hgModeValue
  }
}

export default new DatasetStore()
