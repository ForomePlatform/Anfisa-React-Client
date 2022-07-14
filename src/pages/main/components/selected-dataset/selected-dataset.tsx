import { ReactElement } from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dirinfoStore from '@store/dirinfo'
import { SelectedDatasetBuildFlow } from './build-flow'
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
