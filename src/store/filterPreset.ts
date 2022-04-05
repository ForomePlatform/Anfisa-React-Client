import { makeAutoObservable, runInAction } from 'mobx'

import { getApiUrl } from '@core/get-api-url'
import { t } from '@i18n'
import filterStore from '@store/filter'
import { showToast } from '@utils/notifications/showToast'
import datasetStore from './dataset'

export const DEFAULT_PRESET_LABEL = '⏚'

class PresetStore {
  private _isPresetDataModified = false

  constructor() {
    makeAutoObservable(this)
  }

  public get isPresetDataModified() {
    return this._isPresetDataModified
  }

  public setIsPresetDataModified() {
    this._isPresetDataModified = true
  }

  public resetIsPresetDataModified() {
    this._isPresetDataModified = false
  }

  async loadPresetAsync(filter: string) {
    this.resetIsPresetDataModified()

    const body = new URLSearchParams({
      ds: datasetStore.datasetName,
      filter,
    })

    const response = await fetch(getApiUrl('ds_stat'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })

    const result = await response.json()

    runInAction(() => {
      datasetStore.updatePresetLoad(result)
      datasetStore.dsStat = result
    })
  }

  async deletePresetAsync(presetName: string) {
    this.resetIsPresetDataModified()

    const { conditions } = filterStore

    const body = new URLSearchParams({
      ds: datasetStore.datasetName,
      conditions: JSON.stringify(conditions),
      instr: JSON.stringify(['DELETE', presetName]),
    })

    const response = await fetch(getApiUrl('ds_stat'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })

    const result = await response.json()

    datasetStore.dsStat = result
  }

  async joinPresetAsync(presetName: string) {
    this.resetIsPresetDataModified()

    const { conditions } = filterStore

    const body = new URLSearchParams({
      ds: datasetStore.datasetName,
      instr: JSON.stringify(['JOIN', presetName]),
    })

    body.append('conditions', JSON.stringify(conditions))

    const result = await datasetStore.fetchDsStatAsync(false, body)

    await datasetStore.updatePresetLoad(result)
  }

  async updatePresetAsync(presetName: string) {
    const { conditions } = filterStore

    const body = new URLSearchParams({
      ds: datasetStore.datasetName,
      conditions: JSON.stringify(conditions),
      instr: JSON.stringify(['UPDATE', presetName]),
    })

    const response = await fetch(getApiUrl('ds_stat'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })

    const result = await response.json()

    runInAction(() => {
      datasetStore.dsStat = result
    })

    await datasetStore.updatePresetLoad(result)
  }

  deletePreset(): void {
    this.deletePresetAsync(datasetStore.activePreset)

    datasetStore.resetActivePreset()

    datasetStore.resetPrevPreset()

    filterStore.resetActionName()

    showToast(t('header.presetFilterAction.delete'), 'success')
  }

  joinPreset(preset: string): void {
    this.joinPresetAsync(preset)

    filterStore.resetActionName()

    datasetStore.resetActivePreset()

    showToast(t('header.presetFilterAction.join'), 'success')

    preset && datasetStore.setPrevPreset(preset)
  }

  createPreset(createPresetName: string): void {
    createPresetName && this.updatePresetAsync(createPresetName)

    filterStore.resetActionName()

    datasetStore.setActivePreset(createPresetName)

    showToast(t('general.presetCreated'), 'success')
  }

  modifyPreset(preset: string): void {
    this.resetIsPresetDataModified()

    this.updatePresetAsync(preset)

    filterStore.resetActionName()

    showToast(t('header.presetFilterAction.modify'), 'success')

    preset && datasetStore.setPrevPreset(preset)
  }

  loadPreset(preset: string): void {
    if (preset === datasetStore.activePreset) return

    datasetStore.activePreset &&
      datasetStore.setPrevPreset(datasetStore.activePreset)

    datasetStore.setActivePreset(preset)

    if (filterStore.actionName) return

    if (datasetStore.prevPreset !== datasetStore.activePreset) {
      this.loadPresetAsync(preset)
    }
  }
}

export default new PresetStore()
