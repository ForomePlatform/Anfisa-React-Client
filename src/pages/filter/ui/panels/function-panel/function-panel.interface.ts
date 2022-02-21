export interface IGeneRegionCachedValues {
  conditions: {
    locus: string
  }
}

export interface IInheritanceModeCachedValues {
  conditions: { problem_group: string[] }
  variants: string[]
}

export interface ICompoundHetCachedValues {
  conditions: {
    approx: string | null
    state?: string | null
  }
  variants: string[]
}
