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
  onChange: (props: IChangeGroupPlaceProps) => void
}

export const WidgetTab = ({
  group,
  index,
  onChange,
}: IWidgetTabProps): ReactElement => {
  const [isAllTabsOpened, openAllTabs, closeAllTabs] = useToggle(false)

  const toggleTabs = () => {
    isAllTabsOpened ? closeAllTabs() : openAllTabs()
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
            <WidgetSubTab unit={unit} isAllTabsOpened={isAllTabsOpened} />
          </div>
        )
      })}
    </>
  )
}
