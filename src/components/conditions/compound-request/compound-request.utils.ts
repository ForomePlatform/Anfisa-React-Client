import { IScenario } from '@service-providers/common'
import { getSelectValues } from '../utils/conditions.utils'
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

export const getFilteredRequestCondition = (
  fullRequestCondition: TRequestCondition[],
) => {
  return fullRequestCondition.filter(
    ([, reqCondition]) => Object.keys(reqCondition).length > 0,
  )
}

export const getSelectedValue = (
  group: string,
  index: number,
  requestCondition: TRequestCondition[],
): string => {
  let value = '--'

  const currentRequestBlock = requestCondition[index][1]

  Object.entries(currentRequestBlock).find((item: any[]) => {
    if (item[1].includes(group)) {
      value = item[0]
    }
  })

  return value
}
