import { makeAutoObservable, reaction } from 'mobx'

import wizardStore from '@pages/main/components/selected-dataset/build-flow/components/wizard/wizard.store'
import { vaultProvider } from '@service-providers/vault-level'
import { DefaultsAsyncStore } from './common/defaults.async.store'
import { datasetStore } from './dataset'

const DEFAULT_COUNT = 9000

class DefaultsStore {
  readonly defaults = new DefaultsAsyncStore()
  public droppedDs: string[] = []
  public isFetchingDropDs = false

  constructor() {
    makeAutoObservable(this)

    reaction(
      () => datasetStore.datasetName,
      ds => {
        this.defaults.setQuery({ ds })
      },
    )

    reaction(
      () => wizardStore.secondaryDatasets,
      secondaryDatasets => {
        this.setDsToBeDropped(secondaryDatasets)
      },
    )
  }

  public get wsMaxCount() {
    return this.defaults.data?.['ws.max.count'] || DEFAULT_COUNT
  }

  public get exportMaxCount() {
    return this.defaults.data?.['export.max.count'] || DEFAULT_COUNT
  }

  public get tabMaxCount() {
    return this.defaults.data?.['tab.max.count'] || DEFAULT_COUNT
  }

  public async setDsToBeDropped(secondaryDatasets: string[] | undefined) {
    this.isFetchingDropDs = true
    const dropDs: string[] = []

    if (!secondaryDatasets) {
      return
    }

    if (secondaryDatasets) {
      for (const ds of secondaryDatasets) {
        const subSecondaryDs = wizardStore.getSecondaryDsByParentDs(ds)

        if (subSecondaryDs) {
          this.setDsToBeDropped(subSecondaryDs)
        }

        const res = await vaultProvider.getDefaults({ ds })

        if (res.canDropDs) {
          dropDs.push(ds)
        }
      }
    }

    this.droppedDs = [...this.droppedDs, ...dropDs]
    this.isFetchingDropDs = false
  }
}

export default new DefaultsStore()
