import { FC, ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { datasetStore } from '@store/dataset'
import { Card } from '@ui/card'
import { ICardProps } from '../../wizard/wizard.interface'
import wizardStore from '../../wizard/wizard.store'
import { CardPreviousExploreSection } from './card-previous-explore-section'
import { CardStartExploreSection } from './card-start-explore-section'

interface ICardExploreTypeProps {}

export const CardExploreType: FC<Partial<ICardProps>> = observer(
  (): ReactElement => {
    const isExploreGenomeDisabled = !datasetStore.isXL
    const isExploreCandidateDisabled =
      !wizardStore.secondaryDatasets && datasetStore.isXL

    return (
      <Card className="w-full mt-4 bg-grey-tertiary">
        <div className="flex">
          <CardStartExploreSection
            isGenomeDisabled={isExploreGenomeDisabled}
            isCandidateDisabled={isExploreCandidateDisabled}
          />

          <CardPreviousExploreSection />
        </div>
      </Card>
    )
  },
)
