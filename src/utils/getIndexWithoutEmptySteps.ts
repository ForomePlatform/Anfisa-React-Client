import { toJS } from 'mobx'

import dtreeStore from '@store/dtree'
import activeStepStore from '@store/dtree/active-step.store'

export const getIndexWithoutEmptySteps = (index?: number): number => {
  const stepIndex = index ?? activeStepStore.activeStepIndex
  const localStepData = toJS(dtreeStore.stepData)
  const emptyStepList = localStepData.filter(
    element => element.groups.length === 0 && !element.isFinalStep,
  )

  const calculatedIndex = stepIndex - emptyStepList.length

  return calculatedIndex
}
