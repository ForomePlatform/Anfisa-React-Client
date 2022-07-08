import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { ExploreTypes } from '@core/enum/explore-types-enum'
import { t } from '@i18n'
import { CardRadioListSection } from '../../../build-flow/components/card-sections/card-radio-list-section'
import {
  exploreCandidateSteps,
  exploreGenomeSteps,
} from '../../../selected-dataset.constants'
import selectedDatasetStore from '../../../selected-dataset.store'

export const CardStartExploreSection = observer((): ReactElement => {
  const handleContinue = (item: string) => {
    selectedDatasetStore.toggleIsBuildFlowVisible(true)

    selectedDatasetStore.updateDefaultWizardStep(item)
    selectedDatasetStore.setExploreType(item)

    if (item === ExploreTypes.Genome) {
      selectedDatasetStore.addWizardStep(exploreGenomeSteps[0])
    } else {
      selectedDatasetStore.addWizardStep(exploreCandidateSteps[0])
    }
  }
  return (
    <div className="w-1/2 pr-12">
      <CardRadioListSection
        title={t('home.startFlow.startWith')}
        optionsList={selectedDatasetStore.startWithOptionsList}
        isEditDisabled={true}
        checkedValue={selectedDatasetStore.exploreType}
        onContinue={item => handleContinue(item)}
      />
    </div>
  )
})
