import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import dirinfoStore from '@store/dirinfo'
import { Card, CardTitle } from '@ui/card'
import { DatasetCard } from '@components/data-testid/dataset-card.cy'
import { DatasetsFieldsList } from './components/dataset-fields-list/dataset-fileds-list'
import { DatasetGeneral } from './components/dataset-general/dataset-general'
import { ChooseExploreSelection } from './components/start-section/choose-explore-selection'
import { DeleteDatasetButton } from './delete-dataset-button'

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
