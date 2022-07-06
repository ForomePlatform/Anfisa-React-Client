import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { Card } from '@ui/card'
import selectedDatasetStore from '../../../selected-dataset.store'
import { CardPreviousExploreSection } from './card-previous-explore-section'
import { CardStartExploreSection } from './card-start-explore-section'

export const CardExploreType = observer((): ReactElement => {
  const handleContinue = () => {
    selectedDatasetStore.toggleIsBuildFlowVisible(true)
    selectedDatasetStore.toggleIsEditionExploreType(false)
  }

  return (
    <Card className="w-full mt-4 bg-grey-tertiary">
      <div className="flex">
        <CardStartExploreSection onContinue={handleContinue} />

        <CardPreviousExploreSection />
      </div>
    </Card>
  )
})
