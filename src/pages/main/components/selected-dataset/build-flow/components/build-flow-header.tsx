import styles from '../build-flow.module.css'

import { ReactElement } from 'react'
import { useHistory } from 'react-router'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { datasetStore } from '@store/dataset'
import dirinfoStore from '@store/dirinfo'
import { Routes } from '@router/routes.enum'
import { CardTitle } from '@ui/card'
import { Icon } from '@ui/icon'
import { DatasetCard } from '@data-testid'
import { isDev } from '@pages/main/main.constants'
import { OpenViewer } from '../../components/open-viewer'
import wizardStore from './wizard/wizard.store'

export const BuildFlowHeader = observer(
  ({ goBack }: { goBack: () => void }): ReactElement => {
    const history = useHistory()
    const { isXL, datasetName } = datasetStore
    const { selectedDataset } = wizardStore

    const handleGoMain = () => {
      goBack()
      history.push(Routes.Root)
      wizardStore.actionHistory.resetHistory()
      wizardStore.resetWizard()
      wizardStore.resetDatasetKind()
    }

    const handleGoStart = () => {
      goBack()
      wizardStore.actionHistory.resetHistory()
      wizardStore.resetWizard()
    }

    const handleGoBack = () => {
      if (wizardStore.actionHistory.historyIndex === 0) {
        return isXL ? handleGoStart() : handleGoMain()
      }

      return wizardStore.actionHistory.goBackward()
    }

    return (
      <div className={styles.buildFlow__header}>
        <div className="flex items-center">
          {!isXL && wizardStore.actionHistory.historyIndex <= 1 ? null : (
            <div
              onClick={handleGoBack}
              className={styles.buildFlow__header__button}
            >
              <Icon
                name="Arrow"
                className={styles.buildFlow__header__button__icon}
              />
            </div>
          )}

          <CardTitle
            text={dirinfoStore.selectedDirinfoName}
            dataTestId={DatasetCard.datasetHeader}
            className="mr-3 break-words"
            size="md"
          />

          {isDev && !datasetStore.isXL && <OpenViewer />}
        </div>

        <div className={styles.buildFlow__breadcrumbs}>
          <div
            onClick={handleGoMain}
            className={styles.buildFlow__breadcrumbs__folder}
          >
            {t('home.startFlow.main')}
          </div>

          {isXL && (
            <>
              <div className="text-blue-bright mx-1">/</div>

              <div
                onClick={handleGoStart}
                className={styles.buildFlow__breadcrumbs__folder}
              >
                {t('home.startFlow.startFlow')}
              </div>
            </>
          )}

          <div className="flex text-grey-dark">
            <div className="mx-1">/</div>

            <div>{selectedDataset || datasetName}</div>
          </div>
        </div>
      </div>
    )
  },
)
