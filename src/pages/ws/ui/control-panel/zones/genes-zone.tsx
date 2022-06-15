import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import zoneStore from '@store/ws/zone'
import { MainTableDataCy } from '@components/data-testid/main-table.cy'
import { ZoneButtons } from './components/zone-buttons'
import { ZonePopover } from './components/zone-popover'

export const GenesZone = observer(() => {
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null)

  const [searchValue, setSearchValue] = useState<string>('')

  const isPopoverOpen = !!popoverAnchor

  const closePopover = () => {
    setPopoverAnchor(null)
  }

  useEffect(() => {
    if (isPopoverOpen) {
      zoneStore.genes.length <= 0 && zoneStore.fetchZoneListAsync('Symbol')

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
        setPopoverAnchor={setPopoverAnchor}
        onRemove={zoneStore.removeGene}
      />

      <ZonePopover
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
