import { toJS } from 'mobx'

import { ChangeStepActionType } from '@declarations'
import dtreeStore from '@store/dtree'
import stepStore from '@store/dtree/step.store'
import {
  ActionTypes,
  InstrModifyingActionNames,
  TInstrModifyingActions,
} from '@service-providers/decision-trees'
import datasetStore from '../store/dataset/dataset'

export const changeStep = (
  index: number,
  action: ChangeStepActionType,
): void => {
  const code = dtreeStore.dtreeCode ?? 'return False'
  const localStepData = toJS(stepStore.steps)

  localStepData.length = index + 1
  const emptyStepList = localStepData.filter(
    element => element.groups.length === 0 && !element.isFinalStep,
  )

  const stepIndex = dtreeStore.getStepIndexForApi(index - emptyStepList.length)

  const isIncludeAction = action === InstrModifyingActionNames.BOOL_TRUE
  const isExcludeAction = action === InstrModifyingActionNames.BOOL_FALSE
  const isBooleanAction = isIncludeAction || isExcludeAction

  const indexOfFinalStep = stepStore.steps.length - 1
  const isFinalStep = index === indexOfFinalStep
  const isPrevStepEmpty = !stepStore.steps[indexOfFinalStep - 1].groups.length

  let location = stepIndex

  if (!isFinalStep && isBooleanAction) {
    location = stepIndex + 1
  } else if (isFinalStep) {
    location =
      isPrevStepEmpty && stepStore.steps.length === 2
        ? stepIndex
        : stepIndex + 1
  }

  const shouldResetAllData = index === 0 && stepStore.steps.length === 2

  if (shouldResetAllData) {
    dtreeStore.clearAll()
  }

  dtreeStore.resetLocalDtreeCode()

  dtreeStore.fetchDtreeSetAsync({
    ds: datasetStore.datasetName,
    code,
    instr: [ActionTypes.INSTR, action, +location] as TInstrModifyingActions,
  })

  dtreeStore.setDtreeModifyed()
}
