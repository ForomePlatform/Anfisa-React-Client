import { computed, makeObservable, toJS } from 'mobx'

import {
  BaseAsyncDataStore,
  TBaseDataStoreOptions,
} from '@store/common/base-async-data.store'
import { TVariant } from '@service-providers/common'
import { IStatFunc } from '@service-providers/filtering-regime'

export abstract class BaseStatFuncStore<
  Data extends IStatFunc,
  Request,
> extends BaseAsyncDataStore<Data, Request> {
  protected constructor(options?: TBaseDataStoreOptions) {
    super(options)

    makeObservable(this, {
      variants: computed,
    })
  }

  public get variants(): TVariant[] | undefined {
    return toJS(this.data?.variants)
  }

  public get status(): string | undefined {
    return toJS(this.data?.err)
  }
}
