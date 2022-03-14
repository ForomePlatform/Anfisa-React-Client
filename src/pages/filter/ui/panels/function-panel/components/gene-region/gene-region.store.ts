import { makeAutoObservable } from 'mobx'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import modalEditStore from '@pages/filter/ui/modal-edit/modal-edit.store'
import {
  TFuncCondition,
  TVariant,
} from '@service-providers/common/common.interface'
import functionPanelStore from '../../function-panel.store'
import { IGeneRegionCachedValues } from './../../function-panel.interface'

class GeneRegionStore {
  isAllMode = false
  isNotMode = false

  constructor() {
    makeAutoObservable(this)
  }

  public toggleMode(modeType: string): void {
    this.isAllMode = modeType === ModeTypes.All
    this.isNotMode = modeType === ModeTypes.Not
  }

  public get cachedValues(): IGeneRegionCachedValues {
    return functionPanelStore.getCachedValues<IGeneRegionCachedValues>(
      FuncStepTypesEnum.GeneRegion,
    )
  }

  public get locusValue(): string {
    return this.cachedValues?.conditions.locus || ''
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
      modalEditStore.getModeType(this.isAllMode, this.isNotMode),
      ['True'],
      { locus: this.locusValue },
    ]

    const variant: TVariant = [`{"locus":"${this.locusValue}"}`, 0]

    functionPanelStore.sumbitConditions(conditions, variant)
  }
}

export default new GeneRegionStore()
