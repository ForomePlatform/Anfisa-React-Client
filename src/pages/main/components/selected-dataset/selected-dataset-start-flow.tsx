import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { ExploreTypes } from '@core/enum/explore-types-enum'
import selectedDatasetStore from './selected-dataset.store'
import { StartFlowHeader } from './start-flow-header'
import { StartFlowLeftColumn } from './start-flow-left-column'
import { StartFlowRightColumn } from './start-flow-right-column'

export const SelectedDatasetStartFlow = observer(
  ({ goBack }: { goBack: () => void }): ReactElement => {
    const handleGoBack = () => {
      goBack()
      selectedDatasetStore.toggleIsEditionExploreType(false)
    }

    const handleContinueStartFlow = () => {
      selectedDatasetStore.toggleIsStartFlowVisible(true)
      selectedDatasetStore.toggleIsEditionExploreType(false)
    }

    const isGenome = selectedDatasetStore.exploreType === ExploreTypes.Genome

    return (
      <div className="flex flex-col flex-grow justify-start overflow-y-auto">
        <div className="flex flex-col py-4 px-4">
          <StartFlowHeader goBack={handleGoBack} />

          <div className="flex">
            <StartFlowLeftColumn
              isGenome={isGenome}
              isEditionExploreType={selectedDatasetStore.isEditionExploreType}
              onContinue={handleContinueStartFlow}
            />

            <StartFlowRightColumn
              isEditionExploreGenome={
                selectedDatasetStore.isEditionExploreGenome
              }
              secondaryDataset={selectedDatasetStore.selectedSecondaryDataset}
              isEditionExploreCandidate={
                selectedDatasetStore.isEditionExploreCandidate
              }
              exploreCandidateType={selectedDatasetStore.exploreCandidateType}
            />
          </div>
        </div>
      </div>
    )
  },
)
