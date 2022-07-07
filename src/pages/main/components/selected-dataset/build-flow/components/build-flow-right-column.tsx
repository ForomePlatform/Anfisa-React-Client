import styles from '../build-flow.module.css'

import { ReactElement } from 'react'
import { useHistory } from 'react-router'
import { observer } from 'mobx-react-lite'

import { ExploreCandidateTypes } from '@core/enum/explore-candidate-types-enum'
import { ExploreTypes } from '@core/enum/explore-types-enum'
import { t } from '@i18n'
import { Card } from '@ui/card'
import {
  datasetDescription,
  exploreCandidateOptionsList,
  relevantPresetsList,
} from '../../selected-dataset.constants'
import selectedDatasetStore from '../../selected-dataset.store'
import { CardListSection } from './card-sections/card-list-section'
import { CardRadioListSection } from './card-sections/card-radio-list-section'

export const BuildFlowRightColumn = observer((): ReactElement => {
  const {
    selectedSecondaryDataset,
    datasetName,
    isEditionExploreCandidate,
    isEditionExploreGenome,
    exploreCandidateType,
    isEditionExploreType,
  } = selectedDatasetStore

  const history = useHistory()

  const shouldShowAdditionalPresetChoice =
    exploreCandidateType === ExploreCandidateTypes.ApplyFilter &&
    isEditionExploreCandidate

  const handleOpen = () => {
    exploreCandidateType === ExploreCandidateTypes.ApplyFilter &&
    !isEditionExploreCandidate
      ? selectedDatasetStore.toggleIsEditionExploreCandidate(true)
      : selectedDatasetStore.openNextPage(history)
  }

  const isExploreCandidate =
    selectedDatasetStore.exploreType === ExploreTypes.Candidate

  return (
    <div className={styles.buildFlow__column}>
      {isExploreCandidate && !isEditionExploreType && (
        <Card>
          <CardRadioListSection
            title={selectedSecondaryDataset || datasetName}
            optionsList={exploreCandidateOptionsList}
            description={datasetDescription}
            isContinueDisabled={selectedDatasetStore.isEditionExploreCandidate}
            isRadioDisabled={!!selectedDatasetStore.isEditionExploreCandidate}
            isEditDisabled={!selectedDatasetStore.isEditionExploreCandidate}
            checkedValue={selectedDatasetStore.exploreCandidateType}
            onEdit={() =>
              selectedDatasetStore.toggleIsEditionExploreCandidate(false)
            }
            onChange={value =>
              selectedDatasetStore.setExploreCandidateType(value)
            }
            onContinue={handleOpen}
          />
        </Card>
      )}

      {isEditionExploreGenome && (
        <Card className="px-0">
          <CardListSection
            title={t('home.buildFlow.relevantPresets')}
            optionsList={relevantPresetsList}
            onSelect={value => selectedDatasetStore.setPreset(value)}
            selectedItem={selectedDatasetStore.selectedPreset}
            onOpen={handleOpen}
            style={{ maxHeight: 'calc(100vh - 265px)' }}
          />
        </Card>
      )}

      {shouldShowAdditionalPresetChoice && (
        <Card className="mt-4">
          <CardListSection
            title={t('home.buildFlow.additionalPresetFilter')}
            optionsList={relevantPresetsList}
            onSelect={value => selectedDatasetStore.setPreset(value)}
            selectedItem={selectedDatasetStore.selectedPreset}
            onOpen={handleOpen}
            style={{ maxHeight: 'calc(100vh - 460px)' }}
          />
        </Card>
      )}
    </div>
  )
})
