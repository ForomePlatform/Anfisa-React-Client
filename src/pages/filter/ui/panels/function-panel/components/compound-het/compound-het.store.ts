import { Option } from 'react-dropdown'
import { makeAutoObservable, runInAction } from 'mobx'

import { IStatFuncData } from '@declarations'
import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import filterStore from '@store/filter'
import {
  ConditionJoinMode,
  TFuncCondition,
} from '@service-providers/common/common.interface'
import { getModeType } from '@utils/getModeType'
import functionPanelStore from '../../function-panel.store'

export const CompoundHetSelectOptions = [
  { label: 'shared transcript', value: '' },
  { label: 'shared gene', value: 'gene' },
  { label: 'non-intersecting transcripts', value: 'rough' },
]

class CompoundHetStore {
  statFuncStatus = ''
  initialApprox: string | null = ''

  currentMode?: ModeTypes

  constructor() {
    makeAutoObservable(this)
  }

  public setInitialApprox(initialApprox: string | null) {
    this.initialApprox = initialApprox
  }

  public resetInitialApprox() {
    this.initialApprox = ''
  }

  public setCurrentMode(modeType: ModeTypes): void {
    this.currentMode = modeType
  }

  public resetCurrentMode(): void {
    this.currentMode = undefined
  }

  public async getStatFuncStatusAsync(): Promise<void> {
    const statFuncData: IStatFuncData = await filterStore.fetchStatFuncAsync(
      FuncStepTypesEnum.CompoundHet,
      JSON.stringify({
        approx: this.initialApprox ?? null,
        state: null,
      }),
    )

    runInAction(() => {
      this.statFuncStatus = statFuncData.err || ''
    })
  }

  public handleChangeApprox(arg: Option): void {
    const approx = !arg.value ? null : arg.value

    this.setInitialApprox(approx)

    functionPanelStore.fetchStatFunc(
      FuncStepTypesEnum.CompoundHet,
      JSON.stringify({
        approx,
        state: '',
      }),
    )
  }

  public handleSumbitCondtions(): void {
    const conditions: TFuncCondition = [
      'func',
      FuncStepTypesEnum.CompoundHet,
      getModeType(this.currentMode),
      ['Proband'],
      { approx: this.initialApprox ?? null, state: null },
    ]

    functionPanelStore.sumbitConditions(conditions)

    filterStore.resetStatFuncData()
    this.resetInitialApprox()
  }

  public handleResetFields(): void {
    this.setInitialApprox('shared transcript')
  }
}

export default new CompoundHetStore()
