import { ChangeEvent } from 'react'
import { makeAutoObservable } from 'mobx'

import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import filterStore from '@store/filter'
import { TFuncCondition } from '@service-providers/common/common.interface'
import { getConditionJoinMode } from '@utils/getConditionJoinMode'
import functionPanelStore from '../../function-panel.store'

class InheritanceModeStore {
  problemGroupValues: string[] = []
  variantValues: string[] = []
  currentMode?: ModeTypes

  constructor() {
    makeAutoObservable(this)
  }

  public setProblemGroupValues(problemGroupValues: string[]) {
    this.problemGroupValues = problemGroupValues
  }

  public setVariantValues(variantValues: string[]) {
    this.variantValues = variantValues
  }

  public resetVariantValues() {
    this.variantValues = []
  }

  public setCurrentMode(modeType?: ModeTypes): void {
    this.currentMode = modeType ?? undefined
  }

  public resetCurrentMode(): void {
    this.currentMode = undefined
  }

  public resetProblemGroupValues() {
    this.problemGroupValues = []
  }

  public get selectedFilterValue(): string {
    return this.variantValues.toString()
  }

  public updateProblemGroupValues(
    e: ChangeEvent<HTMLInputElement>,
    problemGroup: string,
  ): void {
    this.resetVariantValues()

    const problemGroups = e.target.checked
      ? [...this.problemGroupValues, problemGroup]
      : this.problemGroupValues.filter(
          (group: string) => group !== problemGroup,
        )
    this.setProblemGroupValues(problemGroups)
  }

  public updateVariantValues(
    e: ChangeEvent<HTMLInputElement>,
    variantName: string,
  ): void {
    const variants = e.target.checked
      ? [...this.variantValues, variantName]
      : this.variantValues.filter(
          (variantValue: string) => variantValue !== variantName,
        )

    this.setVariantValues(variants)
  }

  public selectAllVariants(): void {
    if (functionPanelStore.filteredComplexVariants.length === 0) return

    const { selectedFilter } = filterStore

    const variantsValues = selectedFilter
      ? functionPanelStore.complexVariants.map(variant => variant[0])
      : functionPanelStore.filteredComplexVariants.map(variant => variant[0])

    this.setVariantValues(variantsValues)
  }

  public resetAllFields(): void {
    this.resetProblemGroupValues()
    this.resetVariantValues()
  }

  public clearAllVariants(variantsValues: string[]): void {
    if (variantsValues.length === 0) return

    this.resetVariantValues()
  }

  public handleSumbitCondtions = () => {
    const conditions: TFuncCondition = [
      FilterKindEnum.Func,
      FuncStepTypesEnum.InheritanceMode,
      getConditionJoinMode(this.currentMode),
      this.variantValues,
      {
        problem_group:
          this.problemGroupValues.length > 0 ? this.problemGroupValues : null,
      },
    ]

    functionPanelStore.sumbitConditions(conditions)

    filterStore.resetStatFuncData()
    this.resetAllFields()
  }
}

export default new InheritanceModeStore()
