import { makeAutoObservable } from 'mobx'

import datasetStore from '../dataset'
import { FilterRefinerStatStore } from './filter-refiner-stat.store'

export class FilterRefinerStore {
  readonly stat = new FilterRefinerStatStore()

  constructor() {
    makeAutoObservable(this)
  }

  get datasetName(): string {
    return datasetStore.datasetName
  }
}
