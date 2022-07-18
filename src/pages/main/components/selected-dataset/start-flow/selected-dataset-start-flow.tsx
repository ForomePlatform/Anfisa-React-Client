import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import dirinfoStore from '@store/dirinfo'
import { Card, CardTitle } from '@ui/card'
import { DatasetCard } from '@components/data-testid/dataset-card.cy'
import { isDev } from '@pages/main/main.constants'
import { OpenViewer } from '../components/open-viewer'
import { CardExploreType } from './components/card-sections/card-explore-type'
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
          />

          {isDev && <OpenViewer />}
        </div>

        <CardExploreType />
      </div>

      <div className="flex-grow grid gap-4 grid-cols-3 p-4 overflow-y-auto">
        <Card className="col-span-1 xl:col-span-3">
          <DatasetGeneral />

          <DeleteDatasetButton className="mt-5" />
        </Card>

        <DatasetsFieldsList />
      </div>
    </div>
  ),
)
