import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import zoneStore from '@store/ws/zone'
import { ZoneButtons } from './components/zone-buttons'
import { ZonePopover } from './components/zone-popover'

export const GenesListZone = observer(() => {
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null)

  const [searchValue, setSearchValue] = useState<string>('')

  const isPopoverOpen = !!popoverAnchor

  const closePopover = () => {
    setPopoverAnchor(null)
  }

  useEffect(() => {
    if (isPopoverOpen) {
      zoneStore.genesList.length <= 0 && zoneStore.fetchZoneListAsync('Panels')

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
        setPopoverAnchor={setPopoverAnchor}
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
