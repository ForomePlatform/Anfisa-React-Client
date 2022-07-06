import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { usePopover } from '@core/hooks/use-popover'
import { t } from '@i18n'
import zoneStore from '@store/ws/zone.store'
import { ZoneButtons } from './components/zone-buttons'
import { ZonePopover } from './components/zone-popover'

export const SamplesZone = observer(() => {
  const { popoverAnchor, isPopoverOpen, onToggle, closePopover } = usePopover()

  const [searchValue, setSearchValue] = useState<string>('')

  useEffect(() => {
    if (isPopoverOpen) {
      if (zoneStore.selectedSamples.length > 0) {
        zoneStore.syncSelectedAndLocalFilters('isSamples')
      }
    }
  }, [isPopoverOpen])

  const handleApply = () => {
    zoneStore.createSelectedZoneFilter('isSamples')
    zoneStore.addZone(['Has_Variant', zoneStore.selectedSamples])
    setSearchValue('')

    closePopover()
  }

  const handleClose = () => {
    closePopover()
    zoneStore.unselectAllSamples()

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
        onShowPopover={onToggle}
        onRemove={zoneStore.removeSample}
      />

      <ZonePopover
        isFetching={zoneStore.fetchingSamples}
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
