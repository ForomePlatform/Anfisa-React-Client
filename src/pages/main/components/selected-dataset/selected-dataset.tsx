import { ReactElement, useEffect } from 'react'
import { reaction, toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { pushQueryParams } from '@core/history'
import { useParams } from '@core/hooks/use-params'
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
  const params = useParams()

  useEffect(() => {
    reaction(
      () => datasetStore.datasetName,
      datasetName => {
        if (!datasetStore.datasetName) {
          return
        }

        let kind = params.get('kind')
        const isSecondary = params.get('secondary')
        // console.log('params', kind)

        let hasSecondaryDs =
          !!dirinfoStore.dirInfoData?.dsDict[datasetName].secondary?.length

        if (
          dirinfoStore.dirInfoData &&
          !dirinfoStore.xlDatasets.includes(datasetName)
        ) {
          wizardStore.openWizardForWsDatasets(hasSecondaryDs)

          kind = 'ws'
          const secondary = hasSecondaryDs ? 'true' : 'false'

          pushQueryParams({ kind, secondary })
        } else if (kind && kind !== 'xl') {
          hasSecondaryDs = isSecondary === 'true'
          wizardStore.openWizardForWsDatasets(hasSecondaryDs)

          kind = 'ws'
          const secondary = hasSecondaryDs ? 'true' : 'false'

          pushQueryParams({ kind, secondary })
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
