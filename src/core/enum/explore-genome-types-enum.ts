import { IDropdownValue } from '@components/dropdown/dropdown.interfaces'

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

export type TGenomeOptionsKeys = Exclude<
  TExploreGenomeKeys,
  'BuildInclusionExclusion' | 'ExploreData'
>

export const genomeTypesOptions: IDropdownValue<TGenomeOptionsKeys>[] =
  Object.entries(ExploreGenomeTypesDictionary)
    .filter(([key]) =>
      [
        ExploreGenomeKeys.ACMGSecondary,
        ExploreGenomeKeys.PhenotypeBased,
        ExploreGenomeKeys.GeneticFirst,
      ].includes(key as any),
    )
    .map(([key, value]) => ({ label: value, value: key as TGenomeOptionsKeys }))
