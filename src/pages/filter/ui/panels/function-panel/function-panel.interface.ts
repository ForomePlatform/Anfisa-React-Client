export interface IGeneRegionCachedValues {
  conditions: {
    locus: string
  }
}

export interface IInheritanceModeCachedValues {
  conditions: { problem_group: string[] }
  variants: string[]
}

export type TScenario = [string, string[]]

export interface ICustomInheritanceModeCachedValues {
  conditions: { scenario: TScenario[] }
  reset: string
}
