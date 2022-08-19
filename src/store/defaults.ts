import { makeAutoObservable } from 'mobx'

import { DefaultsAsyncStore } from './common/defaults.async.store'

const DEFAULT_COUNT = 9000

class DefaultsStore {
  readonly defaults = new DefaultsAsyncStore()

  public get wsMaxCount() {
    return this.defaults.data?.['ws.max.count'] || DEFAULT_COUNT
  }

  public get exportMaxCount() {
    return this.defaults.data?.['export.max.count'] || DEFAULT_COUNT
  }

  public get tabMaxCount() {
    return this.defaults.data?.['tab.max.count'] || DEFAULT_COUNT
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export default new DefaultsStore()
