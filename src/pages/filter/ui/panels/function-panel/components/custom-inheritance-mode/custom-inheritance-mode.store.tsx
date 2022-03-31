import { makeAutoObservable } from 'mobx'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { InheritanceModeEnum } from '@core/enum/inheritance-mode-enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import filterStore from '@store/filter'
import { TFuncCondition } from '@service-providers/common/common.interface'
import { getSelectValue } from '@utils/function-panel/getSelectValue'
import { getStringScenario } from '@utils/function-panel/getStringScenario'
import { getModeType } from '@utils/getModeType'
import { getSortedArray } from '@utils/getSortedArray'
import { TScenario } from '../../function-panel.interface'
import functionPanelStore from '../../function-panel.store'

interface ISendRequest {
  complexScenario?: [string, string][]
  resetName?: string
  selectType?: string
  selectValue?: string
}

class CustomInheritanceModeStore {
  scenario: TScenario[] = []
  resetValue: string = ''
  currentMode?: ModeTypes

  constructor() {
    makeAutoObservable(this)
  }

  public setScenario(scenario: TScenario[]) {
    this.scenario = scenario
  }

  public setResetValue(resetValue: string) {
    this.resetValue = resetValue
  }

  public setCurrentMode(modeType: ModeTypes): void {
    this.currentMode = modeType
  }

  public resetCurrentMode(): void {
    this.currentMode = undefined
  }

  public clearScenario() {
    this.scenario = []
  }

  public clearResetValue() {
    this.resetValue = ''
  }

  public get stringScenario() {
    return this.scenario.length > 0 ? getStringScenario(this.scenario) : ''
  }

  public get firstSelectValue() {
    return this.scenario.length > 0
      ? getSelectValue(this.scenario, functionPanelStore.problemGroups[0])
      : ''
  }

  public get secondSelectValue() {
    return this.scenario.length > 0
      ? getSelectValue(this.scenario, functionPanelStore.problemGroups[1])
      : ''
  }

  public get thirdSelectValue() {
    return this.scenario.length > 0
      ? getSelectValue(this.scenario, functionPanelStore.problemGroups[2])
      : ''
  }

  public get selectStates() {
    return [
      this.firstSelectValue,
      this.secondSelectValue,
      this.thirdSelectValue,
    ]
  }

  public get selectedFilterValue(): string {
    return `"scenario": ${
      this.scenario.length > 0 ? `${getStringScenario(this.scenario)}` : '{}'
    }`
  }

  // scenario creation step by step
  public setSingleScenario(group: string, selectValue: string): void {
    if (group === functionPanelStore.problemGroups[0]) {
      this.sendRequestAsync({
        selectType: 'first',
        selectValue,
      })
    }

    if (group === functionPanelStore.problemGroups[1]) {
      this.sendRequestAsync({
        selectType: 'second',
        selectValue,
      })
    }

    if (group === functionPanelStore.problemGroups[2]) {
      this.sendRequestAsync({
        selectType: 'third',
        selectValue,
      })
    }
  }

  // complex scenario creation
  public setComplexScenario(resetName: string): void {
    const problemGroups = functionPanelStore.problemGroups
    this.setResetValue(resetName)

    if (resetName === InheritanceModeEnum.HomozygousRecessive_XLinked) {
      const complexScenario: any[] = [
        ['2', problemGroups[0]],
        ['0-1', problemGroups[1]],
        ['0-1', problemGroups[2]],
      ]

      this.sendRequestAsync({
        complexScenario,
        resetName,
      })
    }

    if (resetName === InheritanceModeEnum.AutosomalDominant) {
      const complexScenario: any[] = [
        ['1-2', problemGroups[0]],
        ['0', problemGroups[1]],
        ['0', problemGroups[2]],
      ]

      this.sendRequestAsync({
        complexScenario,
        resetName,
      })
    }

    if (resetName === InheritanceModeEnum.Compensational) {
      const complexScenario: any[] = [
        ['0', problemGroups[0]],
        ['1-2', problemGroups[1]],
        ['1-2', problemGroups[2]],
      ]

      this.sendRequestAsync({
        complexScenario,
        resetName,
      })
    }

    if (resetName === 'empty') {
      const complexScenario: any[] = [
        ['--', problemGroups[0]],
        ['--', problemGroups[1]],
        ['--', problemGroups[2]],
      ]

      this.sendRequestAsync({
        complexScenario,
        resetName,
      })
    }
  }

  // root function to update data
  public sendRequestAsync = async ({
    selectType,
    selectValue,
    complexScenario,
  }: ISendRequest) => {
    let selectiveData: any[] = []

    if (selectType && selectValue) {
      selectiveData = [
        [
          selectType === 'first' ? selectValue : this.firstSelectValue || '--',
          functionPanelStore.problemGroups[0],
        ],
        [
          selectType === 'second'
            ? selectValue
            : this.secondSelectValue || '--',
          functionPanelStore.problemGroups[1],
        ],
        [
          selectType === 'third' ? selectValue : this.thirdSelectValue || '--',
          functionPanelStore.problemGroups[2],
        ],
      ]
    }

    const arrayScenario = getSortedArray(complexScenario || selectiveData)

    const stringScenario = getStringScenario(arrayScenario)

    const params = `{"scenario":{${stringScenario}}}`

    this.setScenario(arrayScenario)

    functionPanelStore.fetchStatFunc('Custom_Inheritance_Mode', params)
  }

  public handleSumbitCondtions(): void {
    const custInhModeConditions: TFuncCondition = [
      'func',
      FuncStepTypesEnum.CustomInheritanceMode,
      getModeType(this.currentMode),
      ['True'],
      JSON.parse(`{"scenario":{${this.stringScenario}}}`),
    ]

    functionPanelStore.sumbitConditions(custInhModeConditions)

    filterStore.resetStatFuncData()
    this.clearResetValue()
    this.clearScenario()
  }
}

export default new CustomInheritanceModeStore()
