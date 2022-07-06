import styles from '../build-flow.module.css'

import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { Card } from '@ui/card'
import {
  startWithOptionsList,
  whatsNextOptionsList,
} from '../../selected-dataset.constants'
import selectedDatasetStore from '../../selected-dataset.store'
import { CardListSection } from './card-sections/card-list-section'
import { CardRadioListSection } from './card-sections/card-radio-list-section'

interface IBuildFlowLeftColumnProps {
  isGenome: boolean
  isEditionExploreType: boolean
  onContinue: () => void
}

export const BuildFlowLeftColumn = observer(
  ({
    isGenome,
    isEditionExploreType,
    onContinue,
  }: IBuildFlowLeftColumnProps): ReactElement => {
    const isEditDisabled =
      !selectedDatasetStore.secondaryDatasets ||
      !!selectedDatasetStore.isEditionExploreType

    const isRedioDisabled =
      !selectedDatasetStore.secondaryDatasets ||
      !selectedDatasetStore.isEditionExploreType

    const { secondaryDatasets } = selectedDatasetStore
    return (
      <div className={styles.buildFlow__column}>
        <Card>
          <CardRadioListSection
            title={t('home.startFlow.startWith')}
            optionsList={startWithOptionsList}
            isContinueDisabled={!selectedDatasetStore.isEditionExploreType}
            isEditDisabled={isEditDisabled}
            isRadioDisabled={isRedioDisabled}
            checkedValue={selectedDatasetStore.exploreType}
            onEdit={() => selectedDatasetStore.toggleIsEditionExploreType(true)}
            onChange={value => selectedDatasetStore.setExploreType(value)}
            onContinue={onContinue}
          />
        </Card>

        {!isGenome && !isEditionExploreType && (
          <Card className="mt-4 px-0">
            <CardListSection
              title={t('home.buildFlow.candidateSet')}
              optionsList={secondaryDatasets}
              onSelect={value =>
                selectedDatasetStore.setSecondaryDataset(value)
              }
              selectedItem={selectedDatasetStore.selectedSecondaryDataset}
              style={{ maxHeight: 'calc(100vh - 403px)' }}
            />
          </Card>
        )}

        {isGenome && !isEditionExploreType && (
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
