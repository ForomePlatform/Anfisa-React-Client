import styles from './units-list-controls.module.css'

import { ReactElement } from 'react'
import cn from 'classnames'

import { ViewTypeDashboard } from '@core/enum/view-type-dashboard-enum'
import { t } from '@i18n'
import { Icon } from '@ui/icon'
import { InputSearch } from '@components/input-search'
import { DecisionTreesResultsDataCy } from '@data-testid'

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
      className={styles.controls__button__listSize}
      onClick={onToggleListSize}
    >
      <Icon name={isAllCollapsed ? 'Expand' : 'Collapse'} size={20} />
    </button>

    <button
      className={cn(
        styles.controls__buttonView,
        styles.controls__buttonView__list,
        isListView && styles.controls__buttonView_active,
      )}
      onClick={() => onToggleViewType(ViewTypeDashboard.List)}
    >
      <div className={cn(styles.controls__buttonView__content)}>
        <Icon name="List" size={16} />
      </div>
    </button>

    <button
      className={cn(
        styles.controls__buttonView,
        styles.controls__buttonView__tile,
        !isListView && styles.controls__buttonView_active,
      )}
      onClick={() => onToggleViewType(ViewTypeDashboard.Tile)}
    >
      <div className={cn(styles.controls__buttonView__content)}>
        <Icon name="Tile" />
      </div>
    </button>
  </div>
)
