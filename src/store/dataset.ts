import { makeAutoObservable, runInAction } from 'mobx'

import { DsInfoType } from '@declarations'
import { getApiUrl } from '@core/get-api-url'
import { HgModes } from '@service-providers/dataset-level/dataset-level.interface'
import { IDirInfoDatasetDescriptor } from '@service-providers/vault-level/vault-level.interface'

export class DatasetStore {
  datasetName = ''
  dsinfo: DsInfoType = {}
  isXL?: boolean = undefined

  constructor() {
    makeAutoObservable(this)
  }

  setDatasetName(datasetName: string) {
    this.datasetName = datasetName
  }

  setDsInfo(dsinfo: IDirInfoDatasetDescriptor) {
    this.dsinfo = dsinfo as any
  }

  setIsXL(value: boolean) {
    this.isXL = value
  }

  resetData() {
    this.datasetName = ''
    this.dsinfo = {}
  }

  async initDatasetAsync(datasetName: string = this.datasetName) {
    this.datasetName = datasetName

    await this.fetchDsinfoAsync(datasetName)
  }

  async fetchDsinfoAsync(name: string) {
    const response = await fetch(getApiUrl(`dsinfo?ds=${name}`), {
      method: 'POST',
    })

    const result = await response.json()

    runInAction(() => {
      this.dsinfo = result
    })

    this.setIsXL(result?.kind === 'xl')
  }

  // TODO: update type after implantion IDsInfo interface
  get locusMode(): HgModes {
    const meta: any = this.dsinfo.meta
    const hgModeValue: HgModes = meta?.modes?.[0]
    return hgModeValue
  }
}

export default new DatasetStore()
