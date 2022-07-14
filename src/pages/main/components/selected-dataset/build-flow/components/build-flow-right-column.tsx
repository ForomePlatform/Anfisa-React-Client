import styles from '../build-flow.module.css'

import { ReactElement, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import wizardStore from './wizard/wizard.store'

export const BuildFlowRightColumn = observer((): ReactElement => {
  const { wizardScenario } = wizardStore
  const divRef = useRef<HTMLDivElement>(null)

  return (
    <div className={styles.buildFlow__column} ref={divRef}>
      {wizardScenario.map((scenario, index) => {
        const Component = () =>
          scenario.component({
            id: scenario.id,
            continueDisabled: scenario.continueDisabled,
            editDisabled: scenario.editDisabled,
            contentDisabled: scenario.contentDisabled,
            selectedValue: scenario.value,
            title: scenario.title,
            maxHeight: scenario.maxHeight,
          })
        return (
          index > 1 && !scenario.hidden && <Component key={scenario.value} />
        )
      })}
    </div>
  )
})
