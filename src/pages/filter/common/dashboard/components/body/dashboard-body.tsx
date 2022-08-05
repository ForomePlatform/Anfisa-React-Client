import styles from './dashboard-body.module.css'

import { ReactElement, useEffect, useState } from 'react'
import GridLayout, { Layout, WidthProvider } from 'react-grid-layout'
import cn from 'classnames'
import { cloneDeep } from 'lodash'
import { observer } from 'mobx-react-lite'

import { DashboardGroupTypes } from '@core/enum/dashboard-group-types-enum'
import { LocalStoreManager } from '@core/storage-management'
import { datasetStore } from '@store/dataset'
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
  getSortedTabs,
  getUpdatedLayoutLayout,
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
      selectedGroup!.isFavorite = false

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

    const makeTabFavorite = (
      groupType: DashboardGroupTypes,
      groupName: string,
      groupIndex: number,
    ) => {
      if (groupType === DashboardGroupTypes.Main) {
        const clonedTabs = cloneDeep(mainTabs)

        clonedTabs.forEach((item, index) => {
          if (item.name === groupName) {
            clonedTabs[index].isFavorite = !clonedTabs[index].isFavorite
          }
        })

        const sortedTabs = getSortedTabs(clonedTabs)
        setMainTabs(sortedTabs)
        setMainTabsLayout(getUpdatedLayoutLayout(sortedTabs, mainTabsLayout))
      } else {
        const selectedGroup = groups.find(group => group.name === groupName)
        setSpareTabs(prev => prev.filter((_, index) => index !== groupIndex))

        const newMainTabs = [...mainTabs, selectedGroup!]
        const newLayout = getNewTabLayout(selectedGroup!, mainTabsLayout)

        newMainTabs.forEach((item, index) => {
          if (item.name === groupName) {
            newMainTabs[index].isFavorite = !newMainTabs[index].isFavorite
          }
        })

        const sortedTabs = getSortedTabs(newMainTabs)
        setMainTabs(sortedTabs)
        setMainTabsLayout(getUpdatedLayoutLayout(sortedTabs, newLayout))
      }
    }

    const handleLayoutChange = (layout: Layout[]) => {
      LocalStoreManager.write(
        'dashboardLayout',
        layout,
        datasetStore.datasetName,
      )

      setMainTabsLayout(layout)
    }

    useEffect(() => {
      LocalStoreManager.write(
        'dashboardMainTabs',
        mainTabs,
        datasetStore.datasetName,
      )
      LocalStoreManager.write(
        'dashboardLayout',
        mainTabsLayout,
        datasetStore.datasetName,
      )
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
          onDragStop={handleLayoutChange}
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
                  onMakeTabFavorite={makeTabFavorite}
                />
              </div>
            )
          })}
        </ResponsiveGridLayout>

        <FooterPanel
          spareTabs={spareTabs}
          filteredGroups={filteredGroups}
          onChange={changeTabPlace}
          onMakeTabFavorite={makeTabFavorite}
        />
      </div>
    )
  },
)
