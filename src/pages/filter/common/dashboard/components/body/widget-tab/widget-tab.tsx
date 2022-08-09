import styles from './widget-tab.module.css'

import { ReactElement, useLayoutEffect, useMemo } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { DashboardGroupTypes } from '@core/enum/dashboard-group-types-enum'
import dashboardStore from '@pages/filter/common/dashboard'
import { IExtendedTUnitGroup } from '@pages/filter/common/dashboard/dashboard.interfaces'
import { tabId } from '@pages/filter/common/dashboard/dashboard.utils'
import { WidgetSubTab } from './components/widget-sub-tab'
import { WidgetTabHeader } from './components/widget-tab-header'

export interface IWidgetTabProps {
  group: IExtendedTUnitGroup
  index: number
}

export const WidgetTab = observer(
  ({ group, index }: IWidgetTabProps): ReactElement => {
    const {
      changeTabPlace,
      filterValue,
      toggleGroup,
      showInCharts,
      onFavorite,
    } = dashboardStore

    const isGroupInSearch = useMemo(() => {
      const value = filterValue.toLowerCase()
      return group.units.some(unit => unit.name.toLowerCase().includes(value))
    }, [group, filterValue])

    useLayoutEffect(() => {
      dashboardStore.changeTabHeight(index, tabId(group.name))
    }, [index, showInCharts, group])

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
            onToggleExpand={() => toggleGroup(group.name)}
            onToggleFavorite={() =>
              onFavorite(DashboardGroupTypes.Main, group.name, index)
            }
          />
        </div>

        {group.units.map(unit => (
          <div key={unit.name} data-drag-handle={true}>
            <WidgetSubTab unit={unit} index={index} groupName={group.name} />
          </div>
        ))}
      </>
    )
  },
)
