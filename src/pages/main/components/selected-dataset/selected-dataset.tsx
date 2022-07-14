import { ReactElement, useEffect } from 'react'
import { reaction, toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { useParams } from '@core/hooks/use-params'
import { t } from '@i18n'
import dataset from '@store/dataset/dataset'
import dirinfoStore from '@store/dirinfo'
import { SelectedDatasetBuildFlow } from './build-flow'
import selectedDatasetStore from './selected-dataset.store'
import { SelectedDatasetStartFlow } from './start-flow'
import wizardStore from './wizard.store'

export const SelectedDataset = observer((): ReactElement => {
  if (!dirinfoStore.selectedDirinfoName) {
    return (
      <span className="m-auto text-grey-blue">{t('home.pickDataset')}</span>
    )
  }
  const { wizardScenario } = wizardStore

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
