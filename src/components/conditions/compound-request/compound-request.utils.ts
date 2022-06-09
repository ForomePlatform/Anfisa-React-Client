import { InheritanceModeEnum } from '@core/enum/inheritance-mode-enum'
import { IScenario } from '@service-providers/common'
import { getSelectValues } from '../custom-inheritance-mode/custom-inheritance-mode.utils'
import { TRequestCondition } from './../../../service-providers/common/common.interface'

export const getNewRequestCondition = (
  clonedRequestCondition: TRequestCondition[],
  requestBlockIndex: number,
  value: string,
  problemGroups: string[],
  selectIndex: number,
) => {
  const newScenario: IScenario = {}

  const selectedScenario = clonedRequestCondition[requestBlockIndex][1]
  const selectedScenarioSelectValues = getSelectValues(
    selectedScenario,
    problemGroups,
  )

  const clonedSelectValues = [...selectedScenarioSelectValues]
  clonedSelectValues[selectIndex] = value

  clonedSelectValues.forEach((value, index) => {
    if (value && value !== '--') {
      if (Object.keys(newScenario).includes(value)) {
        newScenario[value].push(problemGroups[index])
      } else {
        newScenario[value] = [problemGroups[index]]
      }
    }
  })

  clonedRequestCondition[requestBlockIndex][1] = newScenario

  return clonedRequestCondition
}

export const getPreparedScenario = (
  preparedValue: string,
  problemGroups: string[],
): IScenario => {
  let preparedScenario: IScenario = {}

  switch (preparedValue) {
    case InheritanceModeEnum.HomozygousRecessive_XLinked:
      preparedScenario = {
        '2': [problemGroups[0]],
        '0-1': [problemGroups[1], problemGroups[2]],
      }
      break

    case InheritanceModeEnum.AutosomalDominant:
      preparedScenario = {
        '1-2': [problemGroups[0]],
        '0': [problemGroups[1], problemGroups[2]],
      }
      break

    case InheritanceModeEnum.Compensational:
      preparedScenario = {
        '0': [problemGroups[0]],
        '1-2': [problemGroups[1], problemGroups[2]],
      }
      break
  }

  return preparedScenario
}
