import { makeAutoObservable, toJS } from 'mobx'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import {
  TFuncCondition,
  TVariant,
} from '@service-providers/common/common.interface'
import { getQueryBuilder } from '@utils/getQueryBuilder'
import { TRequestCondition } from './function-panel.interface'

class FunctionPanelStore {
  constructor() {
    makeAutoObservable(this)
  }

  public get simpleVariants(): string[] {
    const { variants } = filterStore.statFuncData
    return variants
  }

  public get complexVariants(): [string, number][] {
    const { variants } = filterStore.statFuncData
    return variants || []
  }

  public get filterName(): string {
    return filterStore.selectedGroupItem.name
  }

  public get filterGroup(): string {
    return filterStore.selectedGroupItem.vgroup
  }

  public get problemGroups(): string[] {
    let attrData: any

    const statList = toJS(datasetStore.dsStat['stat-list'])
    const subGroups = Object.values(getQueryBuilder(statList))

    subGroups.map(subGroup => {
      subGroup.map((item, currNo) => {
        if (item.name === FuncStepTypesEnum.CustomInheritanceMode) {
          attrData = subGroup[currNo]
        }
      })
    })

    return attrData.family
  }

  public getCachedValues<T>(componentName: string): T {
    return filterStore.readFilterCondition(componentName) as T
  }

  public setCachedValues<T>(componentName: string, cachedValues: T): void {
    filterStore.setFilterCondition<T>(componentName, cachedValues)
  }

  public clearCachedValues(componentName: string, filterName?: string): void {
    filterStore.clearFilterCondition(componentName, filterName)
  }

  public async applyConditions(conditions: TFuncCondition): Promise<void> {
    await datasetStore.setConditionsAsync([conditions])
  }

  public addSelectedFilters(variant: TVariant): void {
    filterStore.addSelectedFilters({
      group: this.filterGroup,
      groupItemName: this.filterName,
      variant: variant,
    })
  }

  public handleSumbitConditions(
    conditions: TFuncCondition,
    variant: TVariant,
  ): void {
    if (datasetStore.activePreset) datasetStore.resetActivePreset()

    this.applyConditions(conditions)

    this.addSelectedFilters(variant)

    if (!datasetStore.isXL) {
      datasetStore.fetchWsListAsync()
    }
  }

  public fetchStatFunc(componentName: string, params: string) {
    return filterStore.fetchStatFuncAsync(componentName, params)
  }

  public getSelectedValue(
    group: string,
    index: number,
    requestCondition: TRequestCondition[],
  ): string {
    let value = '--'

    const currentRequestBlock = requestCondition[index][1]

    Object.entries(currentRequestBlock).map((item: any[]) => {
      if (item[1].includes(group)) {
        value = item[0]
      }
    })

    return value
  }
}

export default new FunctionPanelStore()
