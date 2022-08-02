import {
  ExploreCandidateKeys,
  TExploreCandidateKeys,
} from '@core/enum/explore-candidate-types-enum'
import {
  ExploreGenomeKeys,
  TExploreGenomeKeys,
} from '@core/enum/explore-genome-types-enum'
import { ExploreTypesDictionary } from '@core/enum/explore-types-enum'

export const startFlowOptionsList = Object.values(ExploreTypesDictionary)

export const optionsForOpenButton: (
  | TExploreGenomeKeys
  | TExploreCandidateKeys
)[] = [
  ExploreCandidateKeys.ExploreData,
  ExploreGenomeKeys.BuildInclusionExclusion,
  ExploreCandidateKeys.ViewAllVariants,
]
