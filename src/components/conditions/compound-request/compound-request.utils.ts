import { IScenario, TRequestCondition } from '@service-providers/common'
import { getSelectValues } from '../utils/conditions.utils'
import {
  IGetNewRequestConditionProps,
  IGetSelectedValueProps,
} from './compound-request.interface'

export const getNewRequestCondition = ({
  clonedRequestCondition,
  requestBlockIndex,
  value,
  problemGroups,
  selectIndex,
}: IGetNewRequestConditionProps) => {
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

export const getSelectedValue = ({
  group,
  requestIndex,
  requestCondition,
}: IGetSelectedValueProps): string => {
  const currentRequestBlock = requestCondition[requestIndex][1]

  return (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(currentRequestBlock).find(([_key, value]) =>
      value.includes(group),
    )?.[0] ?? '--'
  )
}
