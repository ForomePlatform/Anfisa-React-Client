import styles from './dashboard-header.module.css'

import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { ViewTypeDashboard } from '@core/enum/view-type-dashboard-enum'
import { t } from '@i18n'
import { Icon } from '@ui/icon'
import { Switch } from '@ui/switch'
import { InputSearch } from '@components/input-search'
import { UnitsViewSwitch } from '@components/units-list/units-list-controls/components'
import dashboardStore from '../../../dashboard'

interface IDashboardHeaderProps {
  filterValue: string
  onChange: (value: string) => void
}

export const DashboardHeader = observer(
  ({ filterValue, onChange }: IDashboardHeaderProps): ReactElement => {
    const { viewType, toggleViewType, showInCharts, setInCharts } =
      dashboardStore

    const toggleCharts = () => setInCharts(!showInCharts)

    const onExpand = () => {
      // TODO
    }

    return (
      <div className={styles.header}>
        <div className={styles.header__container}>
          <div className={styles.header__title}>{t('dashboard.dashboard')}</div>

          <div className={cn(styles.header__container, 'ml-1')}>
            <UnitsViewSwitch
              isListView={viewType === ViewTypeDashboard.List}
              onToggleViewType={toggleViewType}
            />
          </div>
        </div>

        <div className={styles.header__container} style={{ width: 626 }}>
          <div className={cn(styles.header__container, 'mr-6')}>
            <Switch isChecked={showInCharts} onChange={toggleCharts} />

            <div
              className={styles.header__controls__switch}
              onClick={toggleCharts}
            >
              {t('dashboard.showInCharts')}
            </div>
          </div>

          <InputSearch
            onChange={e => onChange(e.target.value)}
            value={filterValue}
            placeholder={t('dashboard.searchForAField')}
            className="flex-1 mr-px"
            isDarkBg
            big
          />

          <button
            className={styles.header__controls__button}
            onClick={onExpand}
          >
            <Icon name="Expand" size={20} className="text-grey-blue" />
          </button>
        </div>
      </div>
    )
  },
)
