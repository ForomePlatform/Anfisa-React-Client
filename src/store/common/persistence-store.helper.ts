import { computed, Lambda } from 'mobx'

import { LocalStoreManager, StoreManager } from '@core/storage-management'

export const persistenceStoreHelper = <Data>(
  storageKey: string,
  getter: () => Data,
  manager: typeof StoreManager = LocalStoreManager,
): [Partial<Data>, Lambda] => {
  const data = computed(getter)

  const disposer = data.observe_(({ newValue }) => {
    manager.write(storageKey, newValue)
  })

  return [manager.read(storageKey) ?? {}, disposer]
}
