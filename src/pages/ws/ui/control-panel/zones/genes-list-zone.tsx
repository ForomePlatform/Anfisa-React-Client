import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { usePopover } from '@core/hooks/use-popover'
import { t } from '@i18n'
import zoneStore from '@store/ws/zone.store'
import { ZoneButtons } from './components/zone-buttons'
import { ZonePopover } from './components/zone-popover'

export const GenesListZone = observer(() => {
  const { popoverAnchor, isPopoverOpen, onToggle, closePopover } = usePopover()

  const [searchValue, setSearchValue] = useState<string>('')

  useEffect(() => {
    if (isPopoverOpen) {
      if (zoneStore.selectedGenesList.length > 0) {
        zoneStore.syncSelectedAndLocalFilters('isGenesList')
      }
    }
  }, [isPopoverOpen])

  const handleApply = () => {
    zoneStore.createSelectedZoneFilter('isGenesList')
    zoneStore.addZone(['Panels', zoneStore.selectedGenesList])
    setSearchValue('')

    closePopover()
  }

  const handleClose = () => {
    closePopover()
    zoneStore.unselectAllGenesList()
    setSearchValue('')

    if (zoneStore.selectedGenesList.length > 0) {
      zoneStore.syncSelectedAndLocalFilters('isGenesList')
    }
  }

  return (
    <>
      <ZoneButtons
        title={t('ds.geneList')}
        selectedZoneItems={zoneStore.selectedGenesList}
        isOpen={isPopoverOpen}
        onClose={handleClose}
        onShowPopover={onToggle}
        onRemove={zoneStore.removeGenesList}
      />

      <ZonePopover
        zoneList={zoneStore.genesList}
        title={t('ds.geneList')}
        selectedZoneItems={zoneStore.localGenesList}
        searchValue={searchValue}
        anchorEl={popoverAnchor}
        isOpen={isPopoverOpen}
        onChange={e => setSearchValue(e.target.value)}
        onAdd={zoneStore.addGenesList}
        onRemove={zoneStore.removeGenesList}
        onApply={handleApply}
        onClearAll={zoneStore.unselectAllGenesList}
        onClose={handleClose}
      />
    </>
  )
})
