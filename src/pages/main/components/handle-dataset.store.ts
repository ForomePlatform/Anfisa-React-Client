import { makeAutoObservable } from 'mobx'

import handleDatasetStore from '@store/dirinfo'

class HandleDatasetStore {
  public isImportModalShown = false
  public isExportModalShown = false
  public isSupportSelected = true
  public isDocumentationSelected = true
  public importDatasetName = ''
  public uploadedFiles?: FileList = undefined

  get isImportDisabled() {
    return !this.uploadedFiles?.length || !this.importDatasetName
  }

  get isExportDisabled() {
    return !Object.keys(handleDatasetStore.dsinfo).length
  }

  constructor() {
    makeAutoObservable(this)
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

  public setUploadedFiles = (files: FileList) => {
    this.uploadedFiles = files
  }

  public resetImportData() {
    this.importDatasetName = ''
    this.uploadedFiles = undefined
  }
}

export default new HandleDatasetStore()
