import styles from './dashboard-body.module.css'

import { ReactElement, useState } from 'react'
import GridLayout, { WidthProvider } from 'react-grid-layout'
import cn, { Argument } from 'classnames'
import difference from 'lodash/difference'

import { DashboardGroupTypes } from '@core/enum/dashboard-group-types-enum'
import {
  DASHBOARD_LAYOUT_COLS,
  DASHBOARD_LAYOUT_CONTAINER_PADDING,
  DASHBOARD_LAYOUT_MARGIN,
  DASHBOARD_LAYOUT_ROW_HEIGHT,
} from '../../dashboard.constants'
import {
  IChangeGroupPlaceProps,
  IChangeHeightProps,
  IExtendedTUnitGroups,
} from '../../dashboard.interfaces'
import {
  getLayoutOnSubTabHeightChange,
  getLayoutOnTabHeightChange,
  getNewGroupLayout,
  getStartLayout,
} from '../../dashboard.utils'
import { FooterPanel } from './footer-panel'
import { WidgetTab } from './widget-tab'

export interface IDashboardBodyProps {
  groups: IExtendedTUnitGroups[]
  className?: Argument
}

const ResponsiveGridLayout = WidthProvider(GridLayout)

export const DashboardBody = ({
  groups,
  className,
}: IDashboardBodyProps): ReactElement => {
  const [mainTabs, setMainTabs] = useState<IExtendedTUnitGroups[]>(
    groups.slice(0, 4),
  )
  const [spareTabs, setSpareTabs] = useState<IExtendedTUnitGroups[]>(
    difference(groups, mainTabs),
  )

  const [mainTabsLayout, setMainTabsLayout] = useState(getStartLayout(mainTabs))

  const changeTabPlace = ({
    groupType,
    groupName,
    groupIndex,
  }: IChangeGroupPlaceProps) => {
    const selectedGroup = groups.find(group => group.name === groupName)

    if (groupType === DashboardGroupTypes.Main) {
      setMainTabs(prev => prev.filter((_, index) => index !== groupIndex))
      setSpareTabs(prev => [...prev, selectedGroup!])
      setMainTabsLayout(prev => prev.filter(group => group.i !== groupName))
    } else {
      setSpareTabs(prev => prev.filter((_, index) => index !== groupIndex))
      setMainTabs(prev => [...prev, selectedGroup!])

      const tabsLength = mainTabs.length
      const newLyaoutItem = getNewGroupLayout(tabsLength, selectedGroup!)
      setMainTabsLayout(prev => [...prev, newLyaoutItem])
    }
  }

  const changeTabHeight = ({ index, id, isOpen }: IChangeHeightProps) => {
    const newLayout = getLayoutOnTabHeightChange({
      index,
      id,
      isOpen,
      mainTabsLayout,
    })
    setMainTabsLayout(newLayout)
  }

  const changeSubTabHeight = ({ index, id, isOpen }: IChangeHeightProps) => {
    const newLayout = getLayoutOnSubTabHeightChange({
      index,
      id,
      isOpen,
      mainTabsLayout,
    })
    setMainTabsLayout(newLayout)
  }

  return (
    <div className={cn(styles.body, className)}>
      <ResponsiveGridLayout
        layout={mainTabsLayout}
        cols={DASHBOARD_LAYOUT_COLS}
        containerPadding={DASHBOARD_LAYOUT_CONTAINER_PADDING}
        margin={DASHBOARD_LAYOUT_MARGIN}
        rowHeight={DASHBOARD_LAYOUT_ROW_HEIGHT}
        isResizable={true}
        className="flex-1 overflow-y-auto overflow-x-hidden"
      >
        {mainTabs.map((group, index) => (
          <div
            key={group.name}
            className="flex flex-col"
            id={`widget-tab-${group.name}`}
          >
            <WidgetTab
              group={group}
              index={index}
              id={`widget-tab-${group.name}`}
              onChangeTabPlace={changeTabPlace}
              onChangeTabHeight={changeTabHeight}
              onChangeSubTabHeight={changeSubTabHeight}
            />
          </div>
        ))}
      </ResponsiveGridLayout>

      <FooterPanel spareTabs={spareTabs} onChange={changeTabPlace} />
    </div>
  )
}
