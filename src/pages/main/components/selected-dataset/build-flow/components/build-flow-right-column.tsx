import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { ExploreCandidateTypes } from '@core/enum/explore-candidate-types-enum'
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

interface IBuildFlowRightColumnProps {
  isEditionExploreGenome: boolean
  isEditionExploreCandidate: boolean
  exploreCandidateType: ExploreCandidateTypes
  secondaryDataset: string
}

export const BuildFlowRightColumn = observer(
  ({
    isEditionExploreGenome,
    isEditionExploreCandidate,
    exploreCandidateType,
    secondaryDataset,
  }: IBuildFlowRightColumnProps): ReactElement => {
    const shouldShowAdditionalPresetChoice =
      exploreCandidateType === ExploreCandidateTypes.ApplyFilter &&
      isEditionExploreCandidate

    return (
      <div className="flex flex-col w-1/2 pl-2">
        {secondaryDataset && (
          <Card>
            <CardRadioListSection
              title={t('home.buildFlow.candidateName')}
              optionsList={exploreCandidateOptionsList}
              description={datasetDescription}
              isContinueDisabled={
                selectedDatasetStore.isEditionExploreCandidate
              }
              isRadioDisabled={!!selectedDatasetStore.isEditionExploreCandidate}
              isEditDisabled={!selectedDatasetStore.isEditionExploreCandidate}
              checkedValue={selectedDatasetStore.exploreCandidateType}
              onEdit={() =>
                selectedDatasetStore.toggleIsEditionExploreCandidate(false)
              }
              onChange={value =>
                selectedDatasetStore.setExploreCandidateType(value)
              }
              onContinue={() =>
                selectedDatasetStore.toggleIsEditionExploreCandidate(true)
              }
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
              onOpen={() => alert('Whats next?')}
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
              onOpen={() => alert('Whats next?')}
              style={{ maxHeight: 'calc(100vh - 460px)' }}
            />
          </Card>
        )}
      </div>
    )
  },
)
