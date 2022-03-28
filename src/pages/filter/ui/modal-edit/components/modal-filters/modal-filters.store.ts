import { makeAutoObservable, toJS } from 'mobx'

import { ActionType, StatList } from '@declarations'
import { ModeTypes } from '@core/enum/mode-types-enum'
import { SubKinds } from '@core/enum/sub-kinds-enum'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import activeStepStore from '@pages/filter/active-step.store'
import modalEditStore from '@pages/filter/ui/modal-edit/modal-edit.store'
import { TEnumCondition } from '@service-providers/common'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { changeEnumAttribute } from '@utils/changeAttribute/changeEnumAttribute'
import { getCurrentModeType } from '@utils/getCurrentModeType'
import dtreeModalStore from '../../../../modals.store'

class ModalFiltersStore {
  searchValue = ''
  currentPage = 0
  isAllFiltersChecked = false

  groupsPerPage = 100

  currentMode?: ModeTypes
  currentGroupSubKind?: SubKinds

  constructor() {
    makeAutoObservable(this)
  }

  public setCurrentMode(modeType: ModeTypes) {
    this.currentMode = modeType
  }

  public resetCurrentMode() {
    this.currentMode = undefined
  }

  public setCurrentGroupSubKind(subKind: SubKinds) {
    this.currentGroupSubKind = subKind
  }

  public resetCurrentGroupSubKind() {
    this.currentGroupSubKind = undefined
  }

  public setSearchValue(value: string) {
    this.searchValue = value
  }

  public setCurrentPage(value: number) {
    this.currentPage = value
  }

  public setIsAllFiltersChecked(value: boolean) {
    this.isAllFiltersChecked = value
  }

  public selectCheckGroupItem(checked: boolean, name: string): void {
    if (checked) {
      dtreeStore.addSelectedFilter(name)
    } else {
      dtreeStore.removeSelectedFilter(name)
    }
  }

  public selectAllGroupItems(checked: boolean): void {
    if (checked && this.isAllFiltersChecked) return

    const groupNameList = this.filteredGroupList.map(([groupName]) => groupName)

    if (checked) {
      dtreeStore.addSelectedFilterList(groupNameList)
    } else {
      dtreeStore.resetSelectedFilters()
    }

    this.setIsAllFiltersChecked(checked)
  }

  public saveChanges(): void {
    changeEnumAttribute(this.currentMode)
    dtreeModalStore.closeModalFilters()
    this.resetData()
  }

  public addAttribute(action: ActionType): void {
    addAttributeToStep(action, 'enum', null, null, this.currentMode)

    dtreeStore.resetSelectedFilters()
    dtreeModalStore.closeModalFilters()
    this.resetData()
  }

  public checkIfSelectedFiltersExist(currentGroup: TEnumCondition) {
    dtreeStore.stepData[activeStepStore.activeStepIndex].groups[
      dtreeModalStore.groupIndexToChange
    ][modalEditStore.currentGroupLength - 1].forEach((item: string) =>
      dtreeStore.addSelectedFilter(item),
    )

    if (currentGroup) {
      const conditionJoinType = currentGroup[2]

      this.currentMode = getCurrentModeType(conditionJoinType)
    }
  }

  public closeModal(): void {
    dtreeModalStore.closeModalFilters()

    dtreeStore.resetSelectedFilters()
    this.resetData()
  }

  public openModalAttribute(): void {
    dtreeModalStore.closeModalFilters()
    dtreeModalStore.openModalAttribute()
    dtreeStore.resetSelectedFilters()
  }

  private resetData(): void {
    this.searchValue = ''
    this.currentPage = 0
    this.isAllFiltersChecked = false

    this.resetCurrentMode()
    this.currentGroupSubKind = undefined
  }

  get originGroupList(): [string, number][] {
    const currentStepIndex = activeStepStore.activeStepIndex
    const currentGroupIndex = dtreeModalStore.groupIndexToChange

    const currentGroup =
      dtreeStore.stepData[currentStepIndex].groups[currentGroupIndex]

    if (currentGroup) {
      const subGroups = Object.values(dtreeStore.getQueryBuilder)
      const { groupName } = modalEditStore

      const selectedGroup: StatList | undefined = subGroups
        .find(subGroup => subGroup.find(element => element.name === groupName))
        ?.find(element => element.name === groupName)

      this.currentGroupSubKind = selectedGroup?.['sub-kind'] as SubKinds

      return selectedGroup?.variants ?? []
    } else {
      return toJS(dtreeStore.selectedGroups[2]) ?? []
    }
  }

  get filteredGroupList(): [string, number][] {
    return this.originGroupList.filter((variant: [string, number]) =>
      variant[0]
        .toLocaleLowerCase()
        .includes(this.searchValue.toLocaleLowerCase()),
    )
  }

  get groupsPage(): [string, number][] {
    return this.filteredGroupList.slice(
      this.currentPage * this.groupsPerPage,
      (this.currentPage + 1) * this.groupsPerPage,
    )
  }

  get pagesNumbers(): number {
    return Math.ceil(this.filteredGroupList.length / this.groupsPerPage)
  }

  public get groupSubKind(): string {
    return filterStore.selectedGroupItem['sub-kind']
  }
}

export default new ModalFiltersStore()
