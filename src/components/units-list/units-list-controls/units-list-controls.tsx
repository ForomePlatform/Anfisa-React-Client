import styles from './units-list-controls.module.css'

import { ReactElement } from 'react'
import cn from 'classnames'

import { ViewTypeDashboard } from '@core/enum/view-type-dashboard-enum'
import { t } from '@i18n'
import { Icon } from '@ui/icon'
import { InputSearch } from '@components/input-search'
import { DecisionTreesResultsDataCy } from '@data-testid'
import { UnitsViewSwitch } from './components'

interface IUnitsListControlsProps {
  className?: string
  filterValue: string
  isAllCollapsed: boolean
  isListView: boolean
  onToggleViewType: (viewType: ViewTypeDashboard) => void
  onToggleListSize: () => void
  onFilterValueChange: (value: string) => void
}

export const UnitsListControls = ({
  className,
  filterValue,
  isListView,
  isAllCollapsed,
  onToggleViewType,
  onToggleListSize,
  onFilterValueChange,
}: IUnitsListControlsProps): ReactElement => (
  <div className={cn(styles.controls, className)}>
    <InputSearch
      dataTestId={DecisionTreesResultsDataCy.searchResults}
      className={styles.controls__search}
      placeholder={t('filter.searchForAField')}
      value={filterValue}
      onChange={e => onFilterValueChange(e.target.value)}
    />

    <button
      className={styles.controls__button_listSize}
      onClick={onToggleListSize}
    >
      <Icon name={isAllCollapsed ? 'Expand' : 'Collapse'} size={20} />
    </button>

    <UnitsViewSwitch
      isListView={isListView}
      onToggleViewType={onToggleViewType}
    />
  </div>
)
