import { makeAutoObservable } from 'mobx'

import activeStepStore from '@pages/filter/active-step.store'
import { ConditionJoinMode } from '@service-providers/common/common.interface'
import dtreeModalStore from '../../modals.store'

class ModalEditStore {
  constructor() {
    makeAutoObservable(this)
  }

  public get location(): [number, number] {
    const locationIndex = dtreeModalStore.groupIndexToChange
    const { stepIndexForApi } = activeStepStore

    const location: [number, number] = [+stepIndexForApi, locationIndex]
    return location
  }

  public getModeType(
    isAllMode: boolean,
    isNotMode: boolean,
  ): ConditionJoinMode {
    return isAllMode
      ? ConditionJoinMode.AND
      : isNotMode
      ? ConditionJoinMode.NOT
      : ConditionJoinMode.OR
  }
}

export default new ModalEditStore()
