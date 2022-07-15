import { ReactElement, useEffect } from 'react'
import { reaction } from 'mobx'
import { observer } from 'mobx-react-lite'

import { LocalStoreManager } from '@core/storage-management'
import { t } from '@i18n'
import { datasetStore } from '@store/dataset'
import dirinfoStore from '@store/dirinfo'
import { SelectedDatasetBuildFlow } from './build-flow'
import wizardStore from './build-flow/components/wizard/wizard.store'
import { SelectedDatasetStartFlow } from './start-flow'

interface ISavedData {
  isXL: boolean
  hasSecondaryDs: boolean
}

export const SelectedDataset = observer((): ReactElement => {
  useEffect(() => {
    reaction(
      () => datasetStore.datasetName,
      datasetName => {
        if (!datasetStore.datasetName) {
          return
        }

        const savedData: ISavedData | undefined =
          LocalStoreManager.read('wizard')

        let hasSecondaryDs =
          !!dirinfoStore.dirInfoData?.dsDict[datasetName].secondary?.length

        if (savedData && !savedData.isXL) {
          if (dirinfoStore.dirInfoData) {
            wizardStore.openWizardForWsDatasets(hasSecondaryDs)
          } else {
            hasSecondaryDs = savedData.hasSecondaryDs
            wizardStore.openWizardForWsDatasets(savedData.hasSecondaryDs)
          }

          LocalStoreManager.write('wizard', {
            isXL: false,
            hasSecondaryDs,
          })
        }
      },
    )
  }, [])

  if (!dirinfoStore.selectedDirinfoName) {
    return (
      <span className="m-auto text-grey-blue">{t('home.pickDataset')}</span>
    )
  }

  return (
    <>
      {wizardStore.isWizardVisible ? (
        <SelectedDatasetBuildFlow
          goBack={() => wizardStore.toggleIsWizardVisible(false)}
        />
      ) : (
        <SelectedDatasetStartFlow />
      )}
    </>
  )
})
