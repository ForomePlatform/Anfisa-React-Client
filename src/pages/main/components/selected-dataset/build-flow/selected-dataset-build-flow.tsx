import styles from './build-flow.module.css'

import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { BuildFlowHeader } from './components/build-flow-header'
import { BuildFlowLeftColumn } from './components/build-flow-left-column'
import { BuildFlowRightColumn } from './components/build-flow-right-column'
import wizardStore from './components/wizard/wizard.store'

export const SelectedDatasetBuildFlow = observer(
  ({ goBack }: { goBack: () => void }): ReactElement => {
    const handleGoBack = () => {
      goBack()
      wizardStore.resetScenario()
    }

    return (
      <div className={styles.buildFlow}>
        <div className={styles.buildFlow__container}>
          <BuildFlowHeader goBack={handleGoBack} />

          <div className="flex">
            <BuildFlowLeftColumn />

            <BuildFlowRightColumn />
          </div>
        </div>
      </div>
    )
  },
)
