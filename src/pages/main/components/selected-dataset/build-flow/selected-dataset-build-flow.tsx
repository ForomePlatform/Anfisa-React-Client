import styles from './build-flow.module.css'

import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { ExploreTypes } from '@core/enum/explore-types-enum'
import selectedDatasetStore from '../selected-dataset.store'
import { BuildFlowHeader } from './components/build-flow-header'
import { BuildFlowLeftColumn } from './components/build-flow-left-column'
import { BuildFlowRightColumn } from './components/build-flow-right-column'

export const SelectedDatasetBuildFlow = observer(
  ({ goBack }: { goBack: () => void }): ReactElement => {
    const handleGoBack = () => {
      goBack()
      selectedDatasetStore.toggleIsEditionExploreType(false)
    }

    const handleContinueBuildFlow = () => {
      selectedDatasetStore.toggleIsBuildFlowVisible(true)
      selectedDatasetStore.toggleIsEditionExploreType(false)
    }

    const isGenome = selectedDatasetStore.exploreType === ExploreTypes.Genome

    return (
      <div className={styles.buildFlow}>
        <div className={styles.buildFlow__container}>
          <BuildFlowHeader goBack={handleGoBack} />

          <div className="flex">
            <BuildFlowLeftColumn
              isGenome={isGenome}
              isEditionExploreType={selectedDatasetStore.isEditionExploreType}
              onContinue={handleContinueBuildFlow}
            />

            <BuildFlowRightColumn
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
