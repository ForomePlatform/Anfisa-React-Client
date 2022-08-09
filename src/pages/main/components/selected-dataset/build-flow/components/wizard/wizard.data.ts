import {
  ExploreCandidateKeys,
  TExploreCandidateKeys,
} from '@core/enum/explore-candidate-types-enum'
import {
  ExploreGenomeKeys,
  TExploreGenomeKeys,
} from '@core/enum/explore-genome-types-enum'

export const optionsForOpenButton: (
  | TExploreGenomeKeys
  | TExploreCandidateKeys
)[] = [
  ExploreCandidateKeys.ExploreData,
  ExploreGenomeKeys.BuildInclusionExclusion,
  ExploreCandidateKeys.ViewAllVariants,
]
