import { ReactElement, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { useScrollPosition } from '@core/hooks/use-scroll-position'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Dialog } from '@ui/dialog'
import { DtreeUnitsList } from '@pages/filter/dtree/components/dtree-units-list'
import modalsVisibilityStore from '../modals-visibility-store'

export const SelectAttributeDialog = observer((): ReactElement => {
  const { isLoading } = dtreeStore.stat

  const [readScrollPosition] = useScrollPosition({
    elem: '#attributes-container',
    storageId: 'attributesModalScrollPos',
  })

  const handleClose = () => {
    modalsVisibilityStore.closeSelectAttributeDialog()
    dtreeStore.resetFilterModalValue()
  }

  useEffect(() => {
    readScrollPosition()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Dialog
      isOpen={modalsVisibilityStore.isSelectAttributeDialogVisible}
      onClose={handleClose}
      title={t('condition.selectAttribute')}
      width="m"
      style={{ top: '50%' }}
      isHiddenActions={true}
    >
      {isLoading ? (
        <div className="flex flex-1 justify-center w-full my-4">
          {t('dtree.loading')}
        </div>
      ) : (
        <DtreeUnitsList isModal listContainerId="attributes-container" />
      )}
    </Dialog>
  )
})
