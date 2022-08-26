import styles from './dashboard-header.module.css'

import { ReactElement, useMemo } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { ViewTypeDashboard } from '@core/enum/view-type-dashboard-enum'
import { t } from '@i18n'
import { Icon } from '@ui/icon'
import { InputSearch } from '@ui/input'
import { Switch } from '@ui/switch'
import { UnitsViewSwitch } from '@components/units-list/units-list-controls/components'
import dashboardStore from '../../../dashboard'

export const DashboardHeader = observer((): ReactElement => {
  const {
    viewType,
    toggleViewType,
    showInCharts,
    filterValue,
    setFilterValue,
    toggleAll,
    mainTabs,
    toggleCharts,
  } = dashboardStore

  const isAllTabsOpened = useMemo(
    () => !mainTabs.some(tab => !tab.isOpen),
    [mainTabs],
  )

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
            {t('dashboard.showCharts')}
          </div>
        </div>

        <div className="flex-1 mr-px">
          <InputSearch
            onChange={e => setFilterValue(e.target.value)}
            value={filterValue}
            placeholder={t('dashboard.searchForAField')}
            variant="primary-dark"
            size="m"
          />
        </div>

        <button
          className={styles.header__controls__button}
          onClick={() => toggleAll(!isAllTabsOpened)}
        >
          <Icon
            name={isAllTabsOpened ? 'Collapse' : 'Expand'}
            size={20}
            className="text-grey-blue hover:text-blue-bright"
          />
        </button>
      </div>
    </div>
  )
})
