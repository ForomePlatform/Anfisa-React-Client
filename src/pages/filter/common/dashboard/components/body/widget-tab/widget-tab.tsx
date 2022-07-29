import styles from './widget-tab.module.css'

import { ReactElement } from 'react'

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

  const toggleTabs = () => {
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

  return (
    <>
      <div className={styles.tab}>
        <WidgetTabHeader
          group={group}
          index={index}
          isAllTabsOpened={isAllTabsOpened}
          onChange={onChangeTabPlace}
          onToggle={toggleTabs}
        />
      </div>

      {group.units.map(unit => (
        <div key={unit.name}>
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
