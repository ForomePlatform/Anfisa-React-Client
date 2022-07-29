import { Layout } from 'react-grid-layout'
import cloneDeep from 'lodash/cloneDeep'

import {
  IExtendedTUnitGroups,
  IGetLayoutOnHeightChange,
} from './dashboard.interfaces'

export const getStartLayout = (groups: IExtendedTUnitGroups[]): Layout[] => {
  return groups.map((group, index) => ({
    i: group.name,
    x: index < 4 ? index : index % 4,
    y: index < 4 ? 0 : Math.floor(index / 4),
    w: 1,
    h: group.units.length + 1,
  }))
}

export const getNewTabLayout = (
  tabsLength: number,
  group: IExtendedTUnitGroups,
): Layout => {
  return {
    i: group.name,
    x: tabsLength < 4 ? tabsLength : tabsLength % 4,
    y: tabsLength < 4 ? 0 : Math.floor(tabsLength / 4),
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
    clonedLayout[index].h = (height - 12) / 44
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
    clonedLayout[index].h = (subTabHeight - 36) / 44 + clonedLayout[index].h
  } else if (subTabHeight && isOpen) {
    clonedLayout[index].h = clonedLayout[index].h - (subTabHeight - 36) / 44
  }

  return clonedLayout
}
