import { ApproxNameTypes } from '@core/enum/approxNameTypes'
import { ApproxValueTypes } from '@core/enum/approxValueTypes'
import { InheritanceModeEnum } from '@core/enum/inheritance-mode-enum'
import { IScenario } from '@service-providers/common'
import {
  IGetPreparedScenarioProps,
  IGetScenarioNameProps,
} from '../conditions.interface'

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

export const getPreparedScenario = ({
  preparedScenarioName,
  problemGroups,
  affectedGroup,
}: IGetPreparedScenarioProps): IScenario => {
  let preparedScenario: IScenario = {}

  const nonAffectedGroups = problemGroups.filter(
    group => group !== affectedGroup?.[0],
  )

  switch (preparedScenarioName) {
    case InheritanceModeEnum.HomozygousRecessive_XLinked:
      preparedScenario = {
        '2': affectedGroup,
      }

      if (nonAffectedGroups.length) {
        Object.assign(preparedScenario, { '0-1': nonAffectedGroups })
      }
      break

    case InheritanceModeEnum.AutosomalDominant:
      preparedScenario = {
        '1-2': affectedGroup,
      }

      if (nonAffectedGroups.length) {
        Object.assign(preparedScenario, { '0': nonAffectedGroups })
      }
      break

    case InheritanceModeEnum.Compensational:
      preparedScenario = {
        '0': affectedGroup,
      }

      if (nonAffectedGroups.length) {
        Object.assign(preparedScenario, { '1-2': nonAffectedGroups })
      }
      break
  }

  return preparedScenario
}

export const getScenarioName = ({
  scenario,
  affectedGroup,
  groupsLength,
}: IGetScenarioNameProps): string => {
  const affected = affectedGroup[0]
  let scenarioName = ''
  const scenarioLength = Object.keys(scenario).length

  for (const key in scenario) {
    if (scenario[key].includes(affected) && scenario[key].length === 1) {
      switch (key) {
        case '2':
          if (scenarioLength === 1) {
            scenarioName = InheritanceModeEnum.HomozygousRecessive_XLinked
          } else {
            for (const key in scenario) {
              if (key === '0-1' && scenario[key].length === groupsLength - 1) {
                scenarioName = InheritanceModeEnum.HomozygousRecessive_XLinked
              }
            }
          }
          break
        case '1-2':
          if (scenarioLength === 1) {
            scenarioName = InheritanceModeEnum.AutosomalDominant
          } else {
            for (const key in scenario) {
              if (key === '0' && scenario[key].length === groupsLength - 1) {
                scenarioName = InheritanceModeEnum.AutosomalDominant
              }
            }
          }
          break
        case '0':
          if (scenarioLength === 1) {
            scenarioName = InheritanceModeEnum.Compensational
          } else {
            for (const key in scenario) {
              if (key === '1-2' && scenario[key].length === groupsLength - 1) {
                scenarioName = InheritanceModeEnum.Compensational
              }
            }
          }
          break
      }
    }
  }

  return scenarioName
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
