import styles from '../build-flow.module.css'

import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { datasetStore } from '@store/dataset'
import { Card } from '@ui/card'
import {
  startFlowOptionsList,
  whatsNextOptionsList,
} from '../../selected-dataset.constants'
import selectedDatasetStore from '../../selected-dataset.store'
import { CardListSection } from './card-sections/card-list-section'
import { CardRadioListSection } from './card-sections/card-radio-list-section'

interface IBuildFlowLeftColumnProps {
  onContinue: () => void
}

export const BuildFlowLeftColumn = observer(
  ({ onContinue }: IBuildFlowLeftColumnProps): ReactElement => {
    const isStartWithEditDisabled =
      !selectedDatasetStore.secondaryDatasets ||
      !!selectedDatasetStore.isEditionExploreType

    const startWithOptionsList = !selectedDatasetStore.secondaryDatasets
      ? startFlowOptionsList.slice(0, 1)
      : startFlowOptionsList

    const { secondaryDatasets } = selectedDatasetStore

    const { isExploreGenomeTypeVisible, isExploreCandidateTypeVisible } =
      selectedDatasetStore
    return (
      <div className={styles.buildFlow__column}>
        <Card>
          <CardRadioListSection
            title={t('home.startFlow.startWith')}
            optionsList={startWithOptionsList}
            isContinueDisabled={!selectedDatasetStore.isEditionExploreType}
            isEditDisabled={isStartWithEditDisabled}
            isRadioDisabled={!selectedDatasetStore.isEditionExploreType}
            checkedValue={selectedDatasetStore.exploreType}
            onEdit={() => selectedDatasetStore.toggleIsEditionExploreType(true)}
            onChange={value => selectedDatasetStore.setExploreType(value)}
            onContinue={onContinue}
          />
        </Card>

        {isExploreCandidateTypeVisible && (
          <Card className="mt-4 px-0">
            <CardListSection
              title={t('home.buildFlow.candidateSet')}
              optionsList={secondaryDatasets}
              onSelect={value => {
                selectedDatasetStore.setSecondaryDataset(value)
                datasetStore.setDatasetName(value)
              }}
              selectedItem={selectedDatasetStore.selectedSecondaryDataset}
              style={{ maxHeight: 'calc(100vh - 403px)' }}
            />
          </Card>
        )}

        {isExploreGenomeTypeVisible && (
          <Card className="mt-4">
            <CardRadioListSection
              title={t('home.buildFlow.whatsNext')}
              optionsList={whatsNextOptionsList}
              isContinueDisabled={!!selectedDatasetStore.isEditionExploreGenome}
              isEditDisabled={!selectedDatasetStore.isEditionExploreGenome}
              isRadioDisabled={!!selectedDatasetStore.isEditionExploreGenome}
              checkedValue={selectedDatasetStore.exploreGenomeType}
              onEdit={() =>
                selectedDatasetStore.toggleIsEditionExploreGenome(false)
              }
              onChange={value =>
                selectedDatasetStore.setExploreGenomeType(value)
              }
              onContinue={() =>
                selectedDatasetStore.toggleIsEditionExploreGenome(true)
              }
            />
          </Card>
        )}
      </div>
    )
  },
)
