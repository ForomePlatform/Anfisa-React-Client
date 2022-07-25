import { ReactElement, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { ExploreTypes } from '@core/enum/explore-types-enum'
import { datasetStore } from '@store/dataset'
import { Button } from '@ui/button'
import { CardTitle } from '@ui/card'
import { Radio } from '@ui/radio'
import { wizardScenarios } from '../../../build-flow/components/wizard/scenarios/wizard-scenarious'
import wizardStore from '../../../build-flow/components/wizard/wizard.store'

export const CardStartExploreSection = observer((): ReactElement => {
  const [selectedValue, setSelectedValue] = useState(ExploreTypes.Genome)
  const onChange = (exploreType: ExploreTypes) => {
    setSelectedValue(exploreType)
  }

  const onContinue = () => {
    wizardStore.toggleIsWizardVisible(true)
    const scenario =
      selectedValue === ExploreTypes.Genome
        ? wizardScenarios.XlWholeGenome
        : wizardScenarios.XlCandidateSet

    wizardStore.setScenario(scenario)
  }

  const isExploreGenomeDisabled = !datasetStore.isXL
  const isExploreCandidateDisabled =
    !wizardStore.secondaryDatasets && datasetStore.isXL

  return (
    <div className="w-1/2 pr-12">
      <>
        <div className="flex items-center justify-between">
          <CardTitle text={'Start with'} />
        </div>

        <div className="mt-2 text-14">
          <div className="flex mb-2">
            <Radio
              className="flex items-center"
              checked={selectedValue === ExploreTypes.Genome}
              onChange={() => onChange(ExploreTypes.Genome)}
              disabled={isExploreGenomeDisabled}
            >
              <div className="ml-1.5">{ExploreTypes.Genome}</div>
            </Radio>
          </div>

          <div className="flex mb-2">
            <Radio
              className="flex items-center"
              checked={selectedValue === ExploreTypes.Candidate}
              onChange={() => onChange(ExploreTypes.Candidate)}
              disabled={isExploreCandidateDisabled}
            >
              <div className="ml-1.5">{ExploreTypes.Candidate}</div>
            </Radio>
          </div>

          <div className="flex justify-end">
            <Button text="Continue" onClick={onContinue} disabled={false} />
          </div>
        </div>
      </>
    </div>
  )
})
