import { ModeTypes } from '@core/enum/mode-types-enum'
import datasetStore from '@store/dataset/dataset'
import dtreeStore from '@store/dtree'
import stepStore from '@store/dtree/step.store'
import modalsControlStore from '@pages/filter/dtree/components/modals/modals-control-store'
import {
  ActionTypes,
  AtomModifyingActionName,
} from '@service-providers/decision-trees'
import { getConditionJoinMode } from '@utils/getConditionJoinMode'
import modalsVisibilityStore from '../../pages/filter/dtree/components/modals/modals-visibility-store'

export const changeFunctionalStep = (
  params: any,
  currentMode?: ModeTypes,
  isInheritanceMode?: boolean,
) => {
  const code = dtreeStore.dtreeCode ?? 'return False'

  const { groupIndexToChange } = modalsVisibilityStore
  const { location } = modalsControlStore
  const { activeStepIndex } = stepStore

  // TODO: add type
  const attribute: any[] =
    stepStore.steps[activeStepIndex].groups[groupIndexToChange]

  const filteredAttribute: any[] = []

  const filtersIndex = attribute.findIndex(element => Array.isArray(element))

  attribute.forEach((element, index) => {
    if (index <= 1 || index === filtersIndex) {
      filteredAttribute.push(element)
    } else if (index === 2) {
      const conditionsJoinMode = getConditionJoinMode(currentMode)

      filteredAttribute.push(conditionsJoinMode)
    }
  })

  if (isInheritanceMode) {
    filteredAttribute[filteredAttribute.length - 1] = dtreeStore.selectedFilters
  }

  filteredAttribute.push(params)

  dtreeStore.fetchDtreeSetAsync({
    ds: datasetStore.datasetName,
    code,
    instr: [
      ActionTypes.ATOM,
      AtomModifyingActionName.EDIT,
      location,
      filteredAttribute,
    ],
  })
}
