import { makeAutoObservable, reaction, toJS } from 'mobx'

import { t } from '@i18n'
import { BaseAsyncDataStore, TBaseDataStoreFetchOptions } from '@store/common'
import {
  ISolutionEntryDescription,
  TCondition,
} from '@service-providers/common'
import { filteringProvider } from '@service-providers/filtering-regime'
import { showToast } from '@utils/notifications/showToast'
import { validatePresetName } from '@utils/validation/validatePresetName'
import datasetStore from './dataset'

type TFilterPresetStoreQuery = {
  datasetName: string
}

class AvailablePresetsStore extends BaseAsyncDataStore<
  ISolutionEntryDescription[],
  TFilterPresetStoreQuery
> {
  constructor() {
    super()
  }

  protected fetch(
    query: TFilterPresetStoreQuery,
    options: TBaseDataStoreFetchOptions,
  ): Promise<ISolutionEntryDescription[]> {
    return filteringProvider
      .getDsStat(
        {
          ds: query.datasetName,
          tm: 0,
        },
        {
          signal: options.abortSignal,
        },
      )
      .then(response => response['filter-list'])
  }
}

class FilterPresetsStore {
  private _activePreset: string = ''

  private readonly presets = new AvailablePresetsStore()

  constructor() {
    makeAutoObservable(this)

    // TODO: temporary for avoid circular dependencies
    datasetStore.getActivePreset = () => this.activePreset

    reaction(
      () => datasetStore.datasetName,
      datasetName => {
        this.resetActivePreset()
        this.presets.setQuery({ datasetName })
      },
    )
  }

  public get availablePresets(): ISolutionEntryDescription[] {
    return toJS(this.presets.data) ?? []
  }

  public get activePreset(): string {
    return this._activePreset
  }

  public get activePresetInfo(): ISolutionEntryDescription | undefined {
    const presetName = this.activePreset

    return this.availablePresets.find(preset => preset.name === presetName)
  }

  public setActivePreset(preset: string): void {
    this._activePreset = preset
  }

  public resetActivePreset() {
    this.setActivePreset('')
  }

  public createPreset(
    presetName: string,
    conditions: ReadonlyArray<TCondition>,
  ): void {
    if (!validatePresetName(presetName)) {
      showToast(t('filter.notValidName'), 'error')

      return
    }

    filteringProvider
      .updateFilterPreset({
        ds: datasetStore.datasetName,
        conditions,
        presetName,
      })
      .then(
        () => {
          this.presets.invalidate()
          this.setActivePreset(presetName)
          showToast(
            t('header.presetAction.success.create', { presetName }),
            'success',
          )
        },
        () => {
          showToast(
            t('header.presetAction.error.create', { presetName }),
            'error',
          )
        },
      )
  }

  public modifyPreset(
    presetName: string,
    conditions: ReadonlyArray<TCondition>,
  ): void {
    filteringProvider
      .updateFilterPreset({
        ds: datasetStore.datasetName,
        conditions,
        presetName,
      })
      .then(
        () => {
          this.setActivePreset(presetName)
          showToast(
            t('header.presetAction.success.modify', { presetName }),
            'success',
          )
        },
        () => {
          showToast(
            t('header.presetAction.error.modify', { presetName }),
            'error',
          )
        },
      )
  }

  deletePreset(presetName: string): void {
    if (this.activePreset === presetName) {
      this.resetActivePreset()
    }

    filteringProvider
      .deleteFilterPreset({
        ds: datasetStore.datasetName,
        presetName,
      })
      .then(
        () => {
          this.presets.invalidate()
          showToast(
            t('header.presetAction.success.delete', { presetName }),
            'success',
          )
        },
        () => {
          showToast(
            t('header.presetAction.error.delete', { presetName }),
            'error',
          )
        },
      )
  }
}

export default new FilterPresetsStore()
