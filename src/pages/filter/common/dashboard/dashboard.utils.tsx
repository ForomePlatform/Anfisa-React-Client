import { Layout } from 'react-grid-layout'
import cloneDeep from 'lodash/cloneDeep'

import {
  DASHBOARD_LAYOUT_COLS,
  DASHBOARD_LAYOUT_VERTICAL_MARGIN_CF,
  DASHBOARD_ROW_OFFSET_HEIGHT,
} from './dashboard.constants'
import {
  IColsHeight,
  IExtendedTUnitGroup,
  IExtendedUnit,
} from './dashboard.interfaces'

export const tabId = (name: string): string => `widget-tab-${name}`
export const subTabId = (name: string): string => `widget-sub-tab_${name}`

export const tabUnit = (unit: IExtendedUnit, tab: IExtendedTUnitGroup) =>
  `unit-${unit.name};tab-${tab.name}`

export const getStartLayout = (groups: IExtendedTUnitGroup[]): Layout[] => {
  const cols = DASHBOARD_LAYOUT_COLS

  return groups.map((group, index) => ({
    i: group.name,
    x: index % cols,
    y: Math.floor(index / cols),
    w: 1,
    h: group.units.length + 1 + DASHBOARD_LAYOUT_VERTICAL_MARGIN_CF,
  }))
}

export const getUpdatedLayout = (
  groups: IExtendedTUnitGroup[],
  layout: Layout[],
): Layout[] => {
  const cols = DASHBOARD_LAYOUT_COLS

  return groups.map((group, index) => ({
    i: group.name,
    x: index % cols,
    y: Math.floor(index / cols),
    w: 1,
    h: layout.find(item => item.i === group.name)!.h,
  }))
}

const getSortedColsHeight = (layout: Layout[]): IColsHeight[] => {
  const colsHeight: IColsHeight[] = []
  const clonedLayout = cloneDeep(layout)

  for (let i = 0; i < DASHBOARD_LAYOUT_COLS; i++) {
    colsHeight.push({ h: 0, x: i })
  }

  clonedLayout.forEach(layout => {
    colsHeight[layout.x].h += layout.h
  })

  return colsHeight.sort((col1, col2) => col1.h - col2.h)
}

export const getNewTabLayout = (
  group: IExtendedTUnitGroup,
  mainTabsLayout: Layout[],
): Layout[] => {
  const clonedLayout = cloneDeep(mainTabsLayout)

  const colsHeight = getSortedColsHeight(mainTabsLayout)

  const newLayout = {
    i: group.name,
    x: colsHeight[0].x,
    y: colsHeight[0].h + 1,
    w: 1,
    h: group.units.length + 1 + DASHBOARD_LAYOUT_VERTICAL_MARGIN_CF,
  }

  clonedLayout.push(newLayout)

  return clonedLayout
}

export const getLayoutOnTabHeightChange = (
  id: string,
  index: number,
  mainTabsLayout: Layout[],
): Layout[] => {
  const tab = document.getElementById(id)
  const tabChildren = tab?.children
  const clonedLayout = cloneDeep(mainTabsLayout)

  let height = 0

  if (tabChildren) {
    for (const tabChild of tabChildren) {
      height += tabChild.getBoundingClientRect().height
    }
  }

  clonedLayout[index].h =
    height / DASHBOARD_ROW_OFFSET_HEIGHT +
    2 * DASHBOARD_LAYOUT_VERTICAL_MARGIN_CF

  return clonedLayout
}

export const getSortedTabs = (
  tabs: IExtendedTUnitGroup[],
): IExtendedTUnitGroup[] => {
  return tabs.sort((tab1, tab2) => {
    if (tab1.isFavorite && !tab2.isFavorite) {
      return -1
    }

    if (!tab1.isFavorite && tab2.isFavorite) {
      return 1
    }

    if (tab1.isFavorite && tab2.isFavorite) {
      return tab1.name.localeCompare(tab2.name)
    }

    return 1
  })
}
