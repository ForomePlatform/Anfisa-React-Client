import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { Card } from '@ui/card'
import { CardListSection } from './components/start-section/card-list-section'
import { CardRadioSection } from './components/start-section/card-radio-section'
import {
  secondaryDslist,
  startWithOptionsList,
  whatsNextOptionsList,
} from './selected-dataset.constants'
import selectedDatasetStore from './selected-dataset.store'

interface IStartFlowLeftColumnProps {
  isGenome: boolean
  isEditionExploreType: boolean
  onContinue: () => void
}

export const StartFlowLeftColumn = observer(
  ({
    isGenome,
    isEditionExploreType,
    onContinue,
  }: IStartFlowLeftColumnProps): ReactElement => {
    return (
      <div className="flex flex-col w-1/2 pr-2">
        <Card>
          <CardRadioSection
            title={'Start with'}
            optionsList={startWithOptionsList}
            isContinueDisabled={!selectedDatasetStore.isEditionExploreType}
            isEditDisabled={
              !selectedDatasetStore.secondaryDatasets ||
              !!selectedDatasetStore.isEditionExploreType
            }
            isRadioDisabled={
              !selectedDatasetStore.secondaryDatasets ||
              !selectedDatasetStore.isEditionExploreType
            }
            checkedValue={selectedDatasetStore.exploreType}
            onEdit={() => selectedDatasetStore.toggleIsEditionExploreType(true)}
            onChange={value => selectedDatasetStore.setExploreType(value)}
            onContinue={onContinue}
          />
        </Card>

        {!isGenome && !isEditionExploreType && (
          <>
            <Card className="mt-4 px-0">
              <CardListSection
                title={'Existing candidate sets'}
                optionsList={secondaryDslist}
                onSelect={value =>
                  selectedDatasetStore.setSecondaryDataset(value)
                }
                selectedItem={selectedDatasetStore.selectedSecondaryDataset}
                style={{ maxHeight: 'calc(100vh - 403px)' }}
              />
            </Card>
          </>
        )}

        {isGenome && !isEditionExploreType && (
          <>
            <Card className="mt-4">
              <CardRadioSection
                title={'Whats next?'}
                optionsList={whatsNextOptionsList}
                isContinueDisabled={
                  !!selectedDatasetStore.isEditionExploreGenome
                }
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
          </>
        )}
      </div>
    )
  },
)
