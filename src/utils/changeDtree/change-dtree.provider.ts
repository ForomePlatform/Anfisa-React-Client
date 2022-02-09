import dtreeStore from '@store/dtree'
import changeDtreeAdapters from './change-dtree.adapters'

export class ChangeDtreeProvider {
  getLocationForChangeAttribute(index?: number): [number, number] {
    const locationIndex = dtreeStore.groupIndexToChange
    const calculatedIndex = changeDtreeAdapters.getIndexWithoutEmptySteps(index)

    const indexForApi = dtreeStore.getStepIndexForApi(calculatedIndex)
    const location: [number, number] = [indexForApi, locationIndex]
    return location
  }
}

export default new ChangeDtreeProvider()
