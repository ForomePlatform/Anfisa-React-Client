import { makeAutoObservable } from 'mobx'

import dtreeStore from '@store/dtree'
import activeStepStore from '@store/dtree/active-step.store'
import { getQueryBuilder } from '@utils/getQueryBuilder'

export const selectOptions = ['--', '0', '0-1', '1', '1-2', '2']

class ModalEditStore {
  constructor() {
    makeAutoObservable(this)
  }

  public get location(): [number, number] {
    const locationIndex = dtreeStore.groupIndexToChange
    const { stepIndexForApi } = activeStepStore

    const location: [number, number] = [+stepIndexForApi, locationIndex]
    return location
  }

  public get variants(): string[] {
    return dtreeStore.statFuncData.variants
  }

  public get currentStepIndex(): number {
    return activeStepStore.activeStepIndex
  }

  public get currentGroupIndex(): number {
    return dtreeStore.groupIndexToChange
  }

  public get currentGroup(): any[] {
    return dtreeStore.stepData[this.currentStepIndex].groups[
      this.currentGroupIndex
    ]
  }

  public get groupName(): string {
    return dtreeStore.groupNameToChange
  }

  public get selectedGroupsAmount(): string[] {
    return this.currentGroup && this.currentGroup.length > 0
      ? dtreeStore.selectedFilters
      : []
  }

  public get currentGroupLength(): number {
    return dtreeStore.stepData[this.currentStepIndex].groups[
      this.currentGroupIndex
    ].length
  }

  public get problemGroups(): string[] {
    let problemGroups: string[] = []

    const subGroups = Object.values(
      getQueryBuilder(dtreeStore.startDtreeStat['stat-list']),
    )

    subGroups.forEach(subGroup => {
      subGroup.find((item, currNo) => {
        if (item.name === this.groupName) {
          problemGroups = subGroup[currNo].family
        }
      })
    })

    return problemGroups
  }
}

export default new ModalEditStore()
