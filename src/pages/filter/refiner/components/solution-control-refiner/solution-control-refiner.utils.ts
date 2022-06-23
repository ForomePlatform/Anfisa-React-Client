import filterStore from '@store/filter'
import filterPresetsStore from '@store/filter-presets'

export const applyPreset = (presetName: string): void => {
  filterPresetsStore.setActivePreset(presetName)
}

export const joinPreset = (presetName: string): void => {
  filterStore.joinPresetConditions(presetName)
}

export const modifyPreset = (presetName: string): void => {
  filterPresetsStore.modifyPreset(presetName, filterStore.conditions)
}

export const deletePreset = (presetName: string): void => {
  filterPresetsStore.deletePreset(presetName)
}
