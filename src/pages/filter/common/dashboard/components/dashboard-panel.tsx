import styles from './dashboard-panel.module.css'

import { ReactElement, useMemo, useRef, useState } from 'react'
import GridLayout, { WidthProvider } from 'react-grid-layout'
import cn, { Argument } from 'classnames'
import difference from 'lodash/difference'

import { DashboardGroupTypes } from '@core/enum/dashboard-group-types-enum'
import { PredictionPowerIndicator } from '@components/prediction-power-indicator'
import {
  DASHBOARD_LAYOUT_COLS,
  DASHBOARD_LAYOUT_CONTAINER_PADDING,
  DASHBOARD_LAYOUT_MARGIN,
  DASHBOARD_LAYOUT_ROW_HEIGHT,
} from '../dashboard.constants'
import { IExtendedTUnitGroups } from '../dashboard.interfaces'

export interface IDashboardPanelProps {
  groups: IExtendedTUnitGroups[]
  className?: Argument
}

const ResponsiveGridLayout = WidthProvider(GridLayout)

export const DashboardPanel = ({
  groups,
  className,
}: IDashboardPanelProps): ReactElement => {
  const rootRef = useRef<HTMLDivElement>(null)

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
      h: 1,
    }))
  }, [mainGroups])

  const changeGroupPlace = (
    groupType: string,
    groupName: string,
    groupIndex: number,
  ) => {
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
    <div ref={rootRef} className={cn(styles.panel, className)}>
      <ResponsiveGridLayout
        layout={layout}
        cols={DASHBOARD_LAYOUT_COLS}
        rowHeight={DASHBOARD_LAYOUT_ROW_HEIGHT}
        containerPadding={DASHBOARD_LAYOUT_CONTAINER_PADDING}
        margin={DASHBOARD_LAYOUT_MARGIN}
        isResizable={false}
      >
        {mainGroups.map((group, index) => (
          <div className={styles.panel__tab} key={group.name}>
            <PredictionPowerIndicator
              className="mr-2 rounded"
              value={group.power || 0}
            />

            <div
              className={styles.panel__tab__title}
              onClick={() => {
                changeGroupPlace(DashboardGroupTypes.Main, group.name, index)
              }}
            >
              {group.name}
            </div>
          </div>
        ))}
      </ResponsiveGridLayout>

      <div className={styles.panel__sparePanel}>
        {spareGroups.map((group, index) => (
          <div
            className={styles.panel__sparePanel__tab}
            key={group.name}
            onClick={() =>
              changeGroupPlace(DashboardGroupTypes.Spare, group.name, index)
            }
          >
            <PredictionPowerIndicator
              className="mr-2 rounded"
              value={group.power || 0}
            />

            <div className={styles.panel__sparePanel__tab__title}>
              {group.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
