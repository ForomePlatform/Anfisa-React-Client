import styles from './build-flow.module.css'

import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { BuildFlowHeader } from './components/build-flow-header'
import wizardStore from './components/wizard/wizard.store'

export const SelectedDatasetBuildFlow = observer(
  ({ goBack }: { goBack: () => void }): ReactElement => {
    const handleGoBack = () => {
      goBack()
      wizardStore.resetWizard()
    }

    return (
      <div className={styles.buildFlow}>
        <div className={styles.buildFlow__container}>
          <BuildFlowHeader goBack={handleGoBack} />

          <div>
            {wizardStore.wizardScenario
              .filter(it => it.position !== 'left' && it.position !== 'right')
              .map(({ component, ...rest }) => {
                const Component = () =>
                  component({
                    ...rest,
                  })
                return !rest.hidden && <Component key={rest.id} />
              })}
            <div className="flex">
              <div className="w-[calc(50%-8px)]">
                {wizardStore.wizardScenario
                  .filter(it => it.position === 'left')
                  .map(({ component, ...rest }) => {
                    const Component = () =>
                      component({
                        ...rest,
                      })
                    return !rest.hidden && <Component key={rest.id} />
                  })}
              </div>
              <div className="ml-4 w-[calc(50%-8px)]">
                {wizardStore.wizardScenario
                  .filter(it => it.position === 'right')
                  .map(({ component, ...rest }) => {
                    const Component = () =>
                      component({
                        ...rest,
                      })
                    return !rest.hidden && <Component key={rest.id} />
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
)
