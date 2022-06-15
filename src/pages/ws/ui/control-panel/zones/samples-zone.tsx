import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import zoneStore from '@store/ws/zone.store'
import { ZoneButtons } from './components/zone-buttons'
import { ZonePopover } from './components/zone-popover'

export const SamplesZone = observer(() => {
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null)

  const [searchValue, setSearchValue] = useState<string>('')

  const isPopoverOpen = !!popoverAnchor

  const closePopover = () => {
    setPopoverAnchor(null)
  }

  useEffect(() => {
    if (isPopoverOpen) {
      zoneStore.samples.length <= 0 && zoneStore.fetchZoneSamplesAsync()

      if (zoneStore.selectedSamples.length > 0) {
        zoneStore.syncSelectedAndLocalFilters('isSamples')
      }
    }
  }, [isPopoverOpen])

  const handleApply = () => {
    zoneStore.createSelectedZoneFilter('isSamples')
    zoneStore.addZone(['Has_Variant', zoneStore.selectedSamples])
    zoneStore.paintSelectedSamples()
    setSearchValue('')

    closePopover()
  }

  const handleClose = () => {
    closePopover()
    zoneStore.unselectAllSamples('clearAll')

    setSearchValue('')

    if (zoneStore.selectedSamples.length > 0) {
      zoneStore.syncSelectedAndLocalFilters('isSamples')
    }
  }

  return (
    <>
      <ZoneButtons
        title={t('ds.samples')}
        selectedZoneItems={zoneStore.selectedSamples}
        isOpen={isPopoverOpen}
        onClose={handleClose}
        setPopoverAnchor={setPopoverAnchor}
        onRemove={zoneStore.removeSample}
      />

      <ZonePopover
        zoneList={zoneStore.samples}
        title={t('ds.samples')}
        selectedZoneItems={zoneStore.localSamples}
        searchValue={searchValue}
        anchorEl={popoverAnchor}
        isOpen={isPopoverOpen}
        onChange={e => setSearchValue(e.target.value)}
        onAdd={zoneStore.addSample}
        onRemove={zoneStore.removeSample}
        onApply={handleApply}
        onClearAll={zoneStore.unselectAllSamples}
        onClose={handleClose}
      />
    </>
  )
})
