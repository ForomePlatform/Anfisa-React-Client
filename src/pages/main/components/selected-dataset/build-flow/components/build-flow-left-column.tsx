import styles from '../build-flow.module.css'

import { ReactElement } from 'react'
import { useHistory } from 'react-router'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { Card } from '@ui/card'
import selectedDatasetStore from '../../selected-dataset.store'
import { CardListSection } from './card-sections/card-list-section'
import { CardRadioListSection } from './card-sections/card-radio-list-section'

export const BuildFlowLeftColumn = observer((): ReactElement => {
  const { currentStepData } = selectedDatasetStore
  const history = useHistory()
  return (
    <div className={styles.buildFlow__column}>
      {currentStepData.map((data, index) => {
        const isContinueDisabled =
          !currentStepData[index + 1] || currentStepData[index + 1].hidden
        const isEditDisabled =
          index === 0
            ? !selectedDatasetStore.secondaryDatasets
            : isContinueDisabled
        return (
          !data.hidden &&
          index < 2 && (
            <Card
              key={data.title}
              className={cn(
                index !== 0 && 'mt-4',
                data.type === 'list' && 'px-0',
              )}
            >
              {data.type === 'radioList' ? (
                <CardRadioListSection
                  title={data.title}
                  optionsList={data.optionsList}
                  description={data.description}
                  isEditDisabled={isEditDisabled}
                  isContinueDisabled={isContinueDisabled}
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
                  optionsList={selectedDatasetStore.secondaryDatasets}
                  onSelect={value =>
                    selectedDatasetStore.selectDataset(value, index)
                  }
                  selectedItem={selectedDatasetStore.selectedSecondaryDataset}
                  style={{ maxHeight: 'calc(100vh - 405px)' }}
                />
              )}
            </Card>
          )
        )
      })}
    </div>
  )
})
