import styles from './widget-tab.module.css'

import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { DashboardGroupTypes } from '@core/enum/dashboard-group-types-enum'
import { useToggle } from '@core/hooks/use-toggle'
import dashboardStore from '@pages/filter/common/dashboard'
import { IWidgetTabProps } from '../../../dashboard.interfaces'
import { WidgetSubTab } from './components/widget-sub-tab'
import { WidgetTabHeader } from './components/widget-tab-header'

export const WidgetTab = observer(
  ({
    group,
    filteredGroups,
    index,
    id,
    isGroupInSearch,
    onChangeTabPlace,
    onChangeSubTabHeight,
    onChangeTabHeight,
  }: IWidgetTabProps): ReactElement => {
    const [isAllTabsOpened, openAllTabs, closeAllTabs] = useToggle(group.isOpen)

    const handleToggleTabs = () => {
      if (isAllTabsOpened) {
        group.isOpen = false
        closeAllTabs()
        onChangeTabHeight({ index, id, isOpen: isAllTabsOpened })
      } else {
        openAllTabs()
        group.isOpen = true
        setTimeout(
          () => onChangeTabHeight({ index, id, isOpen: isAllTabsOpened }),
          0,
        )
      }
    }

    const changeTabPlace = () => {
      onChangeTabPlace({
        groupType: DashboardGroupTypes.Main,
        groupName: group.name,
        groupIndex: index,
      })
    }

    return (
      <>
        <div
          className={cn(styles.tab, !isGroupInSearch && styles.tab_disabled)}
          onClick={changeTabPlace}
        >
          <WidgetTabHeader
            group={group}
            isAllTabsOpened={isAllTabsOpened}
            onToggle={handleToggleTabs}
          />
        </div>

        {group.units.map(unit => {
          const unitName = unit.name.toLowerCase()
          const isUnitInSearch = filteredGroups.some(group =>
            group.attributes?.some(attr =>
              attr.name.toLowerCase().startsWith(unitName),
            ),
          )

          return (
            <div key={unit.name} data-drag-handle={true}>
              <WidgetSubTab
                unit={unit}
                id={`widget-sub-tab_${unit.name}`}
                tabIndex={index}
                disabled={!isUnitInSearch}
                isAllTabsOpened={isAllTabsOpened}
                isUnitOpened={unit.isOpen}
                onChangeSubTabHeight={onChangeSubTabHeight}
                showInCharts={dashboardStore.showInCharts}
              />
            </div>
          )
        })}
      </>
    )
  },
)
