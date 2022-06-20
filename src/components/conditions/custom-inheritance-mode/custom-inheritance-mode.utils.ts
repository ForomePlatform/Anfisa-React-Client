import { IScenario } from '@service-providers/common'

export const getNewScenario = (
  selectedValues: string[],
  problemGroups: string[],
): IScenario => {
  const newScenario: IScenario = {}

  selectedValues.forEach((value, index) => {
    if (value && value !== '--') {
      if (Object.keys(newScenario).includes(value)) {
        newScenario[value].push(problemGroups[index])
      } else {
        newScenario[value] = [problemGroups[index]]
      }
    }
  })

  return newScenario
}
