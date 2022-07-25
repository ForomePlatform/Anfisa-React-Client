import { ReactElement } from 'react'

import { t } from '@i18n'
import { CardTitle } from '@ui/card'
import { InfoList } from './components/info-list'

export const DatasetGeneral = (): ReactElement => {
  return (
    <div className="text-sm">
      <CardTitle
        text={t('home.general')}
        className="mr-3 mb-3 px-4 break-words"
        style={{ maxWidth: 'calc(100% - 140px)' }}
      />

      <InfoList />
    </div>
  )
}
