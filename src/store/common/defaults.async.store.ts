import { BaseAsyncDataStore } from '@store/common'
import {
  IDefaults,
  IDefaultsArguments,
} from '@service-providers/vault-level/vault-level.interface'
import vaultProvider from '@service-providers/vault-level/vault-level.provider'

interface IDefaultsQuery {
  ds?: string
}

export class DefaultsAsyncStore extends BaseAsyncDataStore<
  IDefaults,
  IDefaultsArguments
> {
  constructor() {
    super()
    // this.setQuery(null)
  }

  protected fetch(query: IDefaultsQuery): Promise<IDefaults> {
    return vaultProvider.getDefaults({ ds: query.ds })
  }
}
