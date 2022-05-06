import datasetStore from '@store/dataset/dataset'
import dtreeStore from '@store/dtree'
import {
  ActionTypes,
  InstrModifyingActionNames,
} from '@service-providers/decision-trees'

export const negateStep = (stepIndex: number) => {
  const code = dtreeStore.dtreeCode ?? 'return False'

  const stepIndexForApi = dtreeStore.getStepIndexForApi(stepIndex)

  dtreeStore.fetchDtreeSetAsync({
    ds: datasetStore.datasetName,
    code,
    instr: [
      ActionTypes.INSTR,
      InstrModifyingActionNames.NEGATE,
      stepIndexForApi,
    ],
  })

  dtreeStore.resetLocalDtreeCode()
}
