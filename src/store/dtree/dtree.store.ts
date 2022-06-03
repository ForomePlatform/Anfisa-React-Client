/* eslint-disable max-lines */
import cloneDeep from 'lodash/cloneDeep'
import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { ActionFilterEnum } from '@core/enum/action-filter.enum'
import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { t } from '@i18n'
import { ActionsHistoryStore } from '@store/actions-history'
import filterDtreesStore from '@store/filter-dtrees'
import { CreateEmptyStepPositions } from '@pages/filter/dtree/components/active-step.store'
import { TFilteringStatCounts, TItemsCount } from '@service-providers/common'
import { IDsListArguments } from '@service-providers/dataset-level'
import {
  DtreeSetPointKinds,
  IDtreeSetArguments,
  IDtreeSetPoint,
  PointCount,
} from '@service-providers/decision-trees'
import decisionTreesProvider from '@service-providers/decision-trees/decision-trees.provider'
import { IStatfuncArguments } from '@service-providers/filtering-regime'
import filteringRegimeProvider from '@service-providers/filtering-regime/filtering-regime.provider'
import { getDataFromCode } from '@utils/getDataFromCode'
import { getStepDataAsync } from '@utils/getStepDataAsync'
import { showToast } from '@utils/notifications'
import activeStepStore, {
  ActiveStepOptions,
} from '../../pages/filter/dtree/components/active-step.store'
import datasetStore from '../dataset/dataset'
import { DtreeModifiedState } from '../filter-dtrees/filter-dtrees.store'
import { DtreeStatStore } from './dtree-stat.store'

