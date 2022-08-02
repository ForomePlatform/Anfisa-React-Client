export const ExploreKeys = {
  Genome: 'Genome',
  Candidate: 'Candidate',
} as const

export const ExploreTypesDictionary = {
  [ExploreKeys.Genome]: 'Whole genome/exome',
  [ExploreKeys.Candidate]: 'Use an existing candidate set',
} as const

export type TExploreKeys = keyof typeof ExploreKeys
