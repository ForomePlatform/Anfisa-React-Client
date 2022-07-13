import { makeAutoObservable, toJS } from 'mobx'

import datasetStore from '@store/dataset/dataset'
import { DtreeSetAsyncStore } from '@store/dtree/dtree-set.async.store'
import { AvailablePresetsAsyncStore } from '@store/filter-presets/available-presets.async.store'
import { addSolutionKind } from './utils/add-solution-kind'

class PresetsCardStore {
  private readonly _presets = new AvailablePresetsAsyncStore()
  private readonly _dtrees = new DtreeSetAsyncStore()

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
}

export default new PresetsCardStore()