export type IStepData = {
  step: number
  groups: any[]
  negate?: boolean
  all?: boolean
  excluded: boolean
  isActive: boolean
  isReturnedVariantsActive: boolean
  conditionPointIndex: number | null
  returnPointIndex: number | null
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

interface IDtreeFilteredCounts {
  accepted: number
  rejected: number
}

export class DtreeStore {
  dtreeList: any
  dtree: any
  isCountsReceived = false
  dtreeCode = ''
  startDtreeCode = ''
  localDtreeCode = ''
  previousDtreeName = ''
  private _dtreeModifiedState: DtreeModifiedState = DtreeModifiedState.NotDtree
  actionName: ActionFilterEnum | undefined = undefined

  statFuncData: any = []
  scenario: any
  request: any
  queryBuilderRenderKey = Date.now()

  readonly stat = new DtreeStatStore()
  statRequestId = ''

  selectedGroups: any = []
  selectedFilters: string[] = []
  dtreeStepIndices: string[] = []

  pointCounts: PointCount[] = []

  evalStatus = ''
  savingStatus: any = []
  shouldLoadTableModal = false

  isFilterContentExpanded = false
  filterChangeIndicator = 0

  isFilterModalContentExpanded = false
  filterModalChangeIndicator = 0

  isDtreeLoading = false

  isResultsContentExpanded = false
  resultsChangeIndicator = 0

  filterValue = ''
  filterModalValue = ''
  algorithmFilterValue = ''
  algorithmFilterFullWord = false
  filteredCounts = 0

  stepData: IStepData[] = []
  stepAmout = 0

  isModalSaveDatasetVisible = false
  isModalViewVariantsVisible = false
  tableModalIndexNumber: null | number = null

  requestData: IRequestData[] = []

  actionHistory = new ActionsHistoryStore<IDtreeSetArguments>(data =>
    this.fetchDtreeSetAsync(data, false),
  )

  constructor() {
    makeAutoObservable(this)

    reaction(
      () => filterDtreesStore.activeDtree,
      dtreeName => {
        if (dtreeName) {
          this.loadDtree(dtreeName)
        } else {
          this.resetPreset()
        }
      },
    )
  }

  get statAmount(): TFilteringStatCounts | undefined {
    return this.stat.filteredCounts
  }

  get isXl(): boolean {
    return !this.dtree || this.dtree.kind === 'xl'
  }

  get acceptedVariants(): number {
    const counts = this.pointCounts

    return this.stepData.reduce((acc, { excluded, returnPointIndex }) => {
      if (!excluded && returnPointIndex !== null) {
        return acc + (counts[returnPointIndex]?.[0] ?? 0)
      }

      return acc
    }, 0)
  }

  /**
   * totalFilteredCounts returns accepted and rejected variants for XL dataset,
   * and transcribed variants for WS
   */
  get totalFilteredCounts(): IDtreeFilteredCounts | undefined {
    if (!this.dtree || !this.isCountsReceived) {
      return undefined
    }
    const isXl = this.isXl
    const points: IDtreeSetPoint[] = this.dtree.points
    const totalCounts: TItemsCount = this.dtree['total-counts']
    const counts = this.pointCounts

    let accepted = 0

    for (let i = 0; i < points.length; ++i) {
      const { kind, decision } = points[i]

      if (kind === DtreeSetPointKinds.RETURN && decision === true) {
        const count = counts[i]

        if (!count) {
          return undefined
        }
        accepted += count[isXl ? 0 : 1] ?? 0
      }
    }

    const rejected = (totalCounts[isXl ? 0 : 1] as number) - accepted

    return {
      accepted,
      rejected,
    }
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
        conditionPointIndex: 0,
        returnPointIndex: null,
      },
    ]

    const computedStepData = await getStepDataAsync(isLoadingNewTree)

    const newStepData =
      computedStepData.length === 0 ? initialStepData : computedStepData

    const stepCodes = getDataFromCode(this.dtreeCode)

    const points: unknown[] | undefined = this.dtree?.points

    const finalStep: IStepData = {
      step: newStepData.length,
      groups: [],
      excluded: !stepCodes[stepCodes.length - 1]?.result,
      isActive: false,
      isReturnedVariantsActive: false,
      conditionPointIndex: null,
      returnPointIndex: points ? points.length - 1 : null,
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

  async fetchDtreeSetAsync(
    body: IDtreeSetArguments,
    shouldSaveInHistory = true,
  ) {
    this.setIsCountsReceived(false)

    if (shouldSaveInHistory) {
      this.actionHistory.addHistory(body)
    }

    // TODO[control]: need to be fixed when async store for dree_set is ready
    if (!body.dtree) {
      this.setDtreeModifiedState()
    }

    const result = await decisionTreesProvider.getDtreeSet(body)

    const newCode = result.code

    runInAction(() => {
      if (
        !this.startDtreeCode ||
        filterDtreesStore.activeDtree !== this.previousDtreeName
      ) {
        this.startDtreeCode = newCode
        this.setPrevDtreeName(filterDtreesStore.activeDtree)
      }

      this.dtree = result

      this.dtreeCode = newCode
      this.dtreeList = result['dtree-list']
      this.evalStatus = result['eval-status']
    })

    const isLoadingNewTree = !body.code

    this.drawDecesionTreeAsync(isLoadingNewTree)
  }

  async fetchStatFuncAsync(subGroupName: string, param: string) {
    const body: IStatfuncArguments = {
      ds: datasetStore.datasetName,
      no: activeStepStore.stepIndexForApi,
      code: this.dtreeCode,
      rq_id: Math.random().toString(),
      unit: subGroupName,
      param,
    }

    const result = await filteringRegimeProvider.getStatFunc(body)

    runInAction(() => {
      this.statFuncData = result

      if (result.scenario) this.scenario = result.scenario

      if (result.request) this.request = result.request
    })

    return result
  }

  private loadDtree(dtreeName: string): void {
    this.isDtreeLoading = true

    this.fetchDtreeSetAsync({
      ds: datasetStore.datasetName,
      dtree: dtreeName,
    })
      .then(() => {
        this.setDtreeModifiedState(DtreeModifiedState.NotModified)
      })
      .catch(() => {
        showToast(t('dtree.errors.loadDtree', { dtreeName }), 'error')
      })
      .finally(() => {
        runInAction(() => {
          this.isDtreeLoading = false
        })
      })
  }

  private setDtreeModifiedState(state?: DtreeModifiedState): void {
    if (state === undefined) {
      if (this._dtreeModifiedState === DtreeModifiedState.NotModified) {
        this._dtreeModifiedState = DtreeModifiedState.Modified
        filterDtreesStore.resetActiveDtree()
      }
    } else if (state !== this._dtreeModifiedState) {
      this._dtreeModifiedState = state
    }
  }

  private resetPreset(): void {
    if (this._dtreeModifiedState !== DtreeModifiedState.Modified) {
      // TODO[control]: will be implemented with the new async store for dtree_set
    }

    this.setDtreeModifiedState(DtreeModifiedState.NotDtree)
  }

  // 2. UI functions to display adding / deleting / editing steps

  get filteredStepData(): IStepData[] {
    const searchValue = this.algorithmFilterValue.toLowerCase()

    if (!searchValue) return this.stepData

    const checkValue = (value: string) =>
      this.algorithmFilterFullWord
        ? value.startsWith(searchValue)
        : value.includes(searchValue)

    return this.stepData.filter(({ groups }) => {
      return groups.some(condition => {
        const isInvalidCondition =
          condition[0] === FilterKindEnum.Error ||
          typeof condition[1] !== 'string' ||
          !condition[0]

        if (isInvalidCondition) {
          return
        }

        const name = condition[1].toLowerCase()
        if (checkValue(name)) return true

        const valueVariants = condition[3]
        if (!valueVariants) return false

        const valueVariantList = Object.values(valueVariants)

        return valueVariantList.some(varaintName => {
          if (typeof varaintName !== 'string') return false

          return checkValue(varaintName?.toLowerCase())
        })
      })
    })
  }

  get isTreeEmpty(): boolean {
    const isFirstStepEmpty = this.stepData[0]?.groups.length === 0
    return this.stepData.length === 2 && isFirstStepEmpty
  }

  insertStep(position: CreateEmptyStepPositions, index: number) {
    const localStepData = [...this.stepData]

    localStepData.forEach(element => {
      element.isActive = false

      return element
    })

    const startSpliceIndex =
      position === CreateEmptyStepPositions.BEFORE ? index : index + 1

    localStepData.splice(startSpliceIndex, 0, {
      step: index,
      groups: [],
      excluded: true,
      isActive: true,
      isReturnedVariantsActive: false,
      conditionPointIndex:
        startSpliceIndex < this.stepData.length - 1
          ? this.stepData[startSpliceIndex].conditionPointIndex
          : this.stepData[this.stepData.length - 1].returnPointIndex,
      returnPointIndex: null,
    })

    localStepData.forEach((item, currNo: number) => {
      item.step = currNo + 1
    })

    runInAction(() => {
      this.stepData = localStepData
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

  addSelectedGroup(group: any) {
    this.selectedGroups = []
    this.selectedGroups = group
    this.resetLocalDtreeCode()
  }

  addSelectedFilter(filter: string) {
    this.selectedFilters = [...this.selectedFilters, filter]

    this.resetLocalDtreeCode()
  }

  addSelectedFilterList(filters: string[]) {
    this.selectedFilters = [...this.selectedFilters, ...filters]

    this.resetLocalDtreeCode()
  }

  removeSelectedFilter(filter: string) {
    this.selectedFilters = this.selectedFilters.filter(item => item !== filter)
    this.resetLocalDtreeCode()
  }

  resetSelectedFilters() {
    this.selectedFilters = []
  }

  // 3.2 Functions for editing loaded tree

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

  // 3.4 Common UI/UX modals

  openModalSaveDataset = () => {
    this.isModalSaveDatasetVisible = true
  }

  closeModalSaveDataset() {
    this.isModalSaveDatasetVisible = false
  }

  openModalViewVariants(index?: number) {
    this.isModalViewVariantsVisible = true

    if (index) this.tableModalIndexNumber = index
  }

  closeModalViewVariants = () => {
    this.isModalViewVariantsVisible = false
    // this.tableModalIndexNumber = null
  }

  get variantsModalQuery(): IDsListArguments | undefined {
    const ds = datasetStore.datasetName
    const no = this.tableModalIndexNumber

    if (!ds || no === null) {
      return undefined
    }

    return {
      ds,
      no,
      code: this.dtreeCode,
    }
  }

  // 4. Other UI control functions

  setQueryBuilderRenderKey(key: number) {
    runInAction(() => {
      this.queryBuilderRenderKey = key
    })
  }

  setPointCounts(pointCounts: PointCount[]) {
    runInAction(() => {
      this.pointCounts = pointCounts
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

  setAlgorithmFilterFullWord = (value: boolean) => {
    this.algorithmFilterFullWord = value
  }

  resetAlgorithmFilterValue() {
    this.algorithmFilterValue = ''
  }

  toggleIsExcluded(index: number) {
    this.stepData[index].excluded = !this.stepData[index].excluded
    this.resetLocalDtreeCode()
  }

  changeStepDataActiveStep = (
    index: number,
    option: ActiveStepOptions,
    indexForApi: string,
  ) => {
    this.stepData.forEach(element => {
      element.isActive = false
      element.isReturnedVariantsActive = false
    })

    if (option === ActiveStepOptions.StartedVariants) {
      this.stepData[index].isActive = true
    } else {
      this.stepData[index].isReturnedVariantsActive = true
    }

    this.stat.setQuery({
      datasetName: datasetStore.datasetName,
      code: this.dtreeCode,
      stepIndex: indexForApi,
    })
  }

  resetStatFuncData() {
    this.statFuncData = []
  }

  resetData() {
    this.filteredCounts = 0
    this.statRequestId = ''
  }

  setPrevDtreeName(name: string) {
    this.previousDtreeName = name
  }

  resetPrevDtreeName() {
    this.previousDtreeName = ''
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

  setActionName(actionName?: ActionFilterEnum): void {
    this.actionName = actionName
  }
}
