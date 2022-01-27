import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { SelectedFilterCard } from './selected-filter-card'

export const QueryResults = observer(
  (): ReactElement => {
    const keys = Object.keys(filterStore.selectedFilters)

    const handleRemoveItem = (itemName: string, subGroupKey: string, title: string) => {
      datasetStore.resetActivePreset()

      filterStore.removeSelectedFilters({
        group: subGroupKey,
        groupItemName: title,
        variant: [itemName, 0],
      })

      datasetStore.removeCondition({
        subGroup: title,
        itemName,
      })

      if (!datasetStore.isXL) {
        datasetStore.fetchWsListAsync()
      }
    }

    if (keys.length === 0) {
      return (
        <div style={{ height: 'calc(100vh - 223px)' }} className="w-full flex justify-center items-center">
          <p className="leading-16px text-grey-blue">{t('general.noResultsFound')}</p>
        </div>
      )
    }

    return (
      <div className="overflow-y-scroll" style={{ height: 'calc(100vh - 280px)' }}>
        {keys.map(subGroupKey => (
          <div key={subGroupKey} className="flex flex-col">
            {Object.keys(filterStore.selectedFilters[subGroupKey]).map(title => (
              <SelectedFilterCard
                key={title}
                title={title}
                filters={filterStore.selectedFilters[subGroupKey][title]}
                onRemove={itemName => handleRemoveItem(itemName, subGroupKey, title)}
              />
            ))}
          </div>
        ))}
      </div>
    )
  },
)
