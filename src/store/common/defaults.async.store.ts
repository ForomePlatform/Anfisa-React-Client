import { BaseAsyncDataStore } from '@store/common'
import { IDefaults } from '@service-providers/vault-level/vault-level.interface'
import vaultProvider from '@service-providers/vault-level/vault-level.provider'

export class DefaultsAsyncStore extends BaseAsyncDataStore<IDefaults, null> {
  constructor() {
    super()
    this.setQuery(null)
  }

  protected fetch(): Promise<IDefaults> {
    return vaultProvider.getDefaults()
  }
}
