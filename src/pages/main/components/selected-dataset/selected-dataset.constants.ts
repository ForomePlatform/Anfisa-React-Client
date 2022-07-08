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

export const relevantPresetsList = [
  'Preset_name_1',
  'Preset_name_2',
  'Preset_name_3',
  'Preset_name_4',
  'Preset_name_5',
  'Preset_name_6',
  'Preset_name_7',
  'Preset_name_8',
  'Preset_name_9',
  'Preset_name_10',
  'Preset_name_11',
  'Preset_name_12',
  'Preset_name_13',
  'Preset_name_14',
  'Preset_name_15',
  'Preset_name_16',
  'Preset_name_17',
]

export const datasetDescription =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

export const exploreGenomeSteps = [
  {
    title: "What's next?",
    type: 'radioList',
    value: ExploreGenomeTypes.ACMG,
    hidden: false,
    optionsList: whatsNextOptionsList,
  },

  {
    title: 'Relevant presets',
    type: 'list',
    value: '',
    hidden: false,
    optionsList: relevantPresetsList,
  },
]

export const exploreCandidateSteps = [
  {
    title: 'Existing candidate set',
    type: 'list',
    value: '',
    hidden: false,
    optionsList: [],
  },

  {
    title: '',
    type: 'radioList',
    description: datasetDescription,
    value: ExploreCandidateTypes.ViewAllVariants,
    hidden: false,
    optionsList: exploreCandidateOptionsList,
  },

  {
    title: 'Additional preset filters',
    type: 'list',
    value: '',
    hidden: false,
    optionsList: relevantPresetsList,
  },
]

export const stepsForXlDatasets = {
  'Whole genome/exome': exploreGenomeSteps,
  'Use an existing candidate set': exploreCandidateSteps,
}

export const stepsForWsDatasets = {
  'Use an existing candidate set': exploreCandidateSteps,
}

export const optionsForOpenButton = [
  'Explore data or build new filter',
  'Build inclusion/exclusion critetira',
  'View all variants',
  'Explore data or build new filter',
]
