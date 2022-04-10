import { computed, makeObservable, toJS } from 'mobx'

import {
  BaseAsyncDataStore,
  TBaseDataStoreOptions,
} from '@store/common/base-async-data.store'
import {
  TFilteringStat,
  TItemsCount,
  TPropertyStatus,
} from '@service-providers/common'
import { getFilteredAttrsList } from '@utils/getFilteredAttrsList'

export abstract class BaseStatUnitsStore<
  Data extends TFilteringStat,
  Request,
> extends BaseAsyncDataStore<Data, Request> {
  protected constructor(options?: TBaseDataStoreOptions) {
    super(options)

    makeObservable(this, {
      list: computed,
      totalCounts: computed,
      filteredCounts: computed,
    })
  }

  getAttributeStatusByName(name: string): TPropertyStatus | undefined {
    return this.list?.find(prop => prop.name === name)
  }

  get list(): TPropertyStatus[] | undefined {
    const { data } = this

    return data?.list && getFilteredAttrsList(toJS(data.list))
  }

  get totalCounts(): TItemsCount | undefined {
    return this.data?.totalCounts
  }

  get filteredCounts(): TItemsCount | undefined {
    return this.data?.filteredCounts
  }
}
