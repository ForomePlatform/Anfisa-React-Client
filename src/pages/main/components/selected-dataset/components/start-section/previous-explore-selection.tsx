import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { CardTitle } from '@ui/card'

export const PreviousExploreSelection = observer((): ReactElement => {
  return (
    <>
      <CardTitle text={'You previously worked with'} className="text-16" />

      <div className="mt-1 text-14 text-grey-dark">
        In this section your previous work will be displayed.
      </div>
    </>
  )
})
