import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { SelectedFilterCard } from './selected-filter-card'

export interface IHandleRemoveFilterProps {
  filterId: string
  subFilterIdx: number
  filterType: string
}

export const QueryResults = observer((): ReactElement => {
  const selectedFilters = filterStore.selectedFiltersArray

  const handleRemoveFilter = ({
    filterId,
    subFilterIdx,
    filterType,
  }: IHandleRemoveFilterProps) => {
    datasetStore.resetActivePreset()

    filterStore.removeFilterFromFilterBlock({
      filterId,
      subFilterIdx,
      filterType,
    })

    datasetStore.fetchDsStatAsync()

    if (!datasetStore.isXL) {
      datasetStore.fetchWsListAsync()
    }
  }

  if (selectedFilters.length === 0) {
    return (
      <div
        style={{ height: 'calc(100vh - 223px)' }}
        className="w-full flex justify-center items-center"
      >
        <p className="leading-16px text-grey-blue">
          {t('general.noResultsFound')}
        </p>
      </div>
    )
  }

  return (
    <div
      className="overflow-y-scroll"
      style={{ height: 'calc(100vh - 280px)' }}
    >
      {selectedFilters.map(([filterId, filterCondition]) => (
        <div key={filterId} className="flex flex-col">
          <SelectedFilterCard
            filterId={filterId}
            filterCondition={filterCondition}
            handleRemoveFilter={handleRemoveFilter}
          />
        </div>
      ))}
    </div>
  )
})
