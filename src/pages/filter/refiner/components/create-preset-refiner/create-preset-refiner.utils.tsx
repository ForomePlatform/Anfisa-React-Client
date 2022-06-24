import filterStore from '@store/filter'
import filterPresetsStore from '@store/filter-presets'

export const createPreset = (presetName: string): void => {
  filterPresetsStore.createPreset(presetName, filterStore.conditions)
}
