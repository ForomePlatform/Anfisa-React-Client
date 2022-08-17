import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dirinfoStore from '@store/dirinfo'
import { SelectedDatasetBuildFlow } from './build-flow'
import wizardStore from './build-flow/components/wizard/wizard.store'
import { SelectedDatasetStartFlow } from './start-flow'

export const SelectedDataset = observer((): ReactElement => {
  const { isFetching } = dirinfoStore.dirinfo

  if (!dirinfoStore.selectedDirinfoName) {
    return (
      <span className="m-auto text-grey-blue">{t('home.pickDataset')}</span>
    )
  }

  return (
    <>
      {!isFetching &&
        (wizardStore.isWizardVisible ? (
          <SelectedDatasetBuildFlow
            goBack={() => wizardStore.toggleIsWizardVisible(false)}
          />
        ) : (
          <SelectedDatasetStartFlow />
        ))}
    </>
  )
})
