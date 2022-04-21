import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import datasetStore from '@store/dataset'
import zoneStore from '@store/filterZone'
import { PopperTableModal } from '@components/popper-table-modal'
import { FilterItemList } from './control-panel-filter-item-list'

interface ITagsModalProps {
  close: () => void
  title?: string
}

export const TagsModal = observer(({ close, title }: ITagsModalProps) => {
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    datasetStore.fetchTagSelectAsync()

    if (zoneStore.selectedTags.length > 0) {
      zoneStore.syncSelectedAndLocalFilters('isTags')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleApplyAsync = async () => {
    close()

    zoneStore.createSelectedZoneFilter('isTags')

    if (zoneStore.isModeNOT) {
      datasetStore.addZone(['_tags', zoneStore.selectedTags, false])
    } else {
      datasetStore.addZone(['_tags', zoneStore.selectedTags])
    }

    if (zoneStore.isModeWithNotes) {
      datasetStore.addZone(['_tags', [...zoneStore.selectedTags, '_note']])
    }

    await datasetStore.fetchWsListAsync(datasetStore.isXL)

    datasetStore.fetchFilteredTabReportAsync()
  }

  const onClearAll = () => {
    zoneStore.unselectAllTags()
  }

  return (
    <PopperTableModal
      title={title}
      searchInputPlaceholder={t('ds.searchFilter')}
      onClose={close}
      searchValue={searchValue}
      onApply={handleApplyAsync}
      onChange={setSearchValue}
      onClearAll={onClearAll}
      className="mt-7"
      isTags={true}
    >
      <FilterItemList
        items={datasetStore.tags.filter(item =>
          item.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
        )}
        isTags={true}
      />
    </PopperTableModal>
  )
})
