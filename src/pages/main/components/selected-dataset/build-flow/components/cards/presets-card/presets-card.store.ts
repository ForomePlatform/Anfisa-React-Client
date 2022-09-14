import { makeAutoObservable, toJS } from 'mobx'

import { TExploreGenomeKeys } from '@core/enum/explore-genome-types-enum'
import datasetStore from '@store/dataset/dataset'
import { DtreeSetAsyncStore } from '@store/dtree/dtree-set.async.store'
import { AvailablePresetsAsyncStore } from '@store/filter-presets/available-presets.async.store'
import { WizardCardIds } from '@pages/main/components/selected-dataset/build-flow/components/wizard/scenarios/wizard-scenarios.constants'
import { addSolutionKind } from './utils/add-solution-kind'

class PresetsCardStore {
  private readonly _presets = new AvailablePresetsAsyncStore()
  private readonly _dtrees = new DtreeSetAsyncStore()

  private _offsetOfTop: Map<WizardCardIds, number> = new Map()

  public offsetOfTop(id: WizardCardIds): number {
    return this._offsetOfTop.get(id) || 0
  }

  public setTopOffset(id: WizardCardIds, offset?: number) {
    this._offsetOfTop.set(id, offset || 0)
  }

  public get solutions() {
    return [
      ...addSolutionKind(toJS(this._presets.data || []), 'preset'),
      ...addSolutionKind(
        toJS(this._dtrees.data?.['dtree-list'] || []),
        'dtree',
      ),
    ]
  }

  public get isFetchingSolutions() {
    return this._presets.isFetching || this._dtrees.isFetching
  }

  constructor() {
    makeAutoObservable(this)
  }

  private loadPresets() {
    const { datasetName } = datasetStore

    if (datasetName) {
      this._presets.setQuery({ datasetName })
    }
  }

  private loadDTrees() {
    if (datasetStore.datasetName) {
      this._dtrees.setQuery({
        ds: datasetStore.datasetName,
        tm: '0',
        code: 'return False',
      })
    }
  }

  public loadSolutions() {
    this.loadPresets()
    this.loadDTrees()
  }

  public refreshDtrees() {
    this._dtrees.invalidate()
    this._offsetOfTop = new Map<WizardCardIds, number>()
  }

  public refreshPresets() {
    this._presets.invalidate()
    this._offsetOfTop = new Map<WizardCardIds, number>()
  }

  public getSolutionsByRubric(rubric?: TExploreGenomeKeys) {
    if (rubric) {
      return this.solutions.filter(solution => solution.rubric === rubric)
    } else {
      return this.solutions
    }
  }
}

export default new PresetsCardStore()
