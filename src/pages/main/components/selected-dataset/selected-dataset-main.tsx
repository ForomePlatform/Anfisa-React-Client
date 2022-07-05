import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { ExploreCandidateType } from '@core/enum/explore-candidate-type-enum'
import { ExploreGenomeTypes } from '@core/enum/explore-genome-type-enum'
import { ExploreTypes } from '@core/enum/explore-types-enum'
import dirinfoStore from '@store/dirinfo'
import { Card, CardTitle } from '@ui/card'
import { DatasetCard } from '@components/data-testid/dataset-card.cy'
import { DatasetsFieldsList } from './components/dataset-fields-list/dataset-fileds-list'
import { DatasetGeneral } from './components/dataset-general/dataset-general'
import { ChooseExploreSelection } from './components/start-section/choose-explore-selection'
import { DeleteDatasetButton } from './delete-dataset-button'

export const startWithOptionsList = [
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
  ExploreCandidateType.ViewAllVariants,
  ExploreCandidateType.ExploreData,
  ExploreCandidateType.ApplyFilter,
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

export const secondaryDslist = [
  'Ds_name_1',
  'Ds_name_2',
  'Ds_name_3',
  'Ds_name_4',
  'Ds_name_5',
  'Ds_name_6',
  'Ds_name_7',
  'Ds_name_8',
  'Ds_name_9',
  'Ds_name_10',
  'Ds_name_11',
  'Ds_name_12',
  'Ds_name_13',
  'Ds_name_14',
  'Ds_name_15',
  'Ds_name_16',
  'Ds_name_17',
]

export const datasetDescription =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

export const SelectedDatasetMain = observer((): ReactElement => {
  return (
    <div className="flex flex-col flex-grow justify-center">
      <div className="flex flex-col items-start flex-wrap mt-4 px-4">
        <CardTitle
          text={dirinfoStore.selectedDirinfoName}
          dataTestId={DatasetCard.datasetHeader}
          className="mr-3 break-words"
          style={{ maxWidth: 'calc(100% - 140px)' }}
        />

        <ChooseExploreSelection />
      </div>

      <div className="flex-grow grid gap-4 grid-cols-3 p-4 overflow-y-auto">
        <Card className="col-span-1 xl:col-span-3">
          <DatasetGeneral />

          <DeleteDatasetButton className="mt-5" />
        </Card>

        <DatasetsFieldsList />
      </div>
    </div>
  )
})
