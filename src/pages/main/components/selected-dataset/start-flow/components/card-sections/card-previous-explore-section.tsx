import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { CardTitle } from '@ui/card'

export const CardPreviousExploreSection = observer((): ReactElement => {
  return (
    <div className="w-1/2">
      <CardTitle text={'You previously worked with'} className="text-16" />

      <div className="mt-1 text-14 text-grey-dark">
        {t('home.startFlow.prevWorkSection')}
      </div>
    </div>
  )
})
