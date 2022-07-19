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
  const isOpen = modalsVisibilityStore.isSelectAttributeDialogVisible

  const [readScrollPosition, writeScrollPosition] = useScrollPosition({
    elem: '#attributes-container',
    storageId: 'attributesModalScrollPos',
  })

  useEffect(() => {
    readScrollPosition()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const onClose = () => {
    modalsVisibilityStore.closeSelectAttributeDialog()
    writeScrollPosition({ top: 0 })
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
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
