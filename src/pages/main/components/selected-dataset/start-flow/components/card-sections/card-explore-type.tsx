import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { Card } from '@ui/card'
import { CardPreviousExploreSection } from './card-previous-explore-section'
import { CardStartExploreSection } from './card-start-explore-section'

export const CardExploreType = observer((): ReactElement => {
  return (
    <Card className="w-full mt-4 bg-grey-tertiary">
      <div className="flex">
        <CardStartExploreSection />

        <CardPreviousExploreSection />
      </div>
    </Card>
  )
})
