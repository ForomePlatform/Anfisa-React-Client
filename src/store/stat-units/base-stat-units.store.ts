import { computed, makeObservable, toJS } from 'mobx'

import {
  BaseAsyncDataStore,
  TBaseDataStoreOptions,
} from '@store/common/base-async-data.store'
import {
  TFilteringStat,
  TFilteringStatCounts,
  TNonFuncPropertyStatus,
  TPropertyStatus,
} from '@service-providers/common'
import { TFunctionalUnit, TUnitGroups } from './stat-units.interface'
import { getUnitGroups } from './stat-units.utils'

export abstract class BaseStatUnitsStore<
  Data extends TFilteringStat,
  Request,
> extends BaseAsyncDataStore<Data, Request> {
  protected constructor(options?: TBaseDataStoreOptions) {
    super(options)

    makeObservable(this, {
      units: computed,
      functionalUnits: computed,
      totalCounts: computed,
      filteredCounts: computed,
    })
  }

  getAttributeStatusByName(name: string): TPropertyStatus | undefined {
    const findCallback = (prop: TPropertyStatus) => prop.name === name

    return (
      this.functionalUnits?.find(findCallback) ?? this.units?.find(findCallback)
    )
  }

  get units(): TNonFuncPropertyStatus[] | undefined {
    return toJS(this.data?.units) as TNonFuncPropertyStatus[] | undefined
  }

  get functionalUnits(): TFunctionalUnit[] {
    return toJS(this.data?.functionalUnits) ?? []
  }

  get dataReady(): number {
    const units = this.data?.units || []
    const downloaded = units.length - units.filter(it => it.incomplete).length

    return (downloaded / units.length) * 100
  }

  get totalCounts(): TFilteringStatCounts | undefined {
    return toJS(this.data?.totalCounts)
  }

  get filteredCounts(): TFilteringStatCounts | undefined {
    return toJS(this.data?.filteredCounts)
  }

  get unitGroups(): TUnitGroups {
    if (!this.units || !this.filteredCounts) {
      return []
    }

    return getUnitGroups(this.units, this.filteredCounts)
  }
}
