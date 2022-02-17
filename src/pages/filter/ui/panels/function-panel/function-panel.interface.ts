export interface IGeneRegionCachedValues {
  conditions: {
    locus: string
  }
}

export interface IInheritanceModeCachedValues {
  conditions: { problem_group: string[] }
  variants: string[]
}
