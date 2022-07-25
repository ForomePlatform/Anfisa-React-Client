import cloneDeep from 'lodash/cloneDeep'
import { makeAutoObservable, observable, reaction, toJS } from 'mobx'

import { LocalStoreManager } from '@core/storage-management/local-store-manager'
import { TVariantAspectsGridLayout } from '@components/variant-aspects-layout'
import { predefinedPresets } from './variant-drawer.data'
import {
  IVariantDrawerData,
  IVariantDrawerGridPreset,
  VariantDrawerLayoutMode,
} from './variant-drawer.interface'

const presetsSortComparator = (
  a: IVariantDrawerGridPreset,
  b: IVariantDrawerGridPreset,
): number => {
  if (a.predefinedName !== b.predefinedName) {
    return a.predefinedName ? -1 : 1
  }

  return a.name.localeCompare(b.name)
}

class VariantDrawerStore {
  public layoutMode: VariantDrawerLayoutMode = VariantDrawerLayoutMode.Gallery
  public galleryActiveAspect = ''
  public appliedPreset: string | null = null

  private customGridPresets: IVariantDrawerGridPreset[]
  private currentGridLayout: TVariantAspectsGridLayout | undefined

  constructor() {
    makeAutoObservable<VariantDrawerStore, 'customGridPresets'>(this, {
      customGridPresets: observable.shallow,
    })

    const { mode, presets, preset } = VariantDrawerStore.restoreData()

    this.layoutMode = mode
    this.customGridPresets = presets
    this.appliedPreset = preset

    if (this.appliedPreset) {
      this.applyGridPreset(this.appliedPreset)
    }

    reaction(() => this.layoutData, VariantDrawerStore.saveData)
  }

  public get gridLayout(): TVariantAspectsGridLayout {
    return toJS(this.currentGridLayout ?? [])
  }

  public get gridWindowsOpenState(): boolean {
    return this.currentGridLayout?.some(item => item.h > 1) ?? false
  }

  public get gridPresets(): IVariantDrawerGridPreset[] {
    return [...predefinedPresets, ...toJS(this.customGridPresets)].sort(
      presetsSortComparator,
    )
  }

  public readonly setLayoutMode = (type: VariantDrawerLayoutMode): void => {
    this.layoutMode = type
  }

  public readonly setGridLayout = (layout: TVariantAspectsGridLayout): void => {
    if (!layout.length) {
      this.appliedPreset = predefinedPresets[0].name
    }

    this.currentGridLayout = layout
  }

  public readonly applyGridPreset = (presetName: string) => {
    const preset = this.gridPresets.find(item => item.name === presetName)

    if (preset) {
      this.appliedPreset = presetName

      this.currentGridLayout = preset.layout?.length
        ? cloneDeep(preset.layout)
        : []
    }
  }

  public readonly saveGridPreset = (presetName: string) => {
    const presetIndex = this.customGridPresets.findIndex(
      ({ name }) => name === presetName,
    )
    const preset = {
      name: presetName,
      layout: this.currentGridLayout,
    }

    if (presetIndex < 0) {
      this.customGridPresets.push(preset)
    } else {
      this.customGridPresets[presetIndex] = preset
    }

    this.appliedPreset = presetName
  }

  public readonly deleteGridPreset = (presetName: string) => {
    this.customGridPresets = this.customGridPresets.filter(
      preset => preset.name !== presetName,
    )
  }

  public readonly modifyGridPreset = (presetName: string) => {
    this.customGridPresets.map((preset, index) => {
      if (preset.name === presetName) {
        this.customGridPresets[index].layout = this.currentGridLayout
      }
    })
  }

  public readonly setGalleryActiveAspect = (aspect: string): void => {
    this.galleryActiveAspect = aspect
  }

  private get layoutData(): IVariantDrawerData {
    return toJS({
      mode: this.layoutMode,
      presets: toJS(this.customGridPresets),
      preset: this.appliedPreset,
      layout: this.gridLayout,
    })
  }

  private static restoreData(): IVariantDrawerData {
    const data: Partial<IVariantDrawerData> | undefined =
      LocalStoreManager.read('variantDrawer')

    return {
      mode: data?.mode ?? VariantDrawerLayoutMode.Gallery,
      presets: data?.presets ?? [],
      preset: data?.preset ?? null,
    }
  }

  private static saveData(data: IVariantDrawerData) {
    LocalStoreManager.write('variantDrawer', data)
  }
}

export const variantDrawerStore = new VariantDrawerStore()
