import difference from 'lodash/difference'

import { Condition } from '@store/dataset'

interface ICompareConditionsProps {
  currentConditions: Condition[]
  startConditions: Condition[]
  currentPreset?: string
  prevPreset?: string
}

export const compareConditions = ({
  currentConditions,
  startConditions,
  currentPreset,
  prevPreset,
}: ICompareConditionsProps): boolean => {
  if (currentConditions.length !== startConditions.length) return true

  if (prevPreset && currentPreset !== prevPreset) return true

  const sum = currentConditions.reduce(
    (acc, condition: any[], index): number => {
      if (difference(condition[index], startConditions[index]).length === 0) {
        acc += 1
      }
      return acc
    },
    0,
  )

  if (sum === currentConditions.length) return false

  return false
}
