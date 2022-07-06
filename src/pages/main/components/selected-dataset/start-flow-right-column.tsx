import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { ExploreCandidateTypes } from '@core/enum/explore-candidate-types-enum'
import { Card } from '@ui/card'
import { CardListSection } from './components/start-section/card-list-section'
import { CardRadioSection } from './components/start-section/card-radio-section'
import {
  datasetDescription,
  exploreCandidateOptionsList,
  relevantPresetsList,
} from './selected-dataset.constants'
import selectedDatasetStore from './selected-dataset.store'

interface IStartFlowRightColumnProps {
  isEditionExploreGenome: boolean
  isEditionExploreCandidate: boolean
  exploreCandidateType: ExploreCandidateTypes
  secondaryDataset: string
}

export const StartFlowRightColumn = observer(
  ({
    isEditionExploreGenome,
    isEditionExploreCandidate,
    exploreCandidateType,
    secondaryDataset,
  }: IStartFlowRightColumnProps): ReactElement => {
    const shouldShowAdditionalPresetChoice =
      exploreCandidateType === ExploreCandidateTypes.ApplyFilter &&
      isEditionExploreCandidate

    return (
      <div className="flex flex-col w-1/2 pl-2">
        {secondaryDataset && (
          <Card>
            <CardRadioSection
              title={'Candidate set name'}
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
              title={'Relevant presets'}
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
              title={'Additional preset filters'}
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
