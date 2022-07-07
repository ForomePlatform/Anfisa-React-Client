import { makeAutoObservable } from 'mobx'

import { persistenceStoreHelper } from '@store/common/persistence-store.helper'

const DEFAULT_WIDTH = 372

class SidebarUiStore {
  public width: number
  public isCollapsed: boolean

  constructor() {
    makeAutoObservable(this)
    const [{ width, isCollapsed }] = persistenceStoreHelper(
      'mainPageSidebar',
      () => ({
        width: this.width,
        isCollapsed: this.isCollapsed,
      }),
    )

    this.width = width ?? DEFAULT_WIDTH
    this.isCollapsed = isCollapsed ?? false
  }

  setWidth = (width: number) => {
    this.width = width
  }

  setCollapsed = (isCollapsed: boolean) => {
    this.isCollapsed = isCollapsed
  }
}

export const sidebarUiStore = new SidebarUiStore()
