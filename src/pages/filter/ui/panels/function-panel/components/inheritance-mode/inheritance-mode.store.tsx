import { ChangeEvent } from 'react'
import { makeAutoObservable } from 'mobx'

import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import filterStore from '@store/filter'
import {
  ConditionJoinMode,
  TFuncCondition,
} from '@service-providers/common/common.interface'
import functionPanelStore from '../../function-panel.store'

class InheritanceModeStore {
  problemGroupValues: string[] = []
  variantValues: string[] = []

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

    const variantsGroup = functionPanelStore.filteredComplexVariants.map(
      variant => variant[0],
    )

    this.setVariantValues(variantsGroup)
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
      ConditionJoinMode.OR,
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
