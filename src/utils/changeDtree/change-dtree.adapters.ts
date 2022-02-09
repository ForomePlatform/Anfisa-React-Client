import { toJS } from 'mobx'

import dtreeStore from '@store/dtree'

class ChangeDtreeAdapters {
  getIndexWithoutEmptySteps(index?: number): number {
    const stepIndex = index ?? dtreeStore.currentStepIndex
    const localStepData = toJS(dtreeStore.stepData)
    const emptyStepList = localStepData.filter(
      element => element.groups.length === 0 && !element.isFinalStep,
    )

    const calculatedIndex = stepIndex - emptyStepList.length

    return calculatedIndex
  }
}

export default new ChangeDtreeAdapters()
