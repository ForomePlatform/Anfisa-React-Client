import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { t } from '@i18n'
import { ActionsHistoryStore } from '@store/actions-history'
import filterDtrees from '@store/filter-dtrees'
import { IDsListArguments } from '@service-providers/dataset-level'
import {
  dtreeProvider,
  DtreeSetPointKinds,
  IDtreeSetArguments,
} from '@service-providers/decision-trees'
import { PointCount } from '@service-providers/decision-trees/decision-trees.interface'
import { showToast } from '@utils/notifications'
import datasetStore from '../dataset/dataset'
import { DtreeModifiedState } from '../filter-dtrees/filter-dtrees.store'
import { DtreeSetAsyncStore } from './dtree-set.async.store'
import { DtreeStatStore } from './dtree-stat.store'
import stepStore, { ActiveStepOptions } from './step.store'

export const MIN_CODE_LENGTH = 13

export type IStepData = {
  step: number
  groups: any[]
  excluded: boolean
  isNegate?: boolean
  isActive: boolean
  isReturnedVariantsActive: boolean
  conditionPointIndex: number | null
  returnPointIndex: number | null
  comment?: string
  condition?: string
  result?: string
  isFinalStep?: boolean
}

interface IDtreeFilteredCounts {
  accepted: number
  rejected: number
}

export class DtreeStore {
  readonly dtreeSet = new DtreeSetAsyncStore()
  readonly stat = new DtreeStatStore()
  private _dtreeModifiedState: DtreeModifiedState = DtreeModifiedState.NotDtree
  private _previousDtreeCode = ''
  private _XlPointCounts: PointCount[] = []

  public startDtreeCode = ''
  public localDtreeCode = ''
  public currentDtreeName = ''

  public selectedGroups: any = []

  public isResultsContentExpanded = false
  public resultsChangeIndicator = 0

  public algorithmFilterValue = ''
  public algorithmFilterFullWord = false

  public isModalViewVariantsVisible = false
  public tableModalIndexNumber: null | number = null

  public actionHistory = new ActionsHistoryStore<IDtreeSetArguments>(data =>
    this.fetchDtreeSetAsync(data, false),
  )

  get dtreeList() {
    return this.dtreeSetData?.['dtree-list']
  }

  get dtreeSetData() {
    return this.dtreeSet.data
  }

  get dtreeCode(): string {
    return this.dtreeSetData?.code ?? ''
  }

  get pointCounts() {
    const counts = this.isXl
      ? this._XlPointCounts
      : this.dtreeSetData?.['point-counts']

    return counts ?? []
  }

  get stepIndexes(): string[] {
    return Object.keys(this.dtreeSetData?.['cond-atoms'] ?? {})
  }

  get evalStatus(): string {
    return this.dtreeSetData?.['eval-status'] ?? ''
  }

  public get dataReady(): number {
    return this.stat.dataReady
  }

  public get isDtreeModified(): boolean {
    return this._dtreeModifiedState === DtreeModifiedState.Modified
  }

  public get isNotDtree(): boolean {
    return this._dtreeModifiedState === DtreeModifiedState.NotDtree
  }

  constructor() {
    reaction(
      () => this.dtreeSetData,
      response => {
        if (response) {
          stepStore.setSteps(response.steps)

          // make step active after load dtree_set
          const { activeStepIndex, steps } = stepStore
          const finalStepIndex = steps.length - 1

          // use finalStepIndex if
          // 1) load new tree
          // 2) first load empty tree
          // 3) the final step is active and we deleted different step
          const shouldUseFinalIndex =
            response['dtree-name'] ||
            activeStepIndex === 0 ||
            activeStepIndex > finalStepIndex

          const index = shouldUseFinalIndex ? finalStepIndex : activeStepIndex

          stepStore.makeStepActive(index, ActiveStepOptions.StartedVariants)
        }
        if (response?.kind === 'xl') {
          dtreeProvider
            .getFullDtreeCounts(
              {
                ds: datasetStore.datasetName,
                tm: '1',
                code: response.code,
                points: [...new Array(response['point-counts'].length).keys()],
                rq_id: response['rq-id'],
              },
              {
                onPartialResponse: data => {
                  runInAction(() => {
                    this._XlPointCounts = [
                      ...toJS(this._XlPointCounts),
                      ...data['point-counts'],
                    ]
                  })
                },
              },
            )
            .then(data => {
              runInAction(() => {
                this._XlPointCounts = data['point-counts']
              })
            })
        }
      },
    )

    makeAutoObservable(this)

    reaction(
      () => filterDtrees.activeDtree,
      dtreeName => {
        if (dtreeName) {
          this.loadDtree(dtreeName)
        } else {
          this.resetPreset()
        }
      },
    )

    reaction(
      () => this.dtreeCode,
      code => {
        if (this._previousDtreeCode.length > MIN_CODE_LENGTH) {
          this.setDtreeModifiedState()
        }
        this._previousDtreeCode = code
      },
    )
  }

