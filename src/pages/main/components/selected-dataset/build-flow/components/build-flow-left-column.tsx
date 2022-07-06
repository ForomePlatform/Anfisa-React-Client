import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { Card } from '@ui/card'
import {
  startWithOptionsList,
  whatsNextOptionsList,
} from '../../selected-dataset.constants'
import selectedDatasetStore from '../../selected-dataset.store'
import { CardListSection } from './card-sections/card-list-section'
import { CardRadioListSection } from './card-sections/card-radio-list-section'

interface IBuildFlowLeftColumnProps {
  isGenome: boolean
  isEditionExploreType: boolean
  onContinue: () => void
}

export const BuildFlowLeftColumn = observer(
  ({
    isGenome,
    isEditionExploreType,
    onContinue,
  }: IBuildFlowLeftColumnProps): ReactElement => {
    const isEditDisabled =
      !selectedDatasetStore.secondaryDatasets ||
      !!selectedDatasetStore.isEditionExploreType

    const isRedioDisabled =
      !selectedDatasetStore.secondaryDatasets ||
      !selectedDatasetStore.isEditionExploreType

    const { secondaryDatasets } = selectedDatasetStore
    return (
      <div className="flex flex-col w-1/2 pr-2">
        <Card>
          <CardRadioListSection
            title={'Start with'}
            optionsList={startWithOptionsList}
            isContinueDisabled={!selectedDatasetStore.isEditionExploreType}
            isEditDisabled={isEditDisabled}
            isRadioDisabled={isRedioDisabled}
            checkedValue={selectedDatasetStore.exploreType}
            onEdit={() => selectedDatasetStore.toggleIsEditionExploreType(true)}
            onChange={value => selectedDatasetStore.setExploreType(value)}
            onContinue={onContinue}
          />
        </Card>

        {!isGenome && !isEditionExploreType && (
          <Card className="mt-4 px-0">
            <CardListSection
              title={'Existing candidate sets'}
              optionsList={secondaryDatasets}
              onSelect={value =>
                selectedDatasetStore.setSecondaryDataset(value)
              }
              selectedItem={selectedDatasetStore.selectedSecondaryDataset}
              style={{ maxHeight: 'calc(100vh - 403px)' }}
            />
          </Card>
        )}

        {isGenome && !isEditionExploreType && (
          <Card className="mt-4">
            <CardRadioListSection
              title={'Whats next?'}
              optionsList={whatsNextOptionsList}
              isContinueDisabled={!!selectedDatasetStore.isEditionExploreGenome}
              isEditDisabled={!selectedDatasetStore.isEditionExploreGenome}
              isRadioDisabled={!!selectedDatasetStore.isEditionExploreGenome}
              checkedValue={selectedDatasetStore.exploreGenomeType}
              onEdit={() =>
                selectedDatasetStore.toggleIsEditionExploreGenome(false)
              }
              onChange={value =>
                selectedDatasetStore.setExploreGenomeType(value)
              }
              onContinue={() =>
                selectedDatasetStore.toggleIsEditionExploreGenome(true)
              }
            />
          </Card>
        )}
      </div>
    )
  },
)
