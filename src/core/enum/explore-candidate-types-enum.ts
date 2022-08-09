export const ExploreCandidateKeys = {
  ViewAllVariants: 'ViewAllVariants',
  ExploreData: 'ExploreData',
  ApplyFilter: 'ApplyFilter',
} as const

export const ExploreCandidateTypesDictionary = {
  [ExploreCandidateKeys.ViewAllVariants]: 'View all variants',
  [ExploreCandidateKeys.ExploreData]: 'Explore data or build new filter',
  [ExploreCandidateKeys.ApplyFilter]: 'Apply additional preset filter',
} as const

export type TExploreCandidateKeys = keyof typeof ExploreCandidateKeys
