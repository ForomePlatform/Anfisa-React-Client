import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dirinfoStore from '@store/dirinfo'
import selectedDatasetStore from './selected-dataset.store'
import { SelectedDatasetMain } from './selected-dataset-main'
import { SelectedDatasetStartFlow } from './selected-dataset-start-flow'

export const SelectedDataset = observer((): ReactElement => {
  if (!dirinfoStore.selectedDirinfoName) {
    return (
      <span className="m-auto text-grey-blue">{t('home.pickDataset')}</span>
    )
  }

  return (
    <>
      {selectedDatasetStore.isStartFlowVisible ? (
        <SelectedDatasetStartFlow
          goBack={() => selectedDatasetStore.toggleIsStartFlowVisible(false)}
        />
      ) : (
        <SelectedDatasetMain />
      )}
    </>
  )
})
