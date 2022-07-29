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

export const getNewGroupLayout = (
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

  const item = document.getElementById(id)
  const clonedLayout = cloneDeep(mainTabsLayout)
  const children = item?.children

  let height = 0

  if (children) {
    for (const child of children) {
      height += child.getBoundingClientRect().height
    }
  }

  if (!isOpen && children) {
    clonedLayout[index].h = (height - 12) / 44
  } else if (isOpen && children) {
    clonedLayout[index].h = children.length - 1
  }

  return clonedLayout
}

export const getLayoutOnSubTabHeightChange = (
  props: IGetLayoutOnHeightChange,
): Layout[] => {
  const { id, index, isOpen, mainTabsLayout } = props

  const item = document.getElementById(id)
  const itemHeight = item?.getBoundingClientRect().height
  const clonedLayout = cloneDeep(mainTabsLayout)

  if (itemHeight && !isOpen) {
    clonedLayout[index].h = (itemHeight - 36) / 44 + clonedLayout[index].h
  } else if (itemHeight && isOpen) {
    clonedLayout[index].h = clonedLayout[index].h - (itemHeight - 36) / 44
  }

  return clonedLayout
}
