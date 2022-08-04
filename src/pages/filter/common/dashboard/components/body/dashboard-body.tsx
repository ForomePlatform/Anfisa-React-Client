import styles from './dashboard-body.module.css'

import { ReactElement, useEffect, useState } from 'react'
import GridLayout, { Layout, WidthProvider } from 'react-grid-layout'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { DashboardGroupTypes } from '@core/enum/dashboard-group-types-enum'
import { LocalStoreManager } from '@core/storage-management'
import {
  DASHBOARD_LAYOUT_COLS,
  DASHBOARD_LAYOUT_CONTAINER_PADDING,
  DASHBOARD_LAYOUT_MARGIN,
  DASHBOARD_LAYOUT_ROW_HEIGHT,
} from '../../dashboard.constants'
import {
  IChangeGroupPlaceProps,
  IChangeHeightProps,
  IDashboardBodyProps,
  IExtendedTUnitGroups,
} from '../../dashboard.interfaces'
import {
  getLayoutOnSubTabHeightChange,
  getLayoutOnTabHeightChange,
  getNewTabLayout,
} from '../../dashboard.utils'
import dashboardStore from '../../index'
import { FooterPanel } from './footer-panel'
import { WidgetTab } from './widget-tab'

const ResponsiveGridLayout = WidthProvider(GridLayout)

export const DashboardBody = observer(
  ({
    groups,
    filteredGroups,
    className,
  }: IDashboardBodyProps): ReactElement => {
    const { getLayout, getMainTabs, getSpareTabs } = dashboardStore

    const [mainTabs, setMainTabs] = useState<IExtendedTUnitGroups[]>(
      getMainTabs(groups),
    )
    const [spareTabs, setSpareTabs] = useState<IExtendedTUnitGroups[]>(
      getSpareTabs(groups),
    )
    const [mainTabsLayout, setMainTabsLayout] = useState<Layout[]>(
      getLayout(mainTabs),
    )

    const changeTabPlace = ({
      groupType,
      groupName,
      groupIndex,
    }: IChangeGroupPlaceProps) => {
      const selectedGroup = groups.find(group => group.name === groupName)

      if (groupType === DashboardGroupTypes.Main) {
        setMainTabs(prev => prev.filter((_, index) => index !== groupIndex))
        setSpareTabs(prev => [selectedGroup!, ...prev])
        setMainTabsLayout(prev => prev.filter(group => group.i !== groupName))
      } else {
        setSpareTabs(prev => prev.filter((_, index) => index !== groupIndex))
        setMainTabs(prev => [...prev, selectedGroup!])

        const newTabLayout = getNewTabLayout(selectedGroup!, mainTabsLayout)

        setMainTabsLayout(newTabLayout)
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

    const handleLayoutChange = (layout: Layout[]) => {
      LocalStoreManager.write('dashboardLayout', layout)

      setMainTabsLayout(layout)
    }

    useEffect(() => {
      LocalStoreManager.write('dashboardMainTabs', mainTabs)
    }, [mainTabs, mainTabsLayout])

    return (
      <div className={cn(styles.body, className)}>
        <ResponsiveGridLayout
          layout={mainTabsLayout}
          cols={DASHBOARD_LAYOUT_COLS}
          containerPadding={DASHBOARD_LAYOUT_CONTAINER_PADDING}
          margin={DASHBOARD_LAYOUT_MARGIN}
          rowHeight={DASHBOARD_LAYOUT_ROW_HEIGHT}
          draggableHandle="[data-drag-handle]"
          isResizable={false}
          className={styles.body__gridLayout}
          onLayoutChange={layout => handleLayoutChange(layout)}
        >
          {mainTabs.map((group, index) => {
            const groupName = group.name.toLowerCase()

            const isGroupInSearch = filteredGroups.some((group: any) =>
              group.name.toLowerCase().startsWith(groupName),
            )
            return (
              <div
                key={group.name}
                id={`widget-tab-${group.name}`}
                className={styles.body__gridLayout__widgetsContainer}
              >
                <WidgetTab
                  group={group}
                  filteredGroups={filteredGroups}
                  index={index}
                  id={`widget-tab-${group.name}`}
                  isGroupInSearch={isGroupInSearch}
                  onChangeTabPlace={changeTabPlace}
                  onChangeTabHeight={changeTabHeight}
                  onChangeSubTabHeight={changeSubTabHeight}
                />
              </div>
            )
          })}
        </ResponsiveGridLayout>

        <FooterPanel
          spareTabs={spareTabs}
          filteredGroups={filteredGroups}
          onChange={changeTabPlace}
        />
      </div>
    )
  },
)
