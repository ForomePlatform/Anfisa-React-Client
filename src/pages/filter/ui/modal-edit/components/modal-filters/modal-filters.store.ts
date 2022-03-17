import { makeAutoObservable, toJS } from 'mobx'

import { ActionType } from '@declarations'
import dtreeStore from '@store/dtree'
import activeStepStore from '@store/dtree/active-step.store'
import modalEditStore from '@pages/filter/ui/modal-edit/modal-edit.store'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { changeEnumAttribute } from '@utils/changeAttribute/changeEnumAttribute'

class ModalFiltersStore {
  searchValue = ''
  currentPage = 0
  isAllFiltersChecked = false

  originGroupList: any[] = toJS(dtreeStore.selectedGroups[2]) ?? []

  groupsPerPage = 100

  constructor() {
    makeAutoObservable(this)
  }

  setSearchValue(value: string): void {
    this.searchValue = value
  }

  setCurrentPage(value: number): void {
    this.currentPage = value
  }

  setIsAllFiltersChecked(value: boolean): void {
    this.isAllFiltersChecked = value
  }

  public selectCheckGroupItem(checked: boolean, name: string): void {
    if (checked) {
      dtreeStore.addSelectedFilter(name)
    } else {
      dtreeStore.removeSelectedFilter(name)
    }
  }

  public selectAllGroupItems(checked: boolean, chunks: any[]): void {
    if (checked && this.isAllFiltersChecked) return
    chunks[this.currentPage]?.forEach(([variantName]: [string, number]) => {
      if (checked) {
        dtreeStore.addSelectedFilter(variantName)
      } else {
        dtreeStore.removeSelectedFilter(variantName)
      }

      this.setIsAllFiltersChecked(checked)
    })
  }

  public saveChanges(): void {
    changeEnumAttribute()
    dtreeStore.closeModalFilters()
    this.resetData()
  }

  public addAttribute(action: ActionType): void {
    addAttributeToStep(action, 'enum')

    dtreeStore.resetSelectedFilters()
    dtreeStore.closeModalFilters()
    this.resetData()
  }

  public checkIfSelectedFiltersExist() {
    dtreeStore.stepData[activeStepStore.activeStepIndex].groups[
      modalEditStore.currentGroupIndex
    ][modalEditStore.currentGroupLength - 1].map((item: string) =>
      dtreeStore.addSelectedFilter(item),
    )
  }

  public closeModal(): void {
    dtreeStore.closeModalFilters()

    dtreeStore.resetSelectedFilters()
    this.resetData()
  }

  public openModalAttribute(): void {
    dtreeStore.closeModalFilters()
    dtreeStore.openModalAttribute()
    dtreeStore.resetSelectedFilters()
  }

  private resetData(): void {
    this.searchValue = ''
    this.currentPage = 0
    this.isAllFiltersChecked = false

    this.originGroupList = toJS(dtreeStore.selectedGroups[2]) ?? []
  }
}

export default new ModalFiltersStore()
