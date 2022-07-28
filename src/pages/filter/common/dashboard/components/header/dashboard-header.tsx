import styles from './dashboard-header.module.css'

import { ReactElement, useState } from 'react'
import cn from 'classnames'

import { ViewTypeDashboard } from '@core/enum/view-type-dashboard-enum'
import { t } from '@i18n'
import { Icon } from '@ui/icon'
import { Switch } from '@ui/switch'
import { InputSearch } from '@components/input-search'
import dashboardStore from '../../../dashboard'

export const DashboardHeader = (): ReactElement => {
  const handleSwitch = () => {
    //
  }

  const [searchValue, setSearchValue] = useState('')

  const onExpand = () => {
    //
  }
  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__title}>{t('dashboard.dashboard')}</div>

        <div className={cn(styles.header__container, 'ml-1')}>
          <button
            className={styles.header__controls__button}
            onClick={() =>
              dashboardStore.toggleViewType(ViewTypeDashboard.List)
            }
          >
            <Icon name="List" size={20} />
          </button>

          <button
            className={styles.header__controls__button}
            onClick={() =>
              dashboardStore.toggleViewType(ViewTypeDashboard.Tile)
            }
          >
            <Icon name="Gallery" size={20} />
          </button>
        </div>
      </div>

      <div className={styles.header__container} style={{ width: 626 }}>
        <div className={cn(styles.header__container, 'mr-6')}>
          <Switch isChecked={false} onChange={handleSwitch} />

          <div className={styles.header__controls__switch}>
            {t('dashboard.showInCharts')}
          </div>
        </div>

        <InputSearch
          onChange={e => setSearchValue(e.target.value)}
          value={searchValue}
          placeholder={t('dashboard.searchForAField')}
          className="flex-1 mr-px"
          isDarkBg
          big
        />

        <button className={styles.header__controls__button} onClick={onExpand}>
          <Icon name="Expand" size={20} className="text-grey-blue" />
        </button>
      </div>
    </div>
  )
}
