import { makeAutoObservable } from 'mobx'

import { DefaultsAsyncStore } from './common/defaults.async.store'

const DEFAULT_COUNT_OF_VARIANTS = 9000

class DefaultsStore {
  readonly defaults = new DefaultsAsyncStore()

  public get maxCountOfVariants() {
    return this.defaults.data?.['ws.max.count'] || DEFAULT_COUNT_OF_VARIANTS
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export default new DefaultsStore()
