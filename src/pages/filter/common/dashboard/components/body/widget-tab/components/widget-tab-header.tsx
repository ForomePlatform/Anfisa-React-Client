import styles from '../widget-tab.module.css'

import { ReactElement } from 'react'

import { DashboardGroupTypes } from '@core/enum/dashboard-group-types-enum'
import { Divider } from '@ui/divider'
import { Icon } from '@ui/icon'
import { FnLabel } from '@components/fn-label'
import { PredictionPowerIndicator } from '@components/prediction-power-indicator'
import { IWidgetTabHeaderProps } from '@pages/filter/common/dashboard/dashboard.interfaces'

export const WidgetTabHeader = ({
  group,
  index,
  isAllTabsOpened,
  onChange,
  onToggle,
}: IWidgetTabHeaderProps): ReactElement => (
  <div className={styles.tab__header}>
    <div className="flex items-center">
      {group.name === 'Functional Units' ? (
        <FnLabel className="mr-2" />
      ) : (
        <PredictionPowerIndicator
          className="mr-2 rounded"
          value={group.power || 0}
        />
      )}

      <div
        className={styles.tab__header__title}
        onClick={() => {
          onChange({
            groupType: DashboardGroupTypes.Main,
            groupName: group.name,
            groupIndex: index,
          })
        }}
      >
        {group.name}
      </div>
    </div>

    <div
      className={styles.tab__header__controls}
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      <Icon
        name="Favorites"
        className="text-grey-blue hover:text-yellow-secondary"
      />

      <Divider
        spacing="min"
        orientation="vertical"
        color="light-blue"
        className="w-px"
      />

      <Icon
        name={isAllTabsOpened ? 'Collapse' : 'Expand'}
        onClick={onToggle}
        className="text-grey-blue hover:text-blue-bright"
      />
    </div>
  </div>
)