  public get totalCounts() {
    const variantCounts = this.stat.totalCounts?.variants
    const dnaVariantsCounts = this.stat.totalCounts?.transcripts
    const transcriptsCounts = this.stat.totalCounts?.transcribedVariants

    return { variantCounts, dnaVariantsCounts, transcriptsCounts }
  }

  get isXl(): boolean {
    return !this.dtreeSetData || this.dtreeSetData.kind === 'xl'
  }

  get acceptedVariants(): number {
    return stepStore.steps.reduce((acc, { excluded, returnPointIndex }) => {
      if (!excluded && returnPointIndex !== null) {
        return acc + (this.pointCounts[returnPointIndex]?.[0] ?? 0)
      }

      return acc
    }, 0)
  }

  get rejectedVariants(): number {
    const totalCounts = this.dtreeSetData?.['total-counts']
    const variants = totalCounts?.[0]

    return Number(variants) - this.acceptedVariants
  }

  /**
   * totalFilteredCounts returns accepted and rejected variants for XL dataset,
   * and transcribed variants for WS
   */
  get totalFilteredCounts(): IDtreeFilteredCounts | undefined {
    if (!this.dtreeSetData) {
      return undefined
    }
    const { isXl, pointCounts: counts } = this
    const { points, 'total-counts': totalCounts } = this.dtreeSetData

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

    const rejected = Number(totalCounts[isXl ? 0 : 1]) - accepted

    return {
      accepted,
      rejected,
    }
  }

  // 1. Functions to load / draw / edit decision trees

  getStepIndexForApi = (index: number) => {
    const indexes = toJS(this.stepIndexes)
    const shouldGetAnotherIndex = index === indexes.length

    const currentIndex = shouldGetAnotherIndex
      ? +indexes[index - 1] + 1
      : +indexes[index]

    const stepIndex = indexes.length === 0 ? 0 : currentIndex

    const pointsIndexes = Object.keys(this.dtreeSetData?.points ?? [])
    const lastIndex = +pointsIndexes[pointsIndexes.length - 1]

    const stepIndexForApi = Number.isNaN(stepIndex) ? lastIndex : stepIndex

    return stepIndexForApi
  }

  async fetchDtreeSetAsync(
    body: IDtreeSetArguments,
    shouldSaveInHistory = true,
  ) {
    if (shouldSaveInHistory) this.actionHistory.addHistory(body)

    this.dtreeSet.setQuery(body)
  }

  public loadEmptyTree = async () => {
    await this.fetchDtreeSetAsync({
      ds: datasetStore.datasetName,
      tm: '0',
      code: 'return False',
    })
  }

  private loadDtree(dtreeName: string): void {
    this.fetchDtreeSetAsync({
      ds: datasetStore.datasetName,
      dtree: dtreeName,
    })
      .then(() => {
        this.setDtreeModifiedState(DtreeModifiedState.NotModified)
        this.currentDtreeName = dtreeName
      })
      .catch(() => {
        showToast(t('dtree.errors.loadDtree', { dtreeName }), 'error')
      })
  }

  private setDtreeModifiedState(state?: DtreeModifiedState): void {
    if (state === undefined) {
      if (this._dtreeModifiedState === DtreeModifiedState.NotModified) {
        this._dtreeModifiedState = DtreeModifiedState.Modified
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

  public async clearAll() {
    this.actionHistory.resetHistory()
    this.localDtreeCode = ''
    this._previousDtreeCode = ''
    this.startDtreeCode = ''
    this.currentDtreeName = ''
    filterDtrees.resetActiveDtree()
    await this.loadEmptyTree()
    this.setDtreeModifiedState(DtreeModifiedState.NotDtree)
  }

  // 2. UI functions to display adding / deleting / editing steps

  get isTreeEmpty(): boolean {
    const isFirstStepEmpty = stepStore.steps[0]?.groups.length === 0
    return stepStore.steps.length === 2 && isFirstStepEmpty
  }

  addSelectedGroup(group: any) {
    this.selectedGroups = []
    this.selectedGroups = group
    this.resetLocalDtreeCode()
  }

  // 3. Functions for editing loaded tree

  setStartDtreeCode() {
    this.startDtreeCode = this.dtreeCode
  }

  setLocalDtreeCode(code: string) {
    this.localDtreeCode = code
  }

  resetLocalDtreeCode() {
    this.localDtreeCode = ''
  }

  // 4. Common UI/UX modals

  openModalViewVariants(index?: number) {
    this.isModalViewVariantsVisible = true

    if (index) this.tableModalIndexNumber = index
  }

  closeModalViewVariants = () => {
    this.isModalViewVariantsVisible = false
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

  // 5. Other UI control functions

  expandResultsContent() {
    this.isResultsContentExpanded = true
    this.resultsChangeIndicator++
  }

  collapseResultsContent() {
    this.isResultsContentExpanded = false
    this.resultsChangeIndicator--
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
    stepStore.steps[index].excluded = !stepStore.steps[index].excluded
    this.resetLocalDtreeCode()
  }

  setDtreeModifyed() {
    if (this._dtreeModifiedState === DtreeModifiedState.NotModified) {
      this._dtreeModifiedState = DtreeModifiedState.Modified
    }
  }
}
