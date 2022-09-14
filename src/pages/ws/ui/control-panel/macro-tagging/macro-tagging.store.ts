import { TypeOptions } from 'react-toastify'
import { makeAutoObservable } from 'mobx'

import { t } from '@i18n'
import { datasetStore } from '@store/dataset'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import filterPresetsStore from '@store/filter-presets'
import mainTableStore from '@store/ws/main-table.store'
import zoneStore from '@store/ws/zone.store'
import { ZoneName } from '@pages/ws/ui/control-panel/macro-tagging/macro-tagging.interfaces'
import { TZoneSetting } from '@service-providers/common'
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

  private get zone(): undefined | TZoneSetting[] {
    const result: TZoneSetting[] = []

    if (zoneStore.selectedGenes.length) {
      result.push([ZoneName.Symbol, zoneStore.selectedGenes])
    }

    if (zoneStore.selectedGenesList.length) {
      result.push([ZoneName.GeneLists, zoneStore.selectedGenesList])
    }

    if (zoneStore.selectedSamples.length) {
      result.push([ZoneName.HasVariant, zoneStore.selectedSamples])
    }

    if (zoneStore.selectedTags.length) {
      result.push([ZoneName.Tags, zoneStore.selectedTags])

      if (zoneStore.isModeNOT) {
        result.slice(-1)[0].push(false)
      }
    }

    return result.length ? result : undefined
  }

  private get params() {
    const filter =
      filterPresetsStore.activePreset || dtreeStore.currentDtreeName

    const zone = this.zone
    const conditions = filterStore.conditions

    const params: IMacroTaggingArgumentsAsync = {
      ds: datasetStore.datasetName,
      tag: this.tag,
      delay: true,
    }

    if (filter) {
      params.filter = filter
    }

    if (zone) {
      params.zone = zone
    }

    if (conditions && conditions.length) {
      params.conditions = conditions
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
