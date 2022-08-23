import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { SortDatasets } from '@core/enum/sort-datasets.enum'
import { t } from '@i18n'
import { theme } from '@theme'
import dirinfoStore from '@store/dirinfo'
import { InputSearch } from '@ui/input'
import { FilterDatasetDataCy } from '@data-testid'
import { SortItem } from './sort-item'

export const FilterSortDatasets = observer(
  (): ReactElement => (
    <div className="mb-2 px-4">
      <div className="border-b border-blue-secondary">
        <InputSearch
          dataTestId={FilterDatasetDataCy.searchInput}
          placeholder={t('home.searchForADataset')}
          value={dirinfoStore.filterValue}
          style={{
            backgroundColor: theme('colors.blue.secondary'),
          }}
          size="m"
          variant="primary-dark"
          onChange={e => {
            dirinfoStore.setFilterValue(e.target.value)
          }}
        />

        <div className="flex justify-between mt-2.5 mb-1.5">
          <SortItem text={t('home.name')} sortType={SortDatasets.Name} />

          <SortItem
            text={t('home.createdAt')}
            sortType={SortDatasets.CreatedAt}
          />
        </div>
      </div>
    </div>
  ),
)
