export interface IGeneRegionCachedValues {
  conditions: {
    locus: string
  }
}

export type TRequestCondition = [number, TSelectValues]

export type TSelectValues = {
  [key: string]: string[]
}

export type TScenario = [string, string[]]
