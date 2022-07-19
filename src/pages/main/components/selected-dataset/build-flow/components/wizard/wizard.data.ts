import { ExploreCandidateTypes } from '@core/enum/explore-candidate-types-enum'
import { ExploreGenomeTypes } from '@core/enum/explore-genome-types-enum'
import { ExploreTypes } from '@core/enum/explore-types-enum'

export const startFlowOptionsList = [
  ExploreTypes.Genome,
  ExploreTypes.Candidate,
]

export const whatsNextOptionsList = [
  ExploreGenomeTypes.ACMG,
  ExploreGenomeTypes.Phenotype,
  ExploreGenomeTypes.GeneticAnalysis,
  ExploreGenomeTypes.ExploreData,
  ExploreGenomeTypes.BuildInclusionExclusion,
]

export const exploreCandidateOptionsList = [
  ExploreCandidateTypes.ViewAllVariants,
  ExploreCandidateTypes.ExploreData,
  ExploreCandidateTypes.ApplyFilter,
]

export const optionsForOpenButton = [
  'Explore data or build new filter',
  'Build inclusion/exclusion critetira',
  'View all variants',
  'Explore data or build new filter',
]
