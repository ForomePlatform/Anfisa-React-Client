import { makeAutoObservable } from 'mobx'

import { t } from '@i18n'
import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import { showToast } from '@utils/notifications/showToast'

class DtreeModalStore {
  groupNameToChange = ''
  groupIndexToChange = 0
  dtreeOperation = ''
  modalSource = ''

  isModalAttributeVisible = false
  isModalJoinVisible = false
  isModalNumbersVisible = false

  isModalEditFiltersVisible = false
  isModalEditInheritanceModeVisible = false
  isModalEditCustomInheritanceModeVisible = false
  isModalEditCompoundHetVisible = false
  isModalEditCompoundRequestVisible = false
  isModalEditGeneRegionVisible = false

  isModalSelectFilterVisible = false
  isModalSelectInheritanceModeVisible = false
  isModalSelectCustomInheritanceModeVisible = false
  isModalSelectCompoundHetVisible = false
  isModalSelectCompoundRequestVisible = false
  isModalSelectGeneRegionVisible = false

  isModalTextEditorVisible = false
  isModalConfirmationVisible = false

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

  // 1. Modals for creation brand new tree

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

  // 2. Modal for numeric attr

  openModalNumbers(
    groupName: string,
    groupIndex: number | undefined,
    source: string = '',
  ) {
    this.modalSource = source

    this.isModalNumbersVisible = true
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex ?? -1
  }

  closeModalNumbers() {
    this.isModalNumbersVisible = false
  }

  // 3. Modal for enum attr

  openModalSelectFilter(groupName: string, source: string) {
    this.modalSource = source

    this.isModalSelectFilterVisible = true
    this.groupNameToChange = groupName
  }

  closeModalSelectFilter() {
    this.isModalSelectFilterVisible = false
  }

  openModalEditFilters(
    groupName: string,
    stepIndex: number,
    groupIndex: number,
  ) {
    this.isModalEditFiltersVisible = true
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex
  }

  closeModalEditFilters() {
    this.isModalEditFiltersVisible = false
    dtreeStore.resetSelectedFilters()
  }

  // 4. Modals for func attr

  openModalEditInheritanceMode(
    groupName: string,
    stepIndex: number,
    groupIndex: number,
  ) {
    this.isModalEditInheritanceModeVisible = true

    this.groupNameToChange = groupName

    this.groupIndexToChange = groupIndex
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
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex
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
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex
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
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex
  }

  openModalEditCustomInheritanceModeFunc(
    groupName: string,
    stepIndex: number,
    groupIndex: number,
  ) {
    this.isModalEditCompoundRequestVisible = true
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex
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
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex
  }

  closeModalEditGeneRegion() {
    this.isModalEditGeneRegionVisible = false
  }

  openModalSelectInheritanceMode(
    groupName: string,
    stepIndex: number,
    source: string,
  ) {
    this.modalSource = source

    this.isModalSelectInheritanceModeVisible = true

    this.groupNameToChange = groupName
  }

  closeModalSelectInheritanceMode() {
    this.isModalSelectInheritanceModeVisible = false
  }

  openModalSelectCustomInheritanceMode(
    groupName: string,
    stepIndex: number,
    source: string,
  ) {
    this.modalSource = source

    this.isModalSelectCustomInheritanceModeVisible = true

    this.groupNameToChange = groupName
  }

  closeModalSelectCustomInheritanceMode() {
    this.isModalSelectCustomInheritanceModeVisible = false
  }

  openModalSelectCompoundHet(
    groupName: string,
    stepIndex: number,
    source: string,
  ) {
    this.modalSource = source

    this.isModalSelectCompoundHetVisible = true

    this.groupNameToChange = groupName
  }

  closeModalSelectCompoundHet() {
    this.isModalSelectCompoundHetVisible = false
  }

  openModalSelectCompoundRequest(
    groupName: string,
    stepIndex: number,
    source: string,
  ) {
    this.modalSource = source

    this.isModalSelectCompoundRequestVisible = true

    this.groupNameToChange = groupName
  }

  closeModalSelectCompoundRequest() {
    this.isModalSelectCompoundRequestVisible = false
  }

  openModalSelectGeneRegion(
    groupName: string,
    stepIndex: number,
    source: string,
  ) {
    this.modalSource = source

    this.isModalSelectGeneRegionVisible = true
    this.groupNameToChange = groupName
  }

  closeModalSelectGeneRegion() {
    this.isModalSelectGeneRegionVisible = false
  }

  // 5. Modal for editing dtree code (new / loaded)

  openModalTextEditor() {
    this.isModalTextEditorVisible = true
  }

  closeModalTextEditor() {
    this.isModalTextEditorVisible = false
  }
}

export default new DtreeModalStore()
