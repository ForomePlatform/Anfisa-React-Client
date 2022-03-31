import { makeAutoObservable } from 'mobx'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import filterStore from '@store/filter'
import { TFuncCondition } from '@service-providers/common/common.interface'
import { getModeType } from '@utils/getModeType'
import functionPanelStore from '../../function-panel.store'

class GeneRegionStore {
  locusValue: string = ''
  currentMode?: ModeTypes

  constructor() {
    makeAutoObservable(this)
  }

  public setLocusValue(locusValue: string) {
    this.locusValue = locusValue
  }

  public resetLocusValue() {
    this.locusValue = ''
  }

  public setCurrentMode(modeType: ModeTypes): void {
    this.currentMode = modeType
  }

  public resetCurrentMode(): void {
    this.currentMode = undefined
  }

  public get selectedFilterValue(): string {
    return `{"locus":"${this.locusValue}"}`
  }

  public handleSumbitCondtions(): void {
    const conditions: TFuncCondition = [
      'func',
      FuncStepTypesEnum.GeneRegion,
      getModeType(this.currentMode),
      ['True'],
      { locus: this.locusValue },
    ]

    functionPanelStore.sumbitConditions(conditions)

    this.resetLocusValue()
    filterStore.resetStatFuncData()
  }
}

export default new GeneRegionStore()
