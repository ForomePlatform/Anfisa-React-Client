import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { ExploreCandidateType } from '@core/enum/explore-candidate-type-enum'
import { Card } from '@ui/card'
import { CardListSection } from './components/start-section/card-list-section'
import { CardRadioSection } from './components/start-section/card-radio-section'
import selectedDatasetStore from './selected-dataset.store'
import {
  datasetDescription,
  exploreCandidateOptionsList,
  relevantPresetsList,
} from './selected-dataset-main'

interface IStartFlowRightColumnProps {
  isEditionExploreGenome: boolean
  isEditionExploreCandidate: boolean
  exploreCandidateType: ExploreCandidateType
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
      exploreCandidateType === ExploreCandidateType.ApplyFilter &&
      isEditionExploreCandidate

    return (
      <div className="flex flex-col w-1/2 pl-2">
        {secondaryDataset && (
          <Card>
            <CardRadioSection
              title={'Candidate set name'}
              optionsList={exploreCandidateOptionsList}
              description={datasetDescription}
              disabled={selectedDatasetStore.isEditionExploreCandidate}
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
