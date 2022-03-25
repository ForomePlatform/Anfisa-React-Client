import { makeAutoObservable } from 'mobx'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import filterStore from '@store/filter'
import {
  ConditionJoinMode,
  TFuncCondition,
} from '@service-providers/common/common.interface'
import functionPanelStore from '../../function-panel.store'

class GeneRegionStore {
  locusValue: string = ''

  constructor() {
    makeAutoObservable(this)
  }

  public setLocusValue(locusValue: string) {
    this.locusValue = locusValue
  }

  public resetLocusValue() {
    this.locusValue = ''
  }

  public get selectedFilterValue(): string {
    return `{"locus":"${this.locusValue}"}`
  }

  public setConditions = (value: string): void => {
    functionPanelStore.setCachedValues(FuncStepTypesEnum.GeneRegion, {
      conditions: { locus: value },
    })
  }

  public handleSumbitCondtions(): void {
    const conditions: TFuncCondition = [
      'func',
      FuncStepTypesEnum.GeneRegion,
      ConditionJoinMode.OR,
      ['True'],
      { locus: this.locusValue },
    ]

    functionPanelStore.sumbitConditions(conditions)

    this.resetLocusValue()
    filterStore.resetStatFuncData()
  }
}

export default new GeneRegionStore()
