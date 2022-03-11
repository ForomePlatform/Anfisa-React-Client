/* eslint-disable max-lines */
import cloneDeep from 'lodash/cloneDeep'
import get from 'lodash/get'
import uniq from 'lodash/uniq'
import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DtreeStatType, FilterCountsType, StatListType } from '@declarations'
import { getApiUrl } from '@core/get-api-url'
import { TPropertyStatus } from '@service-providers/common/common.interface'
import { addToActionHistory } from '@utils/addToActionHistory'
import { calculateAcceptedVariants } from '@utils/calculateAcceptedVariants'
import { fetchStatunitsAsync } from '@utils/fetchStatunitsAsync'
import { getDataFromCode } from '@utils/getDataFromCode'
import { getFilteredAttrsList } from '@utils/getFilteredAttrsList'
import { getQueryBuilder } from '@utils/getQueryBuilder'
import { getStepDataAsync } from '@utils/getStepDataAsync'
import datasetStore from './dataset'
import activeStepStore, { ActiveStepOptions } from './dtree/active-step.store'

export type IStepData = {
  step: number
  groups: any[]
  negate?: boolean
  excluded: boolean
  isActive: boolean
  isReturnedVariantsActive: boolean
  startFilterCounts: FilterCountsType
  finishFilterCounts: FilterCountsType
  difference: FilterCountsType
  comment?: string
  condition?: string
  isFinalStep?: boolean
}

interface IRequestData {
  operation: number
  request: {
    setCode: string
    statCode: string
  }
}

class DtreeStore {
  dtreeList: any
  dtree: any
  isCountsReceived = false
  dtreeCode = ''
  startDtreeCode = ''
  localDtreeCode = ''
  currentDtreeName = ''
  previousDtreeName = ''

  statFuncData: any = []
  scenario: any
  request: any
  queryBuilderRenderKey = Date.now()

  dtreeStat: DtreeStatType = {}
  startDtreeStat: DtreeStatType = {}

  statAmount: number[] = []
  statRequestId = ''

  selectedGroups: any = []
  selectedFilters: string[] = []
  dtreeStepIndices: string[] = []

  pointCounts: [number | null][] = []
  acceptedVariants = 0

  savingStatus: any = []
  shouldLoadTableModal = false

  isFilterContentExpanded = false
  filterChangeIndicator = 0

  isFilterModalContentExpanded = false
  filterModalChangeIndicator = 0

  isFiltersLoading = false
  isDtreeLoading = false

  isResultsContentExpanded = false
  resultsChangeIndicator = 0

  filterValue = ''
  filterModalValue = ''
  algorithmFilterValue = ''
  filteredCounts = 0

  stepData: IStepData[] = []
  stepAmout = 0

  isModalAttributeVisible = false
  isModalSelectFilterVisible = false
  isModalEditFiltersVisible = false
  isModalJoinVisible = false
  isModalNumbersVisible = false

  isModalTextEditorVisible = false
  isModalSaveDatasetVisible = false

  isModalEditInheritanceModeVisible = false
  isModalCustomInheritanceModeVisible = false
  isModalCompoundHetVisible = false
  isModalEditCompoundRequestVisible = false
  isModalEditGeneRegionVisible = false

  isModalSelectInheritanceModeVisible = false
  isModalSelectCompoundRequestVisible = false
  isModalSelectGeneRegionVisible = false

  isTableModalVisible = false
  tableModalIndexNumber: null | number = null

  groupNameToChange = ''
  groupIndexToChange = 0

  requestData: IRequestData[] = []

  modalSource = ''

  actionHistory: URLSearchParams[] = []
  actionHistoryIndex = -1

  constructor() {
    makeAutoObservable(this)
  }

  // 1. Functions to load / draw / edit decision trees

