import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { Card } from '@ui/card'
import { startWithOptionsList } from '../../selected-dataset.constants'
import selectedDatasetStore from '../../selected-dataset.store'
import { CardRadioSection } from './card-radio-section'
import { PreviousExploreSelection } from './previous-explore-selection'

export const ChooseExploreSelection = observer((): ReactElement => {
  const handleContinue = () => {
    selectedDatasetStore.toggleIsStartFlowVisible(true)
    selectedDatasetStore.toggleIsEditionExploreType(false)
  }

  const isContinueDisabled = false

  const isEditDisabled = false

  const isRadioDisabled = !selectedDatasetStore.secondaryDatasets

  return (
    <Card className="w-full mt-4 bg-grey-tertiary">
      <div className="flex">
        <div className="w-1/2 pr-12">
          <CardRadioSection
            title={'Start with'}
            optionsList={startWithOptionsList}
            isContinueDisabled={isContinueDisabled}
            isEditDisabled={isEditDisabled}
            isRadioDisabled={isRadioDisabled}
            checkedValue={selectedDatasetStore.exploreType}
            onChange={value => selectedDatasetStore.setExploreType(value)}
            onContinue={handleContinue}
          />
        </div>

        <div className="w-1/2">
          <PreviousExploreSelection />
        </div>
      </div>
    </Card>
  )
})
