import { ReactElement, useEffect, useState } from 'react'
import { reaction } from 'mobx'
import { observer } from 'mobx-react-lite'

import { ExploreTypes } from '@core/enum/explore-types-enum'
import { datasetStore } from '@store/dataset'
import { Button } from '@ui/button'
import { CardTitle } from '@ui/card'
import { Radio } from '@ui/radio'
import {
  scenarioForCandidateSet,
  scenarioForWholeGenome,
} from '../../../selected-dataset.scenario'
import selectedDatasetStore from '../../../selected-dataset.store'
import selectedDatasetCardsStore from '../../../wizard.store'

export const CardStartExploreSection = observer((): ReactElement => {
  const [selectedValue, setSelectedValue] = useState(
    datasetStore.isXL ? ExploreTypes.Genome : ExploreTypes.Candidate,
  )

  const onChange = (exploreType: ExploreTypes) => {
    setSelectedValue(exploreType)
  }

  const onContinue = () => {
    selectedDatasetStore.toggleIsBuildFlowVisible(true)

    if (datasetStore.isXL) {
      const scenario =
        selectedValue === ExploreTypes.Genome
          ? scenarioForWholeGenome
          : scenarioForCandidateSet

      selectedDatasetCardsStore.setScenario(scenario)
    }
  }
  useEffect(() => {
    reaction(
      () => datasetStore.dsInfoData,
      data => {
        setSelectedValue(
          data?.kind === 'xl' ? ExploreTypes.Genome : ExploreTypes.Candidate,
        )
      },
    )
  })

  const isExploreGenomeDisabled = !datasetStore.isXL
  const isExploreCandidateDisabled =
    !selectedDatasetStore.secondaryDatasets && datasetStore.isXL

  return (
    <div className="w-1/2 pr-12">
      <>
        <div className="flex items-center justify-between">
          <CardTitle text={'Start with'} className="text-16" />
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
