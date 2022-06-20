import { ReactElement } from 'react'
import { useHistory } from 'react-router'
import { observer } from 'mobx-react-lite'

import { useParams } from '@core/hooks/use-params'
import { SessionStoreManager } from '@core/storage-management/session-store-manager'
import { t } from '@i18n'
import filterStore from '@store/filter'
import { Routes } from '@router/routes.enum'
import { Button } from '@ui/button'
import { GlbPagesNames } from '@glb/glb-names'
import { FILTER_REFERRER } from '@pages/filter/common/filter-control/filter-control.const'

export const EditFilter = observer((): ReactElement => {
  const histroy = useHistory()
  const params = useParams()

  const handleClick = () => {
    SessionStoreManager.write(FILTER_REFERRER, GlbPagesNames.Table)
    histroy.push(`${Routes.Refiner}?ds=${params.get('ds')}`)
    filterStore.setMethod(GlbPagesNames.Refiner)
  }

  return (
    <div style={{ minWidth: '114px' }}>
      <Button
        text={t('ds.editFilters')}
        size="md"
        className="w-full justify-around text-14"
        onClick={handleClick}
      />
    </div>
  )
})
