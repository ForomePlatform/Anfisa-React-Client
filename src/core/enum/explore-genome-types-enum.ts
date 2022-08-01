export const ExploreGenomeKeys = {
  PhenotypeBased: 'PhenotypeBased',
  GeneticFirst: 'GeneticFirst',
  ACMGSecondary: 'ACMGSecondary',
  // BGMGeneticFirst: 'BGMGeneticFirst',
  ExploreData: 'ExploreData',
  BuildInclusionExclusion: 'BuildInclusionExclusion',
} as const

export const ExploreGenomeTypesDictionary = {
  [ExploreGenomeKeys.ACMGSecondary]: 'ACMG analysis',
  [ExploreGenomeKeys.PhenotypeBased]: 'Phenotype based analysis',
  [ExploreGenomeKeys.GeneticFirst]: 'Genetic first analysis',
  [ExploreGenomeKeys.ExploreData]: 'Explore data or build new filter',
  // [ExploreGenomeKeys.BGMGeneticFirst]: 'BGMGeneticFirst',
  [ExploreGenomeKeys.BuildInclusionExclusion]:
    'Build inclusion/exclusion criteria',
} as const

export type TExploreGenomeKeys = keyof typeof ExploreGenomeKeys