  async drawDecesionTreeAsync(isLoadingNewTree: boolean) {
    const initialStepData: IStepData[] = [
      {
        step: 1,
        groups: [],
        excluded: true,
        isActive: false,
        isReturnedVariantsActive: false,
        startFilterCounts: null,
        finishFilterCounts: null,
        difference: null,
      },
    ]

    const computedStepData = await getStepDataAsync(isLoadingNewTree)

    const newStepData =
      computedStepData.length === 0 ? initialStepData : computedStepData

    const stepCodes = getDataFromCode(this.dtreeCode)

    const finalStep = {
      step: newStepData.length,
      groups: [],
      excluded: !stepCodes[stepCodes.length - 1]?.result,
      isActive: false,
      isReturnedVariantsActive: false,
      startFilterCounts: null,
      finishFilterCounts: null,
      difference: null,
      isFinalStep: true,
    }

    newStepData.push(finalStep)

    runInAction(() => {
      this.stepData = [...newStepData]
      this.dtreeStepIndices = Object.keys(this.dtree['cond-atoms'])
    })

    const stepDataActiveIndex = newStepData.findIndex(
      element => element.isActive || element.isReturnedVariantsActive,
    )

    const nextActiveStep =
      stepDataActiveIndex === -1 ? newStepData.length - 1 : stepDataActiveIndex

    activeStepStore.makeStepActive(
      nextActiveStep,
      ActiveStepOptions.StartedVariants,
    )
  }

  async fetchDtreeStatAsync(code = 'return False', no = '0') {
    this.setIsFiltersLoading()
    this.clearStatRequestId()

    const body = new URLSearchParams({
      ds: datasetStore.datasetName,
      no,
      code,
      tm: '0',
    })

    const response = await fetch(getApiUrl('dtree_stat'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })

    const result = await response.json()

    result['stat-list'] = getFilteredAttrsList(result['stat-list'])

    const statList = result['stat-list']

    runInAction(() => {
      this.dtreeStat = result

      if (Object.values(this.startDtreeStat).length === 0) {
        this.startDtreeStat = result
      }

      this.statAmount = get(result, 'filtered-counts', [])
      this.filteredCounts = this.statAmount[1]
      this.statRequestId = result['rq-id']
    })
    this.setQueryBuilderRenderKey(Date.now())

    fetchStatunitsAsync(statList, no)
    this.resetIsFiltersLoading()
  }

  get getQueryBuilder() {
    const statList =
      this.dtreeStat['stat-list'] ?? datasetStore.dsStat['stat-list']

    return getQueryBuilder(toJS(statList))
  }

  getAttributeStatus(name: string): TPropertyStatus | undefined {
    return toJS(
      this.dtreeStat['stat-list']?.find(
        (attr: TPropertyStatus) => attr.name === name,
      ),
    )
  }

  get attributeStatusToChange(): TPropertyStatus | undefined {
    return this.groupNameToChange
      ? this.getAttributeStatus(this.groupNameToChange)
      : undefined
  }

  get currentStepGroups() {
    return toJS(this.stepData[activeStepStore.activeStepIndex].groups)
  }

  get currentStepGroupToChange() {
    if (this.groupIndexToChange < 0) {
      return undefined
    }

    return toJS(
      this.stepData[activeStepStore.activeStepIndex].groups[
        this.groupIndexToChange
      ],
    )
  }

  getStepIndexForApi = (index: number) => {
    const indexes = toJS(this.dtreeStepIndices)
    const shouldGetAnotherIndex = index === indexes.length

    const currentIndex = shouldGetAnotherIndex
      ? +indexes[index - 1] + 1
      : +indexes[index]

    const stepIndex = indexes.length === 0 ? 0 : currentIndex

    const pointsIndexes = Object.keys(this.dtree?.points)
    const lastIndex = +pointsIndexes[pointsIndexes.length - 1]

    const stepIndexForApi = Number.isNaN(stepIndex) ? lastIndex : stepIndex

    return stepIndexForApi
  }

