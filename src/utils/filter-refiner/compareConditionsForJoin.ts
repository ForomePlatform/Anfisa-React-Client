import difference from 'lodash/difference'
import { toJS } from 'mobx'

import { Condition } from '@store/dataset'

interface ICompareConditionsProps {
  currentConditions: Condition[]
  startConditions: Condition[]
  currentPreset?: string
  prevPreset?: string
}

export const compareConditionsForJoin = ({
  currentConditions,
  startConditions,
  currentPreset,
  prevPreset,
}: ICompareConditionsProps): boolean => {
  if (!currentPreset) return false

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

  // const someResult = currentConditions.every((condition: any[], index) => {
  //   if (
  //     difference(condition[index], startConditions[index]).length === 0 &&
  //     condition[condition.length - 1].length ===
  //       startConditions[startConditions.length - 1].length
  //   ) {
  //     return true
  //   }
  //   return false
  // })

  console.log(toJS(currentConditions), toJS(startConditions))
  console.log(sum)

  if (sum === currentConditions.length) return false

  return true
}
