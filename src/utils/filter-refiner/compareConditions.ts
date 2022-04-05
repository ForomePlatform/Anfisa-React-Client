import { Condition } from '@store/dataset'
import presetStore from '@store/filterPreset'

interface ICompareConditionsProps {
  currentConditions: Condition[]
  startConditions: any[]
  currentPreset?: string
  prevPreset?: string
}

export const compareConditions = ({
  currentConditions,
  startConditions,
  currentPreset,
  prevPreset,
}: ICompareConditionsProps): boolean => {
  if (!currentPreset) return false

  if (currentConditions.length !== startConditions.length) return true

  if (prevPreset && currentPreset !== prevPreset) return true

  return presetStore.isPresetDataModified
}
