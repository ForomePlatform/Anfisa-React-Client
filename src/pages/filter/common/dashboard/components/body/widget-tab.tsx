import styles from './dashboard-body.module.css'

import { ReactElement } from 'react'

import { useToggle } from '@core/hooks/use-toggle'
import {
  IChangeGroupPlaceProps,
  IExtendedTUnitGroups,
} from '../../dashboard.interfaces'
import { WidgetSubTab } from './widget-sub-tab'
import { WidgetTabHeader } from './widget-tab-header'

export interface IWidgetTabProps {
  group: IExtendedTUnitGroups
  index: number
  id: string
  onChange: (props: IChangeGroupPlaceProps) => void
  changeSubTabLayout: (index: number, id: string, isUnitOpened: boolean) => void
  changeTabLayout: (index: number, id: string, isUnitOpened: boolean) => void
}

export const WidgetTab = ({
  group,
  index,
  id,
  onChange,
  changeSubTabLayout,
  changeTabLayout,
}: IWidgetTabProps): ReactElement => {
  const [isAllTabsOpened, openAllTabs, closeAllTabs] = useToggle(false)

  const toggleTabs = () => {
    if (isAllTabsOpened) {
      closeAllTabs()
      changeTabLayout(index, id, isAllTabsOpened)
    } else {
      openAllTabs()
      setTimeout(() => changeTabLayout(index, id, isAllTabsOpened), 0)
    }
  }

  return (
    <>
      <div className={styles.body__tab}>
        <WidgetTabHeader
          group={group}
          index={index}
          isAllTabsOpened={isAllTabsOpened}
          onChange={onChange}
          onToggle={toggleTabs}
        />
      </div>

      {group.units.map(unit => {
        return (
          <div key={unit.name}>
            <WidgetSubTab
              unit={unit}
              id={`widget-sub-tab_${unit.name}`}
              tabIndex={index}
              isAllTabsOpened={isAllTabsOpened}
              changeSubTabLayout={changeSubTabLayout}
            />
          </div>
        )
      })}
    </>
  )
}