  async fetchDtreeSetAsync(body: URLSearchParams, shouldSaveInHistory = true) {
    if (shouldSaveInHistory) addToActionHistory(body)

    this.setIsCountsReceived(false)

    const response = await fetch(getApiUrl('dtree_set'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })

    const result = await response.json()
    const newCode = result.code

    runInAction(() => {
      if (
        !this.startDtreeCode ||
        this.currentDtreeName !== this.previousDtreeName
      ) {
        this.startDtreeCode = newCode
        this.setPrevDtreeName(this.currentDtreeName)
      }

      this.dtree = result
      this.dtreeCode = newCode
      this.dtreeList = result['dtree-list']
    })

    const isLoadingNewTree = !body.has('code')

    this.drawDecesionTreeAsync(isLoadingNewTree)
  }

  async fetchStatFuncAsync(subGroupName: string, param: string) {
    const body = new URLSearchParams({
      ds: datasetStore.datasetName,
      no: activeStepStore.stepIndexForApi,
      code: this.dtreeCode,
      rq_id: Math.random().toString(),
      unit: subGroupName,
      param,
    })

    const response = await fetch(getApiUrl('statfunc'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })

    const result = await response.json()

    runInAction(() => {
      this.statFuncData = result

      if (result.scenario) this.scenario = result.scenario

      if (result.request) this.request = result.request
    })
  }

  setActionHistory(updatedActionHistory: URLSearchParams[]) {
    runInAction(() => {
      this.actionHistory = [...updatedActionHistory]
    })
  }

  setActionHistoryIndex(updatedIndex: number) {
    runInAction(() => {
      this.actionHistoryIndex = updatedIndex
    })
  }

  // 2. UI functions to display adding / deleting / editing steps

  get getStepData() {
    let stepData = cloneDeep(this.stepData)
    let data: IStepData[] = []

    if (stepData[0] && stepData[0].groups && this.algorithmFilterValue) {
      stepData = stepData.filter((item, currNo: number) =>
        item.groups.find((subItem: any[]) => {
          if (
            subItem[1]
              .toLocaleLowerCase()
              .includes(this.algorithmFilterValue.toLocaleLowerCase())
          ) {
            return (data = [...data, stepData[currNo]])
          }
        }),
      )
    }

    return this.algorithmFilterValue ? data : stepData
  }

  insertStep(type: string, index: number) {
    const localStepData = [...this.stepData]

    localStepData.forEach(element => {
      element.isActive = false

      return element
    })

    if (type === 'BEFORE') {
      const startFilterCounts =
        localStepData[index - 1]?.finishFilterCounts ??
        localStepData[index]?.finishFilterCounts

      localStepData.splice(index, 0, {
        step: index,
        groups: [],
        excluded: true,
        isActive: true,
        isReturnedVariantsActive: false,
        startFilterCounts,
        finishFilterCounts: startFilterCounts,
        difference: 0,
      })
    } else {
      const startFilterCounts = localStepData[index].finishFilterCounts

      localStepData.splice(index + 1, 0, {
        step: index,
        groups: [],
        excluded: true,
        isActive: true,
        isReturnedVariantsActive: false,
        startFilterCounts,
        finishFilterCounts: startFilterCounts,
        difference: 0,
      })
    }

    localStepData.forEach((item, currNo: number) => {
      item.step = currNo + 1
    })

    runInAction(() => {
      this.stepData = [...localStepData]
    })

    this.resetLocalDtreeCode()
  }

  duplicateStep(index: number) {
    const clonedStep = cloneDeep(this.stepData[index])

    this.stepData.splice(index + 1, 0, clonedStep)

    this.stepData.map((item, currNo: number) => {
      item.step = currNo + 1
    })
    this.resetLocalDtreeCode()
  }

  removeStep(index: number) {
    this.stepData.splice(index, 1)

    this.stepData.map((item, currNo: number) => {
      item.step = currNo + 1
    })
    activeStepStore.makeStepActive(
      this.stepData.length - 1,
      ActiveStepOptions.StartedVariants,
    )

    this.resetLocalDtreeCode()
  }

  negateStep(index: number) {
    if (!this.stepData[index].negate) {
      this.stepData[index].negate = true
    } else {
      this.stepData[index].negate = !this.stepData[index].negate
    }

    this.resetLocalDtreeCode()
  }

