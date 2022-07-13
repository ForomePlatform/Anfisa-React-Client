import styles from '../build-flow.module.css'

import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import selectedDatasetCardsStore from '../../selected-dataset-cards.store'

export const BuildFlowLeftColumn = observer((): ReactElement => {
  const { wizardScenario } = selectedDatasetCardsStore

  return (
    <div
      className={cn(styles.buildFlow__column, styles.buildFlow__column_left)}
    >
      {wizardScenario.map((scenario, index) => {
        const Component = () =>
          scenario.component({
            continueDisabled: scenario.continueDisabled,
            editDisabled: scenario.editDisabled,
            contentDisabled: scenario.contentDisabled,
            selectedValue: scenario.value,
          })
        return (
          index < 2 && !scenario.hidden && <Component key={scenario.value} />
        )
      })}
    </div>
  )
})
