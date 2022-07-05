import { ReactElement } from 'react'
import { useHistory } from 'react-router'
import { observer } from 'mobx-react-lite'

import { ExploreTypes } from '@core/enum/explore-types-enum'
import { datasetStore } from '@store/dataset'
import dirinfoStore from '@store/dirinfo'
import { Routes } from '@router/routes.enum'
import { CardTitle } from '@ui/card'
import { Icon } from '@ui/icon'
import { DatasetCard } from '@components/data-testid/dataset-card.cy'
import selectedDatasetStore from './selected-dataset.store'

export const StartFlowHeader = observer(
  ({ goBack }: { goBack: () => void }): ReactElement => {
    const history = useHistory()

    const handleGoHome = () => {
      goBack()
      history.push(Routes.Root)
    }

    return (
      <div className="flex flex-col w-full">
        {/* TODO: find a way to replace div => Button */}
        <div className="flex">
          <div
            onClick={goBack}
            className="flex items-center justify-center w-6 h-6 mr-4 cursor-pointer border border-blue-bright rounded-md"
          >
            <Icon name="Arrow" className="text-blue-bright" />
          </div>

          <CardTitle
            text={dirinfoStore.selectedDirinfoName}
            dataTestId={DatasetCard.datasetHeader}
            className="mr-3 break-words"
            style={{ maxWidth: 'calc(100% - 140px)' }}
          />
        </div>

        <div className="flex mt-3 mb-4 text-14">
          <div
            onClick={handleGoHome}
            className="text-blue-bright cursor-pointer"
          >
            MAIN
          </div>
          <div className="text-blue-bright mx-1">/</div>
          <div onClick={goBack} className="text-blue-bright cursor-pointer">
            Start flow
          </div>

          {!selectedDatasetStore.isEditionExploreType && (
            <div className="flex text-grey-dark">
              <div className="mx-1">/</div>

              {selectedDatasetStore.exploreType === ExploreTypes.Genome
                ? datasetStore.datasetName
                : selectedDatasetStore.selectedSecondaryDataset}
            </div>
          )}
        </div>
      </div>
    )
  },
)
