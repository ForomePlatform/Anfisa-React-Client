import { makeAutoObservable, toJS } from 'mobx'

import dtreeStore from '@store/dtree'
import stepStore from '@store/dtree/step.store'
import { TPropertyStatus } from '@service-providers/common'
import modalsVisibilityStore from './modals-visibility-store'

export const selectOptions = ['--', '0', '0-1', '1', '1-2', '2']

export interface IParams {
  approx: any
  state?: string[] | null
  default?: string
  request?: any[]
}

class ModalsControlStore {
  constructor() {
    makeAutoObservable(this)
  }

  public get location(): [number, number] {
    const locationIndex = modalsVisibilityStore.groupIndexToChange
    const { stepIndexForApi } = stepStore

    return [+stepIndexForApi, locationIndex]
  }

  public get groupName(): string {
    return modalsVisibilityStore.groupNameToChange
  }

  get currentGroupToChange() {
    if (modalsVisibilityStore.groupIndexToChange < 0) {
      return undefined
    }

    const group = toJS(
      stepStore.steps[stepStore.activeStepIndex]?.groups[
        modalsVisibilityStore.groupIndexToChange
      ],
    )

    const mayBeJoin = group?.[group.length - 2]

    if (mayBeJoin === 'or' || mayBeJoin === 'and') {
      group.splice(group.length - 2, 1)
    }

    return group
  }

  public get currentStepGroups(): string[] {
    return toJS(stepStore.steps[stepStore.activeStepIndex]?.groups)
  }

  get attributeStatusToChange(): TPropertyStatus | undefined {
    return this.groupName
      ? toJS(dtreeStore.stat.getAttributeStatusByName(this.groupName))
      : undefined
  }
}

export default new ModalsControlStore()
