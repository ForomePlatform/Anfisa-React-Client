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
  IColsHeight,
  IExtendedTUnitGroups,
  IGetLayoutOnHeightChange,
} from './dashboard.interfaces'

export const getStartLayout = (groups: IExtendedTUnitGroups[]): Layout[] => {
  const cols = DASHBOARD_LAYOUT_COLS

  const layout = groups.map((group, index) => ({
    i: group.name,
    x: index < cols ? index : index % cols,
    y: index < cols ? 0 : Math.floor(index / cols),
    w: 1,
    h: group.units.length + 1,
  }))

  return layout
}

export const getUpdatedLayoutLayout = (
  groups: IExtendedTUnitGroups[],
  layout: Layout[],
): Layout[] => {
  const cols = DASHBOARD_LAYOUT_COLS

  const newLayout: Layout[] = groups.map((group, index) => ({
    i: group.name,
    x: index < cols ? index : index % cols,
    y: index < cols ? 0 : Math.floor(index / cols),
    w: 1,
    h: layout.find(item => item.i === group.name)!.h,
  }))

  return newLayout
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

  const sortedColsHeight = colsHeight.sort((col1, col2) => col1.h - col2.h)

  return sortedColsHeight
}

export const getNewTabLayout = (
  group: IExtendedTUnitGroups,
  mainTabsLayout: Layout[],
): Layout[] => {
  const clonedLayout = cloneDeep(mainTabsLayout)

  const colsHeight = getSortedColsHeight(mainTabsLayout)

  const newLayout = {
    i: group.name,
    x: colsHeight[0].x,
    y: colsHeight[0].h + 1,
    w: 1,
    h: group.units.length + 1,
  }

  clonedLayout.push(newLayout)

  return clonedLayout
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

export const getSortedTabs = (
  tabs: IExtendedTUnitGroups[],
): IExtendedTUnitGroups[] => {
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
