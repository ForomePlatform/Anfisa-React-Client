import { ReactElement, useEffect } from 'react'
import { reaction, toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { useParams } from '@core/hooks/use-params'
import { t } from '@i18n'
import dataset from '@store/dataset/dataset'
import dirinfoStore from '@store/dirinfo'
import { SelectedDatasetBuildFlow } from './build-flow'
import selectedDatasetStore from './selected-dataset.store'
import selectedDatasetCardsStore from './selected-dataset-cards.store'
import { SelectedDatasetStartFlow } from './start-flow'

const someQuery = () => {
  return toJS({
    datasetName: dataset.datasetName,
    isXL: dataset.isXL,
  })
}

export const SelectedDataset = observer((): ReactElement => {
  useEffect(() => {
    reaction(
      () => someQuery(),
      query => {
        const dsName = dirinfoStore.selectedDirinfoName

        const hasSecondaryDs =
          !!dirinfoStore.dirInfoData?.dsDict[dsName].secondary?.length

        query.isXL
          ? selectedDatasetStore.toggleIsBuildFlowVisible(false)
          : selectedDatasetStore.openWizardFowWsDataset(hasSecondaryDs)
      },
    )
  })

  if (!dirinfoStore.selectedDirinfoName) {
    return (
      <span className="m-auto text-grey-blue">{t('home.pickDataset')}</span>
    )
  }
  const { wizardScenario } = selectedDatasetCardsStore
  console.log('wizardScenario', toJS(wizardScenario))

  return (
    <>
      {selectedDatasetStore.isBuildFlowVisible ? (
        <SelectedDatasetBuildFlow
          goBack={() => selectedDatasetStore.toggleIsBuildFlowVisible(false)}
        />
      ) : (
        <SelectedDatasetStartFlow />
      )}
    </>
  )
})
