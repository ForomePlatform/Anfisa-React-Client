import { makeAutoObservable } from 'mobx'

import datasetStore from '@store/dataset/dataset'
import dtreeStore from '@store/dtree'
import { IStepData } from './dtree.store'

export enum ActiveStepOptions {
  StartedVariants = 'startedVariants',
  ReturnedVariants = 'returnedVariants',
}

export enum CreateEmptyStepPositions {
  BEFORE = 'BEFORE',
  AFTER = 'AFTER',
  FINAL = 'FINAL',
}

interface IActiveStep {
  index: number
  option: ActiveStepOptions
  isIncreasedStepIndex?: boolean
  isFullStep?: boolean
  priorityUnit?: string
}

class StepStore {
  activeStepIndex: number = 0
  activeStepOption: ActiveStepOptions = ActiveStepOptions.StartedVariants
  priorityUnit?: string

  public shouldNegateDetails?: boolean = false

  private _steps: IStepData[] = []

  get steps() {
    return this._steps
  }

  get filteredSteps(): IStepData[] {
    const searchValue = dtreeStore.algorithmFilterValue.toLowerCase()

    if (!searchValue) return this.steps

    const filteredSteps = this.steps.filter(({ groups }) => {
      return groups.some(condition => {
        const name = condition[1].toLowerCase()
        if (name.includes(searchValue)) return true

        const valueVariants = condition[3]
        if (!valueVariants) return false

        const valueVariantList = Object.values(valueVariants)

        return valueVariantList.some(varaintName => {
          if (typeof varaintName !== 'string') return false

          return varaintName?.toLowerCase().includes(searchValue)
        })
      })
    })

    return filteredSteps
  }

  get stepIndexForApi(): string {
    if (!dtreeStore.stepIndexes.length) {
      return '0'
    }

    return (
      dtreeStore.stepIndexes[this.activeStepIndex] ?? this.activeStepIndex * 2
    )
  }

  constructor() {
    makeAutoObservable(this)
  }

  setPriorityUnit(unit: string | undefined) {
    this.priorityUnit = unit
  }

  setActiveStep(index: number, option: ActiveStepOptions) {
    this.activeStepIndex = index
    this.activeStepOption = option
  }

  changeStepDataActiveStep = (
    index: number,
    option: ActiveStepOptions,
    indexForApi: string,
    isFullStep?: boolean,
  ) => {
    if (!this._steps[index]) {
      return
    }

    this._steps.forEach(element => {
      element.isActive = false
      element.isReturnedVariantsActive = false
    })

    if (option === ActiveStepOptions.StartedVariants) {
      this._steps[index].isActive = true
    } else {
      this._steps[index].isReturnedVariantsActive = true
    }

    this._steps[index].isFullStep = isFullStep

    this.shouldNegateDetails =
      this._steps[index].decision === false && !isFullStep

    dtreeStore.stat.setQuery({
      datasetName: datasetStore.datasetName,
      code: dtreeStore.dtreeCode,
      stepIndex: indexForApi,
      priorityUnit: this.priorityUnit ? [this.priorityUnit] : undefined,
    })
  }

  makeStepActive({
    index,
    option,
    isIncreasedStepIndex = false,
    isFullStep = true,
    priorityUnit,
  }: IActiveStep) {
    this.setPriorityUnit(priorityUnit)
    this.setActiveStep(index, option)
    this.changeStepDataActiveStep(
      index,
      option,
      isIncreasedStepIndex
        ? `${+this.stepIndexForApi + 1}`
        : this.stepIndexForApi,
      isFullStep,
    )
  }

  insertEmptyStep(position: CreateEmptyStepPositions, index: number) {
    const localSteps = [...this.steps]

    localSteps.forEach(element => {
      element.isActive = false

      return element
    })

    const startSpliceIndex =
      position === CreateEmptyStepPositions.BEFORE ? index : index + 1

    localSteps.splice(startSpliceIndex, 0, {
      step: index,
      groups: [],
      excluded: true,
      isActive: true,
      isReturnedVariantsActive: false,
      conditionPointIndex:
        startSpliceIndex < localSteps.length - 1
          ? localSteps[startSpliceIndex].conditionPointIndex
          : localSteps[localSteps.length - 1].returnPointIndex,
      returnPointIndex: null,
    })

    localSteps.forEach((item, currNo: number) => {
      item.step = currNo + 1
    })

    this._steps = localSteps
  }

  createEmptyStep(stepIndex: number, position: CreateEmptyStepPositions) {
    const previousStepIndex = stepIndex - 1
    const nextStepIndex = stepIndex + 1

    switch (position) {
      case CreateEmptyStepPositions.FINAL:
        this.insertEmptyStep(position, previousStepIndex)

        this.makeStepActive({
          index: stepIndex,
          option: ActiveStepOptions.StartedVariants,
        })
        break

      case CreateEmptyStepPositions.BEFORE:
        this.insertEmptyStep(position, stepIndex)

        this.makeStepActive({
          index: stepIndex,
          option: ActiveStepOptions.StartedVariants,
        })
        break

      case CreateEmptyStepPositions.AFTER:
        this.insertEmptyStep(position, stepIndex)

        this.makeStepActive({
          index: nextStepIndex,
          option: ActiveStepOptions.StartedVariants,
        })
        break

      default:
        break
    }
  }

  setSteps(stepList: IStepData[]): void {
    this._steps = stepList
  }

  removeStep(index: number) {
    const stepData = this.steps

    stepData.splice(index, 1)

    stepData.map((item, currNo: number) => {
      item.step = currNo + 1
    })

    this.makeStepActive({
      index: stepData.length - 1,
      option: ActiveStepOptions.StartedVariants,
    })
  }
}

export default new StepStore()
