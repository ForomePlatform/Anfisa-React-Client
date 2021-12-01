import { ReactElement } from 'react'

import { FilterRefinerGroups } from './filter-refiner-groups'
import { QuerySelected } from './query-selected'
import { SelectedGroup } from './selected-group'

export const FilterRefiner = (): ReactElement => {
  // in case if will be needed
  // datasetStore.fetchDsStatAsync()
  // datasetStore.fetchWsListAsync()

  return (
    <div
      className="flex overflow-y-hidden"
      style={{ maxHeight: 'calc(100vh - 201px)' }}
    >
      <FilterRefinerGroups />

      <SelectedGroup />

      <QuerySelected />
    </div>
  )
}
