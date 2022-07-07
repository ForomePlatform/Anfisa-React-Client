import styles from './build-flow.module.css'

import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

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

    return (
      <div className={styles.buildFlow}>
        <div className={styles.buildFlow__container}>
          <BuildFlowHeader goBack={handleGoBack} />

          <div className="flex">
            <BuildFlowLeftColumn onContinue={handleContinueBuildFlow} />

            <BuildFlowRightColumn />
          </div>
        </div>
      </div>
    )
  },
)
