import { makeAutoObservable, reaction } from 'mobx'

import wizardStore from '@pages/main/components/selected-dataset/build-flow/components/wizard/wizard.store'
import { vaultProvider } from '@service-providers/vault-level'
import { DefaultsAsyncStore } from './common/defaults.async.store'
import { datasetStore } from './dataset'

const DEFAULT_COUNT_OF_VARIANTS = 9000

class DefaultsStore {
  readonly defaults = new DefaultsAsyncStore()
  public dropDs: string[] = []
  public isFetchingDropDs = false

  public get maxCountOfVariants() {
    return this.defaults.data?.['ws.max.count'] || DEFAULT_COUNT_OF_VARIANTS
  }

  public get isAbleToBeDropped() {
    return this.defaults.data?.canDropDs
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

    this.dropDs = [...this.dropDs, ...dropDs]
    this.isFetchingDropDs = false
  }

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
}

export default new DefaultsStore()
