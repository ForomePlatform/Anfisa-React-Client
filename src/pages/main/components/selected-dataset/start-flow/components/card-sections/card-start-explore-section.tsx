import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { CardRadioListSection } from '../../../build-flow/components/card-sections/card-radio-list-section'
import { startWithOptionsList } from '../../../selected-dataset.constants'
import selectedDatasetStore from '../../../selected-dataset.store'

interface ICardStartExploreSectionProps {
  onContinue: () => void
}

export const CardStartExploreSection = observer(
  ({ onContinue }: ICardStartExploreSectionProps): ReactElement => (
    <div className="w-1/2 pr-12">
      <CardRadioListSection
        title={t('home.startFlow.startWith')}
        optionsList={startWithOptionsList}
        isContinueDisabled={false}
        isEditDisabled={false}
        isRadioDisabled={!selectedDatasetStore.secondaryDatasets}
        checkedValue={selectedDatasetStore.exploreType}
        onChange={value => selectedDatasetStore.setExploreType(value)}
        onContinue={onContinue}
      />
    </div>
  ),
)
