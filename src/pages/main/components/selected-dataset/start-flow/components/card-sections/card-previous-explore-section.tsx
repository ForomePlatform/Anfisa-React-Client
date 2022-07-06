import { ReactElement } from 'react'

import { t } from '@i18n'
import { CardTitle } from '@ui/card'

export const CardPreviousExploreSection = (): ReactElement => (
  <div className="w-1/2">
    <CardTitle text={t('home.startFlow.prevWorkWith')} className="text-16" />

    <div className="mt-1 text-14 text-grey-dark">
      {t('home.startFlow.prevWorkSection')}
    </div>
  </div>
)
