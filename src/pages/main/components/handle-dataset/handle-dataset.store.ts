import { toast } from 'react-toastify'
import { makeAutoObservable, reaction } from 'mobx'

import { getApiUrl } from '@core/get-api-url'
import datasetStore from '@store/dataset/dataset'
import dirInfoStore from '@store/dirinfo'
import operationsProvider from '@service-providers/operations/operations.provider'
import { downloadFile } from '@utils/download-file/download-file'

class HandleDatasetStore {
  public isImportModalShown = false
  public isExportModalShown = false
  public isSupportSelected = true
  public isDocumentationSelected = true
  public importDatasetName = ''
  public uploadedFiles?: FileList = undefined
  public isExporting = false
  public isImporting = false
  private _dsName = ''
  private _isDsNameSet = false

  public get isImportDisabled() {
    return !this.uploadedFiles?.length || !this.importDatasetName
  }

  public get isExportDisabled() {
    if (this._isDsNameSet) return false
    return (
      (datasetStore.dsInfoData &&
        !Object.keys(datasetStore.dsInfoData).length) ||
      datasetStore.isXL ||
      !dirInfoStore.selectedDirinfoName
    )
  }

  public get selectedDatasetName() {
    return datasetStore.dsInfoData?.name as string
  }

  constructor() {
    makeAutoObservable(this)
    reaction(
      () => datasetStore.dsInfoData,
      dsInfo => {
        this._dsName = dsInfo?.name || ''
        this._isDsNameSet = false
      },
    )
  }

  public setDsName(dsName: string) {
    this._dsName = dsName
    this._isDsNameSet = true
  }

  public toggleImportModal(isShown: boolean) {
    this.isImportModalShown = isShown
  }

  public toggleExportModal(isShown: boolean) {
    this.isExportModalShown = isShown
  }

  public toggleSupport(value: boolean) {
    this.isSupportSelected = value
  }

  public toggleDocumentation(value: boolean) {
    this.isDocumentationSelected = value
  }

  public setDatasetName(newName: string) {
    this.importDatasetName = newName
  }

  public setUploadedFiles = (files: FileList, fileName: string) => {
    this.uploadedFiles = files

    if (!this.importDatasetName) {
      this.importDatasetName = fileName.split('.')[0]
    }
  }

  public resetImportData() {
    this.importDatasetName = ''
    this.uploadedFiles = undefined
  }

  public resetExportData() {
    this.isDocumentationSelected = true
    this.isSupportSelected = true
  }

  public resetDsName() {
    this._isDsNameSet = false
  }

  public exportDataset = async () => {
    const ds = this._isDsNameSet ? this._dsName : this.selectedDatasetName
    this.isExporting = true
    const response = await operationsProvider.exportDataset({
      ds,
      support: this.isSupportSelected,
      doc: this.isDocumentationSelected,
    })

    const { kind, url } = response

    downloadFile(getApiUrl(url), `${ds}.${kind}`)
    this.isExporting = false
    this.isExportModalShown = false
  }

  public importDataset = async () => {
    if (!this.uploadedFiles?.length) return

    if (!this.isUniqueDsName(this.importDatasetName)) {
      toast.error('Dataset name is not unique')
      return
    }

    this.isImporting = true
    await this.uploadDataset(this.uploadedFiles[0])
    this.isImporting = false
  }

  private async uploadDataset(file: Blob) {
    try {
      const response = await operationsProvider.importDataset({
        file,
        name: this.importDatasetName,
      })

      if (response.error) {
        toast.error(response.error)
      } else {
        toast.success(
          `Dataset ${this.importDatasetName} has been successfully imported`,
        )
        this.isImportModalShown = false
      }
    } catch (e) {
      toast.error('Import failed')
    }
  }

  private isUniqueDsName(name: string) {
    return !Object.keys(dirInfoStore.dirInfoData?.dsDict || {}).some(
      dsName => dsName === name,
    )
  }
}

export default new HandleDatasetStore()
