import { ApproxNameTypes } from '@core/enum/approxNameTypes'
import { ApproxValueTypes } from '@core/enum/approxValueTypes'
import { InheritanceModeEnum } from '@core/enum/inheritance-mode-enum'
import { IScenario } from '@service-providers/common'

export const getApproxName = (
  approxValue?: ApproxValueTypes | null,
): ApproxNameTypes => {
  if (approxValue === ApproxValueTypes.Gene) return ApproxNameTypes.Shared_Gene

  if (approxValue === ApproxValueTypes.Rough) {
    return ApproxNameTypes.Non_Intersecting_Transcript
  }

  return ApproxNameTypes.Shared_Transcript
}

export const getApproxValue = (
  approxName: ApproxNameTypes,
): ApproxValueTypes | null => {
  if (approxName === ApproxNameTypes.Non_Intersecting_Transcript) {
    return ApproxValueTypes.Rough
  }

  if (approxName === ApproxNameTypes.Shared_Gene) {
    return ApproxValueTypes.Gene
  }

  return null
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

export const getScenarioName = (scenario: IScenario) => {
  if (Object.keys(scenario).length > 2) return ''

  if (Object.keys(scenario)[0] === '0' && Object.keys(scenario)[1] === '1-2') {
    if (
      Object.values(scenario)[0].length === 1 &&
      Object.values(scenario)[1].length === 2
    ) {
      return InheritanceModeEnum.Compensational
    }

    if (
      Object.values(scenario)[0].length === 2 &&
      Object.values(scenario)[1].length === 1
    ) {
      return InheritanceModeEnum.AutosomalDominant
    }
  }

  if (
    Object.keys(scenario)[0] === '2' &&
    Object.keys(scenario)[1] === '0-1' &&
    Object.values(scenario)[0].length === 1 &&
    Object.values(scenario)[1].length === 2
  ) {
    return InheritanceModeEnum.HomozygousRecessive_XLinked
  }

  return ''
}

export const getSelectValues = (
  scenario: IScenario,
  problemGroups: string[],
): string[] => {
  return Object.keys(scenario).length
    ? [
        getSelectValue(scenario, problemGroups[0]),
        getSelectValue(scenario, problemGroups[1]),
        getSelectValue(scenario, problemGroups[2]),
      ]
    : ['--', '--', '--']
}

export const getSelectValue = (
  scenario: IScenario,
  problemGroup: string,
): string => {
  for (const key in scenario) {
    if (scenario[key].includes(problemGroup)) {
      return key
    }
  }
  return '--'
}
