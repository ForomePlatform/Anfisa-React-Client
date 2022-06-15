import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import zoneStore from '@store/ws/zone.store'
import { ZoneButtons } from './components/zone-buttons'
import { ZonePopover } from './components/zone-popover'

export const TagsZone = observer(() => {
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null)

  const [searchValue, setSearchValue] = useState<string>('')

  const isPopoverOpen = !!popoverAnchor

  const closePopover = () => {
    setPopoverAnchor(null)
  }

  useEffect(() => {
    if (isPopoverOpen) {
      zoneStore.fetchZoneTagsAsync()

      if (zoneStore.selectedTags.length > 0) {
        zoneStore.syncSelectedAndLocalFilters('isTags')
      }
    }
  }, [isPopoverOpen])

  const handleApply = () => {
    zoneStore.createSelectedZoneFilter('isTags')

    const tags = zoneStore.isModeWithNotes
      ? [...zoneStore.selectedTags, '_note']
      : zoneStore.selectedTags

    if (zoneStore.isModeNOT) {
      zoneStore.addZone(['_tags', tags, false])
    } else {
      zoneStore.addZone(['_tags', tags])
    }

    setSearchValue('')

    closePopover()
  }

  const handleClose = () => {
    closePopover()
    zoneStore.unselectAllTags()
    setSearchValue('')

    if (zoneStore.selectedTags.length > 0) {
      zoneStore.syncSelectedAndLocalFilters('isTags')
    }
  }

  return (
    <>
      <ZoneButtons
        title={t('ds.tags')}
        selectedZoneItems={zoneStore.selectedTags}
        isOpen={isPopoverOpen}
        onClose={handleClose}
        setPopoverAnchor={setPopoverAnchor}
        onRemove={zoneStore.removeLocalTag}
        isLast
      />

      <ZonePopover
        zoneList={zoneStore.tags}
        title={t('ds.tags')}
        selectedZoneItems={zoneStore.localTags}
        searchValue={searchValue}
        anchorEl={popoverAnchor}
        isOpen={isPopoverOpen}
        onChange={e => setSearchValue(e.target.value)}
        onAdd={zoneStore.addLocalTag}
        onRemove={zoneStore.removeLocalTag}
        onApply={handleApply}
        onClearAll={zoneStore.unselectAllTags}
        onClose={handleClose}
        isTags
      />
    </>
  )
})
