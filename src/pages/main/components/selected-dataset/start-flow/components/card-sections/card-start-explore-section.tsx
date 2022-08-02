import { ReactElement, useState } from 'react'
import { observer } from 'mobx-react-lite'

import {
  ExploreKeys,
  ExploreTypesDictionary,
  TExploreKeys,
} from '@core/enum/explore-types-enum'
import { datasetStore } from '@store/dataset'
import { Button } from '@ui/button'
import { CardTitle } from '@ui/card'
import { useRadioListData } from '../../../build-flow/components/cards/components/card-radio.hooks'
import { CardRadioList } from '../../../build-flow/components/cards/components/card-radio-list'
import { wizardScenarios } from '../../../build-flow/components/wizard/scenarios/wizard-scenarious'
import wizardStore from '../../../build-flow/components/wizard/wizard.store'

export const CardStartExploreSection = observer((): ReactElement => {
  const [selectedValue, setSelectedValue] = useState<TExploreKeys>(
    ExploreKeys.Genome,
  )
  const onChange = (exploreType: TExploreKeys) => {
    setSelectedValue(exploreType)
  }

  const onContinue = () => {
    wizardStore.toggleIsWizardVisible(true)
    const scenario =
      selectedValue === ExploreKeys.Genome
        ? wizardScenarios.XlWholeGenome
        : wizardScenarios.XlCandidateSet

    wizardStore.setScenario(scenario)
  }

  const isExploreGenomeDisabled = !datasetStore.isXL
  const isExploreCandidateDisabled =
    !wizardStore.secondaryDatasets && datasetStore.isXL

  const startExploreData = useRadioListData<TExploreKeys>(
    ExploreTypesDictionary,
  )

  return (
    <div className="w-1/2 pr-12">
      <>
        <div className="flex items-center justify-between">
          <CardTitle text={'Start with'} />
        </div>

        <div className="mt-2 text-14">
          <CardRadioList<TExploreKeys>
            data={startExploreData}
            onChange={value => onChange(value)}
            selectedOption={selectedValue}
            disabledOptions={{
              [ExploreKeys.Candidate]: isExploreCandidateDisabled,
              [ExploreKeys.Genome]: isExploreGenomeDisabled,
            }}
          />

          <div className="flex justify-end">
            <Button text="Continue" onClick={onContinue} disabled={false} />
          </div>
        </div>
      </>
    </div>
  )
})
