import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import dirinfoStore from '@store/dirinfo'
import { Card, CardTitle } from '@ui/card'
import { DatasetCard } from '@data-testid'
import { isDev } from '@pages/main/main.constants'
import { WizardCardIds } from '../build-flow/components/wizard/scenarios/wizard-scenarios.constants'
import wizardStore from '../build-flow/components/wizard/wizard.store'
import { CardExploreType } from '../components/card-explore/card-explore-type'
import { OpenViewer } from '../components/open-viewer'
import { DatasetsFieldsList } from './components/dataset-fields-list/dataset-fileds-list'
import { DatasetGeneral } from './components/dataset-general/dataset-general'
import { DeleteDatasetButton } from './components/delete-dataset-button'

export const SelectedDatasetStartFlow = observer(
  (): ReactElement => (
    <div className="flex flex-col flex-grow justify-center">
      <div className="flex flex-col items-start flex-wrap mt-4 px-4">
        <div className="flex items-center">
          <CardTitle
            text={dirinfoStore.selectedDirinfoName}
            dataTestId={DatasetCard.datasetHeader}
            className="mr-3 break-words"
            size="md"
          />

          {isDev && <OpenViewer />}
        </div>

        <CardExploreType
          selectedValue={wizardStore.startWithOption}
          editDisabled={true}
          id={WizardCardIds.StartFull}
        />
      </div>

      <div className="flex-grow grid gap-4 grid-cols-4 p-4 overflow-y-auto">
        <Card
          className="col-span-2"
          style={{ paddingLeft: 0, paddingRight: 0 }}
          position={'stretch'}
        >
          <DatasetGeneral />

          <DeleteDatasetButton className="mt-5" />
        </Card>

        <DatasetsFieldsList />
      </div>
    </div>
  ),
)
