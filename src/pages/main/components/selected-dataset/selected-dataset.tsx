import { ReactElement, useEffect } from 'react'
import { reaction } from 'mobx'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { datasetStore } from '@store/dataset'
import dirinfoStore from '@store/dirinfo'
import { SelectedDatasetBuildFlow } from './build-flow'
import wizardStore from './build-flow/components/wizard/wizard.store'
import { SelectedDatasetStartFlow } from './start-flow'

export const SelectedDataset = observer((): ReactElement => {
  useEffect(() => {
    reaction(
      () => datasetStore.datasetName,
      datasetName => {
        if (!datasetName) {
          return
        }

        const hasSecondaryDs =
          !!dirinfoStore.dirInfoData?.dsDict[datasetName].secondary?.length

        dirinfoStore.xlDatasets.includes(datasetName)
          ? wizardStore.toggleIsWizardVisible(false)
          : wizardStore.openWizardForWsDatasets(hasSecondaryDs)
      },
    )
  })

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
