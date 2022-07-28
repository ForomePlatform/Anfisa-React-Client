import styles from './dashboard-body.module.css'

import { ReactElement, useMemo, useState } from 'react'
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
  IExtendedTUnitGroups,
} from '../../dashboard.interfaces'
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
  const [mainGroups, setMainGroups] = useState<IExtendedTUnitGroups[]>(
    groups.slice(0, 4),
  )
  const [spareGroups, setSpareGroups] = useState<IExtendedTUnitGroups[]>(
    difference(groups, mainGroups),
  )

  const layout = useMemo(() => {
    return mainGroups.map((group, index) => ({
      i: group.name,
      x: index < 4 ? index : index % 4,
      y: index < 4 ? 0 : Math.floor(index / 4),
      w: 1,
      h: group.units.length + 1,
    }))
  }, [mainGroups])

  const changeGroupPlace = ({
    groupType,
    groupName,
    groupIndex,
  }: IChangeGroupPlaceProps) => {
    const selectedGroup = groups.find(group => group.name === groupName)

    if (groupType === DashboardGroupTypes.Main) {
      setSpareGroups(prev => [...prev, selectedGroup!])
      setMainGroups(prev => prev.filter((_, index) => index !== groupIndex))
    } else {
      setMainGroups(prev => [...prev, selectedGroup!])
      setSpareGroups(prev => prev.filter((_, index) => index !== groupIndex))
    }
  }

  return (
    <div className={cn(styles.body, className)}>
      <ResponsiveGridLayout
        layout={layout}
        cols={DASHBOARD_LAYOUT_COLS}
        containerPadding={DASHBOARD_LAYOUT_CONTAINER_PADDING}
        margin={DASHBOARD_LAYOUT_MARGIN}
        rowHeight={DASHBOARD_LAYOUT_ROW_HEIGHT}
        isResizable={true}
        className="flex-1 overflow-y-auto overflow-x-hidden"
      >
        {mainGroups.map((group, index) => (
          <div key={group.name} className="flex flex-col">
            <WidgetTab
              group={group}
              index={index}
              onChange={changeGroupPlace}
            />
          </div>
        ))}
      </ResponsiveGridLayout>

      <FooterPanel groups={spareGroups} onChange={changeGroupPlace} />
    </div>
  )
}
