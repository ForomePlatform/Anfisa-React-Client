import { Layout } from 'react-grid-layout'
import cloneDeep from 'lodash/cloneDeep'

import {
  DASHBOARD_COLS_OFFSET_HEIGHT,
  DASHBOARD_LAYOUT_COLS,
  DASHBOARD_LAYOUT_ROW_HEIGHT,
  DASHBOARD_ROW_OFFSET_HEIGHT,
  HIDDEN_RESIZE_HEIGHT,
} from './dashboard.constants'
import {
  IExtendedTUnitGroups,
  IGetLayoutOnHeightChange,
} from './dashboard.interfaces'

export const getStartLayout = (groups: IExtendedTUnitGroups[]): Layout[] => {
  const cols = DASHBOARD_LAYOUT_COLS

  return groups.map((group, index) => ({
    i: group.name,
    x: index < cols ? index : index % cols,
    y: index < cols ? 0 : Math.floor(index / cols),
    w: 1,
    h: group.units.length + 1,
  }))
}

export const getNewTabLayout = (
  tabsLength: number,
  group: IExtendedTUnitGroups,
): Layout => {
  const cols = DASHBOARD_LAYOUT_COLS

  return {
    i: group.name,
    x: tabsLength < cols ? tabsLength : tabsLength % cols,
    y: tabsLength < cols ? 0 : Math.floor(tabsLength / cols),
    w: 1,
    h: group.units.length + 1,
  }
}

export const getLayoutOnTabHeightChange = (
  props: IGetLayoutOnHeightChange,
): Layout[] => {
  const { id, index, isOpen, mainTabsLayout } = props

  const tab = document.getElementById(id)
  const tabChildren = tab?.children
  const clonedLayout = cloneDeep(mainTabsLayout)

  let height = 0

  if (tabChildren) {
    for (const tabChild of tabChildren) {
      height += tabChild.getBoundingClientRect().height
    }
  }

  if (!isOpen && tabChildren) {
    clonedLayout[index].h =
      (height + HIDDEN_RESIZE_HEIGHT - DASHBOARD_COLS_OFFSET_HEIGHT) /
      DASHBOARD_ROW_OFFSET_HEIGHT
  } else if (isOpen && tabChildren) {
    clonedLayout[index].h = tabChildren.length - 1
  }

  return clonedLayout
}

export const getLayoutOnSubTabHeightChange = (
  props: IGetLayoutOnHeightChange,
): Layout[] => {
  const { id, index, isOpen, mainTabsLayout } = props

  const subTab = document.getElementById(id)
  const subTabHeight = subTab?.getBoundingClientRect().height
  const clonedLayout = cloneDeep(mainTabsLayout)

  if (subTabHeight && !isOpen) {
    clonedLayout[index].h =
      (subTabHeight - DASHBOARD_LAYOUT_ROW_HEIGHT) /
        DASHBOARD_ROW_OFFSET_HEIGHT +
      clonedLayout[index].h
  } else if (subTabHeight && isOpen) {
    clonedLayout[index].h =
      clonedLayout[index].h -
      (subTabHeight - DASHBOARD_LAYOUT_ROW_HEIGHT) / DASHBOARD_ROW_OFFSET_HEIGHT
  }

  return clonedLayout
}
