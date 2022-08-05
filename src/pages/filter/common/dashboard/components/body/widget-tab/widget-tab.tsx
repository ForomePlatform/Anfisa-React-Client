import styles from './widget-tab.module.css'

import { ReactElement, useMemo } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { DashboardGroupTypes } from '@core/enum/dashboard-group-types-enum'
import dashboardStore from '@pages/filter/common/dashboard'
import { IExtendedTUnitGroup } from '@pages/filter/common/dashboard/dashboard.interfaces'
import { WidgetSubTab } from './components/widget-sub-tab'
import { WidgetTabHeader } from './components/widget-tab-header'

export interface IWidgetTabProps {
  group: IExtendedTUnitGroup
  index: number
}

export const WidgetTab = observer(
  ({ group, index }: IWidgetTabProps): ReactElement => {
    const { changeTabPlace, filterValue, toggleGroup } = dashboardStore

    const isGroupInSearch = useMemo(() => {
      const value = filterValue.toLowerCase()
      return group.units.some(unit => unit.name.toLowerCase().includes(value))
    }, [group, filterValue])

    return (
      <>
        <div
          className={cn(styles.tab, !isGroupInSearch && styles.tab_disabled)}
          onClick={() =>
            changeTabPlace(DashboardGroupTypes.Main, group.name, index)
          }
        >
          <WidgetTabHeader
            group={group}
            isAllTabsOpened={group.isOpen}
            onToggle={() => toggleGroup(group.name)}
          />
        </div>

        {group.units.map(unit => (
          <div key={unit.name} data-drag-handle={true}>
            <WidgetSubTab unit={unit} groupName={group.name} />
          </div>
        ))}
      </>
    )
  },
)
