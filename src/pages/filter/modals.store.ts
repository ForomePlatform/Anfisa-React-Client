import { makeAutoObservable } from 'mobx'

import { t } from '@i18n'
import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import { showToast } from '@utils/notifications/showToast'

class DtreeModalStore {
  dtreeOperation = ''
  isModalConfirmationVisible = false
  isModalAttributeVisible = false
  isModalSelectFilterVisible = false
  isModalEditFiltersVisible = false
  isModalJoinVisible = false
  isModalNumbersVisible = false

  isModalTextEditorVisible = false

  isModalEditInheritanceModeVisible = false
  isModalEditCustomInheritanceModeVisible = false
  isModalEditCompoundHetVisible = false
  isModalEditCompoundRequestVisible = false
  isModalEditGeneRegionVisible = false

  constructor() {
    makeAutoObservable(this)
  }

  public deleteTree(): void {
    const instruction: string[] = [
      'DTREE',
      'DELETE',
      dtreeStore.currentDtreeName,
    ]

    const notification: string = `${t('dtree.dtree')} "${
      dtreeStore.currentDtreeName
    }" ${t('dtree.hasBeenDeleted')}`

    const body = new URLSearchParams({
      ds: datasetStore.datasetName,
      code: dtreeStore.dtreeCode,
      instr: JSON.stringify(instruction),
    })

    dtreeStore.fetchDtreeSetAsync(body)

    showToast(notification, 'success')

    filterStore.setActionName()

    dtreeStore.resetCurrentDtreeName()
  }

  public openModalConfirmation(dtreeOperation: string): void {
    this.isModalConfirmationVisible = true
    this.dtreeOperation = dtreeOperation
  }

  public closeModalConfirmation(): void {
    this.isModalConfirmationVisible = false
  }

  // 3.1 Modals for creation brand new tree

  openModalAttribute() {
    this.isModalAttributeVisible = true
  }

  closeModalAttribute() {
    this.isModalAttributeVisible = false
  }

  openModalJoin() {
    this.isModalJoinVisible = true
  }

  closeModalJoin() {
    this.isModalJoinVisible = false
  }

  // 3.1.1 Modal for enum attr

  openModalSelectFilter(groupName: string, source: string) {
    dtreeStore.modalSource = source

    this.isModalSelectFilterVisible = true
    dtreeStore.groupNameToChange = groupName
  }

  closeModalSelectFilter() {
    this.isModalSelectFilterVisible = false
  }

  // 3.1.2 Modal for numeric attr

  openModalNumbers(
    groupName: string,
    groupIndex: number | undefined,
    source: string = '',
  ) {
    dtreeStore.modalSource = source

    this.isModalNumbersVisible = true
    dtreeStore.groupNameToChange = groupName
    dtreeStore.groupIndexToChange = groupIndex ?? -1
  }

  closeModalNumbers() {
    this.isModalNumbersVisible = false
  }

  // 3.2.1 Modal for enum attr

  openModalEditFilters(
    groupName: string,
    stepIndex: number,
    groupIndex: number,
  ) {
    this.isModalEditFiltersVisible = true
    dtreeStore.groupNameToChange = groupName
    dtreeStore.groupIndexToChange = groupIndex
  }

  closeModalEditFilters() {
    this.isModalEditFiltersVisible = false
    dtreeStore.resetSelectedFilters()
  }

  // 3.2.3 Modals for func attr

  openModalEditInheritanceMode(
    groupName: string,
    stepIndex: number,
    groupIndex: number,
  ) {
    this.isModalEditInheritanceModeVisible = true

    dtreeStore.groupNameToChange = groupName

    dtreeStore.groupIndexToChange = groupIndex
  }

  closeModalEditInheritanceMode() {
    this.isModalEditInheritanceModeVisible = false
  }

  openModalEditCustomInheritanceMode(
    groupName: string,
    stepIndex: number,
    groupIndex: number,
  ) {
    this.isModalEditCustomInheritanceModeVisible = true
    dtreeStore.groupNameToChange = groupName
    dtreeStore.groupIndexToChange = groupIndex
  }

  closeModalEditCustomInheritanceMode() {
    this.isModalEditCustomInheritanceModeVisible = false
  }

  openModalEditCompoundHet(
    groupName: string,
    stepIndex: number,
    groupIndex: number,
  ) {
    this.isModalEditCompoundHetVisible = true
    dtreeStore.groupNameToChange = groupName
    dtreeStore.groupIndexToChange = groupIndex
  }

  closeModalEditCompoundHet() {
    this.isModalEditCompoundHetVisible = false
  }

  openModalEditCompoundRequest(
    groupName: string,
    stepIndex: number,
    groupIndex: number,
  ) {
    this.isModalEditCompoundRequestVisible = true
    dtreeStore.groupNameToChange = groupName
    dtreeStore.groupIndexToChange = groupIndex
  }

  openModalEditCustomInheritanceModeFunc(
    groupName: string,
    stepIndex: number,
    groupIndex: number,
  ) {
    this.isModalEditCompoundRequestVisible = true
    dtreeStore.groupNameToChange = groupName
    dtreeStore.groupIndexToChange = groupIndex
  }

  closeModalEditCompoundRequest() {
    this.isModalEditCompoundRequestVisible = false
  }

  openModalEditGeneRegion(
    groupName: string,
    stepIndex: number,
    groupIndex: number,
  ) {
    this.isModalEditGeneRegionVisible = true
    dtreeStore.groupNameToChange = groupName
    dtreeStore.groupIndexToChange = groupIndex
  }

  closeModalEditGeneRegion() {
    this.isModalEditGeneRegionVisible = false
  }

  // 3.3 Modal for editing dtree code (new / loaded)

  openModalTextEditor() {
    this.isModalTextEditorVisible = true
  }

  closeModalTextEditor() {
    this.isModalTextEditorVisible = false
  }
}

export default new DtreeModalStore()
