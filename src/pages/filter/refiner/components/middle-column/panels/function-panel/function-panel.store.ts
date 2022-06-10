import { makeAutoObservable } from 'mobx'

import filterStore from '@store/filter'
import { TFuncCondition } from '@service-providers/common/common.interface'

class FunctionPanelStore {
  constructor() {
    makeAutoObservable(this)
  }

  public get simpleVariants(): string[] {
    const { variants } = filterStore.statFuncData
    return variants
  }

  public submitConditions(condition: TFuncCondition): void {
    filterStore.saveCurrentCondition(condition)
  }

  public fetchStatFunc(componentName: string, params: string) {
    return filterStore.fetchStatFuncAsync(componentName, params)
  }
}

export default new FunctionPanelStore()
