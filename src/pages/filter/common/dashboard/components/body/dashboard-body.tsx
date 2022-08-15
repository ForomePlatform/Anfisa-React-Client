import styles from './dashboard-body.module.css'

import { ReactElement, useLayoutEffect } from 'react'
import GridLayout, { WidthProvider } from 'react-grid-layout'
import cn, { Argument } from 'classnames'
import { observer } from 'mobx-react-lite'

import dashboardStore from '@pages/filter/common/dashboard'
import {
  DASHBOARD_LAYOUT_COLS,
  DASHBOARD_LAYOUT_CONTAINER_PADDING,
  DASHBOARD_LAYOUT_MARGIN,
  DASHBOARD_LAYOUT_ROW_HEIGHT,
} from '../../dashboard.constants'
import { tabId } from '../../dashboard.utils'
import { FooterPanel } from './footer-panel'
import { WidgetTab } from './widget-tab'

interface IDashboardBodyProps {
  className?: Argument
}

const ResponsiveGridLayout = WidthProvider(GridLayout)

export const DashboardBody = observer(
  ({ className }: IDashboardBodyProps): ReactElement => {
    const {
      changeTabsHeight,
      mainTabs,
      mainTabsLayout,
      showInCharts,
      onLayoutChange,
    } = dashboardStore

    useLayoutEffect(() => {
      setTimeout(() => changeTabsHeight(), 0)
    }, [changeTabsHeight, mainTabs, showInCharts])

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
          onLayoutChange={onLayoutChange}
        >
          {mainTabs.map((group, index) => (
            <div
              key={group.name}
              id={tabId(group.name)}
              className={styles.body__gridLayout__widgetsContainer}
            >
              <WidgetTab group={group} index={index} />
            </div>
          ))}
        </ResponsiveGridLayout>

        <FooterPanel />
      </div>
    )
  },
)
