import styles from './build-flow.module.css'

import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { IWizardScenario } from '@pages/main/components/selected-dataset/build-flow/components/wizard/wizard.interface'
import { BuildFlowHeader } from './components/build-flow-header'
import wizardStore from './components/wizard/wizard.store'

export const SelectedDatasetBuildFlow = observer(
  ({ goBack }: { goBack: () => void }): ReactElement => {
    const handleGoBack = () => {
      goBack()
      wizardStore.resetWizard()
    }

    const renderCard = ({ component, ...rest }: IWizardScenario) => {
      const Component = () =>
        component({
          ...rest,
        })
      return !rest.hidden && <Component key={rest.id} />
    }

    return (
      <div className={styles.buildFlow}>
        <div className={styles.buildFlow__container}>
          <BuildFlowHeader goBack={handleGoBack} />

          <div>
            {wizardStore.wizardScenario
              .filter(it => it.position !== 'left' && it.position !== 'right')
              .map(renderCard)}
            <div className="flex">
              <div className="w-[calc(50%-8px)]">
                {wizardStore.wizardScenario
                  .filter(it => it.position === 'left')
                  .map(renderCard)}
              </div>
              <div className="ml-4 w-[calc(50%-8px)]">
                {wizardStore.wizardScenario
                  .filter(it => it.position === 'right')
                  .map(renderCard)}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
)
