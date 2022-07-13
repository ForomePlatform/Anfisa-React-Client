import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { usePopover } from '@core/hooks/use-popover'
import { t } from '@i18n'
import zoneStore from '@store/ws/zone.store'
import { MainTableDataCy } from '@data-testid'
import { ZoneButtons } from './components/zone-buttons'
import { ZonePopover } from './components/zone-popover'

export const GenesZone = observer(() => {
  const { popoverAnchor, isPopoverOpen, onToggle, closePopover } = usePopover()

  const [searchValue, setSearchValue] = useState<string>('')

  useEffect(() => {
    if (isPopoverOpen) {
      if (zoneStore.selectedGenes.length > 0) {
        zoneStore.syncSelectedAndLocalFilters('isGenes')
      }
    }
  }, [isPopoverOpen])

  const handleApply = () => {
    zoneStore.createSelectedZoneFilter('isGenes')
    zoneStore.addZone(['Symbol', zoneStore.selectedGenes])
    setSearchValue('')

    closePopover()
  }

  const handleClose = () => {
    closePopover()
    zoneStore.unselectAllGenes()
    setSearchValue('')

    if (zoneStore.selectedGenes.length > 0) {
      zoneStore.syncSelectedAndLocalFilters('isGenes')
    }
  }

  return (
    <>
      <ZoneButtons
        title={t('ds.gene')}
        selectedZoneItems={zoneStore.selectedGenes}
        isOpen={isPopoverOpen}
        dataTestId={MainTableDataCy.addGene}
        onClose={handleClose}
        onShowPopover={onToggle}
        onRemove={zoneStore.removeGene}
      />

      <ZonePopover
        isFetching={zoneStore.fetchingGenes}
        zoneList={zoneStore.genes}
        title={t('ds.gene')}
        selectedZoneItems={zoneStore.localGenes}
        searchValue={searchValue}
        anchorEl={popoverAnchor}
        isOpen={isPopoverOpen}
        onChange={e => setSearchValue(e.target.value)}
        onAdd={zoneStore.addGene}
        onRemove={zoneStore.removeGene}
        onApply={handleApply}
        onClearAll={zoneStore.unselectAllGenes}
        onClose={handleClose}
      />
    </>
  )
})
