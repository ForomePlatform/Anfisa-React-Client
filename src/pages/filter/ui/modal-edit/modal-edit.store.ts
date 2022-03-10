import { makeAutoObservable } from 'mobx'

import dtreeStore from '@store/dtree'
import activeStepStore from '@store/dtree/active-step.store'
import { getQueryBuilder } from '@utils/getQueryBuilder'

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
    let attrData: any

    const subGroups = Object.values(
      getQueryBuilder(dtreeStore.startDtreeStat['stat-list']),
    )

    subGroups.map(subGroup => {
      subGroup.map((item, currNo) => {
        if (item.name === this.groupName) {
          attrData = subGroup[currNo]
        }
      })
    })

    return attrData.family
  }
}

export default new ModalEditStore()
