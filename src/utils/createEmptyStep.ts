import dtreeStore from '@store/dtree'
import activeStepStore, {
  ActiveStepOptions,
} from '@store/dtree/active-step.store'

export const createEmptyStep = (
  stepIndex: number,
  position: 'BEFORE' | 'AFTER',
  isFinalStep?: boolean,
) => {
  const previousStepIndex = stepIndex - 1
  const changedStepIndex = isFinalStep ? previousStepIndex : stepIndex
  dtreeStore.insertStep(position, changedStepIndex)

  activeStepStore.makeStepActive(stepIndex, ActiveStepOptions.StartedVariants)
}
