import datasetStore from '@store/dataset/dataset'
import dtreeStore from '@store/dtree'
import stepStore from '@store/dtree/step.store'
import modalsControlStore from '@pages/filter/dtree/components/modals/modals-control-store'
import { ISavePanelAttributeProps } from '@pages/filter/refiner/components/middle-column/panels/utils/save-pannel-attribute'
import {
  ActionTypes,
  AtomModifyingActionName,
} from '@service-providers/decision-trees'
import modalsVisibilityStore from '../../pages/filter/dtree/components/modals/modals-visibility-store'

export const changeNumericAttribute = (props: ISavePanelAttributeProps) => {
  const code = dtreeStore.dtreeCode ?? 'return False'

  const { groupIndexToChange } = modalsVisibilityStore
  const { location } = modalsControlStore
  const { activeStepIndex } = stepStore

  // TODO: add type
  const attribute: any[] =
    stepStore.steps[activeStepIndex].groups[groupIndexToChange]

  const filteredAttribute: any[] = []

  attribute.forEach((element, index) => {
    if (index <= 1) filteredAttribute.push(element)
  })

  filteredAttribute.push(props.value)

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
