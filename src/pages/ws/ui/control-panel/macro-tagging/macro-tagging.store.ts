import { TypeOptions } from 'react-toastify'
import { makeAutoObservable } from 'mobx'

import { t } from '@i18n'
import { datasetStore } from '@store/dataset'
import mainTableStore from '@store/ws/main-table.store'
import operationsProvider from '@service-providers/operations/operations.provider'
import {
  IMacroTaggingArgumentsAsync,
  wsDatasetProvider,
} from '@service-providers/ws-dataset-support'
import { showToast } from '@utils/notifications'
import { MacroTaggingActions } from './macro-tagging.constants'

class MacroTaggingStore {
  public tag: string = ''
  public isLoading: boolean = false
  public isConfirmOpen: boolean = false
  public action?: MacroTaggingActions

  private get params() {
    const params: IMacroTaggingArgumentsAsync = {
      ds: datasetStore.datasetName,
      tag: this.tag,
      delay: true,
    }

    if (this.action === MacroTaggingActions.Remove) {
      params.off = true
    }

    return params
  }

  constructor() {
    makeAutoObservable(this)
  }

  public async updateMacroTags() {
    this.setIsLoading(true)
    if (this.isConfirmOpen) {
      this.setIsConfirmOpen(false)
    }
    try {
      const { task_id } = await wsDatasetProvider.updateMacroTaggingAsync(
        this.params,
      )
      await operationsProvider.getJobStatusAsync(task_id)
      this.onSucceedUpdate()
    } catch (error: any) {
      this.showToaster(error?.message || error, 'error')
      this.reset()
    }
  }

  private onSucceedUpdate() {
    mainTableStore.wsList.invalidate()
    this.showToaster(
      t(
        this.action !== MacroTaggingActions.Remove
          ? 'ds.macroTagsModal.toastApplied'
          : 'ds.macroTagsModal.toastRemoved',
      ),
      'success',
    )
    this.reset()
  }

  private showToaster(message: string, kind: Exclude<TypeOptions, 'default'>) {
    showToast(message, kind, {
      position: 'top-right',
      autoClose: 3500,
      style: { top: 40 },
    })
  }

  public setIsLoading(value: boolean) {
    this.isLoading = value
  }

  public setTag(value: string) {
    this.tag = value
  }

  public setAction(action: MacroTaggingActions | undefined) {
    this.action = action
  }

  public setIsConfirmOpen(value: boolean) {
    this.isConfirmOpen = value
  }

  public reset() {
    this.setTag('')
    this.setIsLoading(false)
    this.setAction(undefined)
  }
}

export default new MacroTaggingStore()
