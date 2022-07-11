import styles from '../build-flow.module.css'

import { ReactElement, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { datasetStore } from '@store/dataset'
import { Card } from '@ui/card'
import selectedDatasetStore from '../../selected-dataset.store'
import { CardListSection } from './card-sections/card-list-section'
import { CardRadioListSection } from './card-sections/card-radio-list-section'

export const BuildFlowRightColumn = observer((): ReactElement => {
  const { currentStepData } = selectedDatasetStore
  const history = useHistory()
  const dsName =
    selectedDatasetStore.selectedSecondaryDataset || datasetStore.datasetName

  const [maxHeight, setMaxHeight] = useState<string | number>(0)
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const rightColumn = divRef.current

    if (rightColumn && rightColumn?.children.length > 1) {
      setMaxHeight('calc(80vh - 507px')
    } else {
      setMaxHeight('calc(100vh - 328px')
    }
  }, [currentStepData])

  return (
    <div className={styles.buildFlow__column} ref={divRef}>
      {currentStepData?.map((data, index) => {
        const isEditDisabled =
          !currentStepData[index + 1] || currentStepData[index + 1].hidden

        return (
          !data.hidden &&
          index > 1 && (
            <Card
              key={data.title}
              className={cn(
                index !== 2 && 'mt-4',
                data.type === 'list' && 'px-0',
              )}
            >
              {data.type === 'radioList' ? (
                <CardRadioListSection
                  title={dsName}
                  optionsList={data.optionsList}
                  description={data.description}
                  isEditDisabled={isEditDisabled}
                  isContinueDisabled={isEditDisabled}
                  checkedValue={data.value}
                  onEdit={() => selectedDatasetStore.hideNextSteps(index)}
                  onContinue={item =>
                    selectedDatasetStore.continueEditWizardData(index, item)
                  }
                  onOpen={item =>
                    selectedDatasetStore.openNextPage(history, item)
                  }
                />
              ) : (
                <CardListSection
                  title={data.title}
                  optionsList={
                    data.optionsList || selectedDatasetStore.secondaryDatasets
                  }
                  onSelect={value => selectedDatasetStore.setPreset(value)}
                  isSpecial={data.isSpecial}
                  selectedItem={selectedDatasetStore.selectedPreset}
                  onOpen={() => selectedDatasetStore.openNextPage(history)}
                  style={
                    data.title === 'Relevant presets'
                      ? { maxHeight: 'calc(100vh - 267px)' }
                      : { maxHeight: maxHeight }
                  }
                />
              )}
            </Card>
          )
        )
      })}
    </div>
  )
})
