import { ReactElement } from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dirinfoStore from '@store/dirinfo'
import { SelectedDatasetBuildFlow } from './build-flow'
import selectedDatasetStore from './selected-dataset.store'
import { SelectedDatasetStartFlow } from './start-flow'

export const SelectedDataset = observer((): ReactElement => {
  if (!dirinfoStore.selectedDirinfoName) {
    return (
      <span className="m-auto text-grey-blue">{t('home.pickDataset')}</span>
    )
  }
  console.log(toJS(selectedDatasetStore.wizardData))

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
