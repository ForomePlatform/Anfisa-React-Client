import { IStepData } from '@store/dtree/dtree.store'
import { adaptFilteringStatsCounts } from '@service-providers/common'
import { IDtreeSetResponse } from '@service-providers/decision-trees'
import { createCodeFrags } from './../../utils/createCodeFrags'
import { getDataFromFrags } from './../../utils/getDataFromFrags'
import {
  IDtreeSet,
  IDtreeSetPoint,
  IDtreeStatResponse,
  TDtreeStat,
} from './decision-trees.interface'

export const adaptDtreeStatResponse = (
  response: IDtreeStatResponse,
): TDtreeStat => {
  return {
    units: response['stat-list'],
    functionalUnits: response.functions,
    filteredCounts: adaptFilteringStatsCounts(response['filtered-counts']),
    totalCounts: adaptFilteringStatsCounts(response['total-counts']),
  }
}

export const adaptDtreeSetResponse = (
  response: IDtreeSetResponse,
): IDtreeSet => {
  const initialStep: IStepData = {
    step: 1,
    groups: [],
    excluded: true,
    isActive: false,
    isReturnedVariantsActive: false,
    conditionPointIndex: 0,
    returnPointIndex: null,
  }

  const codeFrags = createCodeFrags(response.points)

  const stepCodes = getDataFromFrags(codeFrags)

  const localSteps: IStepData[] = []
  const atomsEntries = Object.entries(response['cond-atoms'] ?? {})
  const points: IDtreeSetPoint[] | undefined = response.points

  atomsEntries.forEach(([key, atom], index) => {
    const conditionPointIndex = parseInt(key, 10)

    localSteps.push({
      step: index + 1,
      groups: atom.filter((elem: any[]) => elem.length > 0),
      excluded: !stepCodes[index].decision,
      isActive: false,
      isReturnedVariantsActive: false,
      conditionPointIndex,
      returnPointIndex: conditionPointIndex + 1,
      condition: stepCodes[index].condition,
      result: stepCodes[index].result,
      isNegate: stepCodes[index].isNegate,
      decision: points?.[conditionPointIndex + 1].decision,
    })
  })

  const newSteps = localSteps.length === 0 ? [initialStep] : localSteps

  const finalStep: IStepData = {
    step: newSteps.length,
    groups: [],
    excluded: !stepCodes[stepCodes.length - 1]?.decision,
    isActive: false,
    isReturnedVariantsActive: false,
    conditionPointIndex: null,
    returnPointIndex: points ? points.length - 1 : null,
    isFinalStep: true,
  }

  newSteps.push(finalStep)

  return { ...response, steps: newSteps }
}
