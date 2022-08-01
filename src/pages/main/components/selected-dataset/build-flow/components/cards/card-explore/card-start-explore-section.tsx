import { FC, ReactElement, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { ExploreTypes } from '@core/enum/explore-types-enum'
import { Button } from '@ui/button'
import { CardTitle } from '@ui/card'
import { Radio } from '@ui/radio'
import { wizardScenarios } from '../../wizard/scenarios/wizard-scenarious'
import wizardStore from '../../wizard/wizard.store'

interface ICardStartExploreSectionProps {
  isGenomeDisabled: boolean
  isCandidateDisabled: boolean
}

export const CardStartExploreSection: FC<ICardStartExploreSectionProps> =
  observer(({ isCandidateDisabled, isGenomeDisabled }): ReactElement => {
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
                disabled={isGenomeDisabled}
              >
                <div className="ml-1.5">{ExploreTypes.Genome}</div>
              </Radio>
            </div>

            <div className="flex mb-2">
              <Radio
                className="flex items-center"
                checked={selectedValue === ExploreTypes.Candidate}
                onChange={() => onChange(ExploreTypes.Candidate)}
                disabled={isCandidateDisabled}
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