  addSelectedGroup(group: any) {
    this.selectedGroups = []
    this.selectedGroups = group
    this.resetLocalDtreeCode()
  }

  addSelectedFilter(filter: string) {
    const localSelectedFilters = [...this.selectedFilters, filter]

    this.selectedFilters = uniq(localSelectedFilters)

    this.resetLocalDtreeCode()
  }

  removeSelectedFilter(filter: string) {
    this.selectedFilters = this.selectedFilters.filter(item => item !== filter)
    this.resetLocalDtreeCode()
  }

  resetSelectedFilters() {
    this.selectedFilters = []
  }

  // 3. Modals control block

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
    this.modalSource = source

    this.isModalSelectFilterVisible = true
    this.groupNameToChange = groupName
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
    this.modalSource = source

    this.isModalNumbersVisible = true
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex ?? -1
  }

  closeModalNumbers() {
    this.isModalNumbersVisible = false
  }

  // 3.1.3 Modals for func attr

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

  // 3.2 Modals for editing loaded tree

  // 3.2.1 Modal for enum attr

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
    this.selectedFilters = []
  }

  // 3.2.3 Modals for func attr

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

  openModalCustomInheritanceMode(
    groupName: string,
    groupIndex: number | undefined,
    source: string = '',
  ) {
    this.modalSource = source

    this.isModalCustomInheritanceModeVisible = true

    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex ?? -1
  }

  closeModalCustomInheritanceMode() {
    this.isModalCustomInheritanceModeVisible = false
  }

  openModalCompoundHet(
    groupName: string,
    groupIndex: number | undefined,
    source: string = '',
  ) {
    this.modalSource = source

    this.isModalCompoundHetVisible = true

    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex ?? -1
  }

  closeModalCompoundHet() {
    this.isModalCompoundHetVisible = false
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

  // 3.3 Modal for editing dtree code (new / loaded)

  openModalTextEditor() {
    this.isModalTextEditorVisible = true
  }

  closeModalTextEditor() {
    this.isModalTextEditorVisible = false
  }

  setNextDtreeCode(code: string) {
    this.dtreeCode = code
  }

  setStartDtreeCode() {
    this.startDtreeCode = this.dtreeCode
  }

  setLocalDtreeCode(code: string) {
    this.localDtreeCode = code
  }

  resetLocalDtreeCode() {
    this.localDtreeCode = ''
  }

  // 3.4 Other UI/UX modals

  openModalSaveDataset() {
    this.isModalSaveDatasetVisible = true
  }

  closeModalSaveDataset() {
    this.isModalSaveDatasetVisible = false
  }

  // 4. Other UI control functions

  setJobStatus(jobStatus: any) {
    runInAction(() => {
      this.savingStatus = JSON.parse(JSON.stringify(jobStatus))
    })
  }

  clearJobStatus() {
    runInAction(() => {
      this.savingStatus = []
    })
  }

  setShouldLoadTableModal(shouldLoad: boolean) {
    runInAction(() => {
      this.shouldLoadTableModal = shouldLoad
    })
  }

  setQueryBuilderRenderKey(key: number) {
    runInAction(() => {
      this.queryBuilderRenderKey = key
    })
  }

  setPointCounts(pointCounts: [number | null][] | number[][]) {
    runInAction(() => {
      this.pointCounts = JSON.parse(JSON.stringify(pointCounts))
    })
  }

  updatePointCounts(pointCounts: [number | null][]) {
    const localStepData = [...this.stepData]

    localStepData.forEach((element, index) => {
      const counts = toJS(pointCounts)

      const startCountsIndex = this.getStepIndexForApi(index)
      const indexes = toJS(this.dtreeStepIndices)
      const isFinalStepIndex = index === indexes.length

      const currentCount = isFinalStepIndex
        ? counts[counts.length - 1]?.[0]
        : counts[startCountsIndex]?.[0]

      const startCounts =
        counts[startCountsIndex] === null ? '...' : currentCount

      const diferenceCountsIndex = startCountsIndex + 1

      const diferenceCounts =
        counts[diferenceCountsIndex] === null
          ? '...'
          : counts[diferenceCountsIndex]?.[0]

      const isEmptyTree = counts.length === 1
      const isFinalStep = Boolean(localStepData[index].isFinalStep)
      const shouldSetAllVariants = isEmptyTree && isFinalStep

      element.startFilterCounts = startCounts
      element.difference = shouldSetAllVariants ? counts[0][0] : diferenceCounts
    })

    runInAction(() => {
      this.stepData = [...localStepData]
    })
  }

  setAcceptedVariants() {
    const calculatedAcceptedVariants = calculateAcceptedVariants(this.stepData)

    runInAction(() => {
      this.acceptedVariants = calculatedAcceptedVariants
    })
  }

  expandFilterContent() {
    this.isFilterContentExpanded = true
    this.filterChangeIndicator++
  }

  collapseFilterContent() {
    this.isFilterContentExpanded = false
    this.filterChangeIndicator--
  }

  expandFilterModalContent() {
    this.isFilterModalContentExpanded = true
    this.filterModalChangeIndicator++
  }

  collapseFilterModalContent() {
    this.isFilterModalContentExpanded = false
    this.filterModalChangeIndicator--
  }

  expandResultsContent() {
    this.isResultsContentExpanded = true
    this.resultsChangeIndicator++
  }

  collapseResultsContent() {
    this.isResultsContentExpanded = false
    this.resultsChangeIndicator--
  }

  setFilterValue(item: string) {
    this.filterValue = item
  }

  resetFilterValue() {
    this.filterValue = ''
  }

  setFilterModalValue(item: string) {
    this.filterModalValue = item
  }

  resetFilterModalValue() {
    this.filterModalValue = ''
  }

  setAlgorithmFilterValue(item: string) {
    this.algorithmFilterValue = item
  }

  resetAlgorithmFilterValue() {
    this.algorithmFilterValue = ''
  }

  setIsFiltersLoading() {
    this.isFiltersLoading = true
  }

  resetIsFiltersLoading() {
    this.isFiltersLoading = false
  }

  toggleIsExcluded(index: number) {
    this.stepData[index].excluded = !this.stepData[index].excluded
    this.resetLocalDtreeCode()
  }

  changeStepDataAcitveStep = (index: number, option: ActiveStepOptions) => {
    this.stepData.forEach(element => {
      element.isActive = false
      element.isReturnedVariantsActive = false
    })

    if (option === ActiveStepOptions.StartedVariants) {
      this.stepData[index].isActive = true
    } else {
      this.stepData[index].isReturnedVariantsActive = true
    }
  }

  openTableModal(index?: number) {
    this.isTableModalVisible = true

    if (index) this.tableModalIndexNumber = index
  }

  closeTableModal() {
    this.isTableModalVisible = false
    this.tableModalIndexNumber = null
  }

  resetStatFuncData() {
    this.statFuncData = []
  }

  resetData() {
    this.dtreeStat = {}
    this.statAmount = []
    this.filteredCounts = 0
    this.statRequestId = ''
  }

  setDtreeName(name: string) {
    if (this.currentDtreeName) {
      this.setPrevDtreeName(this.currentDtreeName)
    }

    this.currentDtreeName = name
  }

  resetDtreeName() {
    this.currentDtreeName = ''
  }

  setPrevDtreeName(name: string) {
    this.previousDtreeName = name
  }

  resetPrevDtreeName() {
    this.previousDtreeName = ''
  }

  setStatList(statList: StatListType) {
    this.dtreeStat['stat-list'] = statList
  }

  setStatRequestId(id: string) {
    this.statRequestId = id
  }

  clearStatRequestId() {
    runInAction(() => {
      this.statRequestId = ''
    })
  }

  setIsCountsReceived(isReceived: boolean) {
    runInAction(() => {
      this.isCountsReceived = isReceived
    })
  }
}

export default new DtreeStore()
