export interface IGeneRegionCachedValues {
  conditions: {
    locus: string
  }
}

export interface ICompoundRequestCachedValues {
  conditions: {
    approx: null
    state: null
    request: TRequestCondition[]
  }
  reset: string
}

export type TRequestCondition = [number, TSelectValues]

export type TSelectValues = {
  [key: string]: string[]
}

export type TScenario = [string, string[]]
