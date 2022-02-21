import { toJS } from 'mobx'

import dtreeStore from '@store/dtree'

export enum ActiveStepOptions {
  StartedVariants = 'startedVariants',
  ReturnedVariants = 'returnedVariants',
}

class ActiveStep {
  activeStepIndex: number = 0
  activeStepOption: ActiveStepOptions = ActiveStepOptions.StartedVariants

  setActiveStep(index: number, option: ActiveStepOptions) {
    this.activeStepIndex = index
    this.activeStepOption = option
  }

  get stepIndexForApi(): string {
    const { dtreeStepIndices: indexes, stepData } = toJS(dtreeStore)

    const lastIndexFromIndexes = indexes[indexes.length - 1]

    // add final step index to indexes
    if (lastIndexFromIndexes) {
      const indexForFinalStep = +lastIndexFromIndexes + 2

      indexes.push(String(indexForFinalStep))
    }

    const isTreeEmpty = indexes.length === 0
    const firstStepIndex = '0'

    const emptyStepIndex = stepData.findIndex(
      ({ groups, isFinalStep }) => groups.length === 0 && !isFinalStep,
    )
    const treeHasEmptyStep = emptyStepIndex !== -1

    if (!isTreeEmpty && treeHasEmptyStep) {
      const copiedIndex = indexes[emptyStepIndex - 1] ?? firstStepIndex
      indexes.splice(emptyStepIndex, 0, copiedIndex)
    }

    // index is undefined in First step and Final step in Empty Tree
    const indexFromIndexes = indexes[this.activeStepIndex] ?? firstStepIndex

    const isReturnedVariants =
      this.activeStepOption === ActiveStepOptions.ReturnedVariants

    const indexForApi = isReturnedVariants
      ? String(+indexFromIndexes + 1)
      : indexFromIndexes

    console.log('indexForApi', indexForApi)
    console.log('indexes', indexes)

    return indexForApi
  }

  makeStepActive(index: number, option: ActiveStepOptions) {
    this.setActiveStep(index, option)
    dtreeStore.changeStepDataAcitveStep(index, option)

    const { dtreeCode } = dtreeStore
    dtreeStore.fetchDtreeStatAsync(dtreeCode, this.stepIndexForApi)
  }
}

export default new ActiveStep()
