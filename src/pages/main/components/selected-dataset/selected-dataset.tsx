import { ReactElement, useEffect } from 'react'
import { reaction } from 'mobx'
import { observer } from 'mobx-react-lite'

import { useParams } from '@core/hooks/use-params'
import { t } from '@i18n'
import { datasetStore } from '@store/dataset'
import dirinfoStore from '@store/dirinfo'
import { SelectedDatasetBuildFlow } from './build-flow'
import wizardStore from './build-flow/components/wizard/wizard.store'
import { SelectedDatasetStartFlow } from './start-flow'

export const SelectedDataset = observer((): ReactElement => {
  const params = useParams()

  useEffect(() => {
    reaction(
      () => datasetStore.datasetName,
      datasetName => {
        if (!datasetStore.datasetName) {
          return
        }

        const kind = params.get('kind')

        const hasSecondaryDs =
          !!dirinfoStore.dirInfoData?.dsDict[datasetName].secondary?.length

        if (
          dirinfoStore.dirInfoData &&
          !dirinfoStore.xlDatasets.includes(datasetName)
        ) {
          wizardStore.openWizardForWsDatasets(hasSecondaryDs)
        } else if (kind && kind !== 'xl') {
          wizardStore.openWizardForWsDatasets(hasSecondaryDs)
        }
      },
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
