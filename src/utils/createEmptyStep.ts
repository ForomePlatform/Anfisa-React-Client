import { toJS } from 'mobx'

import dtreeStore from '@store/dtree'
import activeStepStore, {
  ActiveStepOptions,
} from '@store/dtree/active-step.store'

export const createEmptyStep = (
  stepIndex: number,
  position: 'BEFORE' | 'AFTER',
  indexForTest: number,
) => {
  //

  activeStepStore.setActiveStep(indexForTest, ActiveStepOptions.StartedVariants)
  const test = activeStepStore.stepIndexForApi
  //

  dtreeStore.insertStep(position, stepIndex)

  const currentIndex = position === 'BEFORE' ? stepIndex : stepIndex + 2
  const indexForApi = dtreeStore.getStepIndexForApi(currentIndex)
  const code = toJS(dtreeStore.dtreeCode)

  dtreeStore.setCurrentStepIndexForApi(indexForApi)
  dtreeStore.fetchDtreeStatAsync(code, String(indexForApi))
}
