import styles from './widget-tab.module.css'

import { ReactElement } from 'react'

import { DashboardGroupTypes } from '@core/enum/dashboard-group-types-enum'
import { useToggle } from '@core/hooks/use-toggle'
import { IWidgetTabProps } from '../../../dashboard.interfaces'
import { WidgetSubTab } from './components/widget-sub-tab'
import { WidgetTabHeader } from './components/widget-tab-header'

export const WidgetTab = ({
  group,
  index,
  id,
  onChangeTabPlace,
  onChangeSubTabHeight,
  onChangeTabHeight,
}: IWidgetTabProps): ReactElement => {
  const [isAllTabsOpened, openAllTabs, closeAllTabs] = useToggle(false)

  const handleToggleTabs = () => {
    if (isAllTabsOpened) {
      closeAllTabs()
      onChangeTabHeight({ index, id, isOpen: isAllTabsOpened })
    } else {
      openAllTabs()
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
      <div className={styles.tab} onClick={changeTabPlace}>
        <WidgetTabHeader
          group={group}
          isAllTabsOpened={isAllTabsOpened}
          onToggle={handleToggleTabs}
        />
      </div>

      {group.units.map(unit => (
        <div key={unit.name} className="cursor-grab" data-drag-handle={true}>
          <WidgetSubTab
            unit={unit}
            id={`widget-sub-tab_${unit.name}`}
            tabIndex={index}
            isAllTabsOpened={isAllTabsOpened}
            onChangeSubTabHeight={onChangeSubTabHeight}
          />
        </div>
      ))}
    </>
  )
}
