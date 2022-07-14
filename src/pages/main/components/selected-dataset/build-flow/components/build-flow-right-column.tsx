import styles from '../build-flow.module.css'

import { ReactElement, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import wizardStore from '../../wizard.store'

export const BuildFlowRightColumn = observer((): ReactElement => {
  const { wizardScenario } = wizardStore
  const divRef = useRef<HTMLDivElement>(null)

  // const history = useHistory()
  // const dsName =
  //   selectedDatasetStore.selectedSecondaryDataset || datasetStore.datasetName

  // const [maxHeight, setMaxHeight] = useState<string | number>(0)

  // useEffect(() => {
  //   const rightColumn = divRef.current

  //   if (rightColumn && rightColumn?.children.length > 1) {
  //     setMaxHeight('calc(80vh - 507px')
  //   } else {
  //     setMaxHeight('calc(100vh - 328px')
  //   }
  // }, [wizardScenario])

  return (
    <div className={styles.buildFlow__column} ref={divRef}>
      {wizardScenario.map((scenario, index) => {
        const Component = () =>
          scenario.component({
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
