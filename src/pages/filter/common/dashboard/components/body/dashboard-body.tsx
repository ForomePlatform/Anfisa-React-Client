import styles from './dashboard-body.module.css'

import { ReactElement, useState } from 'react'
import GridLayout, { Layout, WidthProvider } from 'react-grid-layout'
import cn from 'classnames'
import difference from 'lodash/difference'

import { DashboardGroupTypes } from '@core/enum/dashboard-group-types-enum'
import { t } from '@i18n'
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
  getStartLayout,
} from '../../dashboard.utils'
import { FooterPanel } from './footer-panel'
import { WidgetTab } from './widget-tab'

const ResponsiveGridLayout = WidthProvider(GridLayout)

export const DashboardBody = ({
  groups,
  filteredGroups,
  className,
}: IDashboardBodyProps): ReactElement => {
  const [mainTabs, setMainTabs] = useState<IExtendedTUnitGroups[]>(
    groups.slice(0, 4),
  )
  const [spareTabs, setSpareTabs] = useState<IExtendedTUnitGroups[]>(
    difference(groups, mainTabs),
  )
  const [mainTabsLayout, setMainTabsLayout] = useState<Layout[]>(
    getStartLayout(mainTabs),
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
        onLayoutChange={layout => setMainTabsLayout(layout)}
      >
        {mainTabs.map((group, index) => {
          const groupName = group.name.toLowerCase()

          const isFunc = group.name === t('unitsList.functionalUnits')

          const isGroupInSearch = filteredGroups.some(group =>
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
                isFunc={isFunc}
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
}
