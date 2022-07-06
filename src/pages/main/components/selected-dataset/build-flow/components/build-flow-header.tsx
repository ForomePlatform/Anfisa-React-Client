import styles from '../build-flow.module.css'

import { ReactElement } from 'react'
import { useHistory } from 'react-router'
import { observer } from 'mobx-react-lite'

import { ExploreTypes } from '@core/enum/explore-types-enum'
import { t } from '@i18n'
import { datasetStore } from '@store/dataset'
import dirinfoStore from '@store/dirinfo'
import { Routes } from '@router/routes.enum'
import { CardTitle } from '@ui/card'
import { Icon } from '@ui/icon'
import { DatasetCard } from '@components/data-testid/dataset-card.cy'
import selectedDatasetStore from '../../selected-dataset.store'

export const BuildFlowHeader = observer(
  ({ goBack }: { goBack: () => void }): ReactElement => {
    const history = useHistory()

    const handleGoHome = () => {
      goBack()
      history.push(Routes.Root)
    }

    const isGenomeExplore =
      selectedDatasetStore.exploreType === ExploreTypes.Genome

    return (
      <div className={styles.buildFlow__header}>
        <div className="flex">
          <div onClick={goBack} className={styles.buildFlow__header__button}>
            <Icon
              name="Arrow"
              className={styles.buildFlow__header__button__icon}
            />
          </div>

          <CardTitle
            text={dirinfoStore.selectedDirinfoName}
            dataTestId={DatasetCard.datasetHeader}
            className="mr-3 break-words"
            style={{ maxWidth: 'calc(100% - 140px)' }}
          />
        </div>

        <div className={styles.buildFlow__breadcrumbs}>
          <div
            onClick={handleGoHome}
            className={styles.buildFlow__breadcrumbs__folder}
          >
            {t('home.startFlow.main')}
          </div>

          <div className="text-blue-bright mx-1">/</div>

          <div
            onClick={goBack}
            className={styles.buildFlow__breadcrumbs__folder}
          >
            {t('home.startFlow.startFlow')}
          </div>

          <div className="flex text-grey-dark">
            {!selectedDatasetStore.isEditionExploreType && isGenomeExplore && (
              <>
                <div className="text-blue-bright mx-1">/</div>

                <div>{datasetStore.datasetName}</div>
              </>
            )}

            {selectedDatasetStore.selectedSecondaryDataset && !isGenomeExplore && (
              <>
                <div className="mx-1">/</div>

                <div>{selectedDatasetStore.selectedSecondaryDataset}</div>
              </>
            )}
          </div>
        </div>
      </div>
    )
  },
)
