import { FC, ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { TExploreKeys } from '@core/enum/explore-types-enum'
import { datasetStore } from '@store/dataset'
import { Card } from '@ui/card'
import { ICardProps } from '../../build-flow/components/wizard/wizard.interface'
import wizardStore from '../../build-flow/components/wizard/wizard.store'
import { CardPreviousExploreSection } from './card-previous-explore-section'
import { CardStartExploreSection } from './card-start-explore-section'

export const CardExploreType: FC<Partial<ICardProps>> = observer(
  (props): ReactElement => {
    const { position = 'stretch' } = props
    const isExploreGenomeDisabled = !datasetStore.isXL
    const isExploreCandidateDisabled =
      !wizardStore.secondaryDatasets && datasetStore.isXL

    return (
      <Card className="w-full mt-4 bg-grey-tertiary" position={position}>
        <div className="flex">
          <CardStartExploreSection
            isGenomeDisabled={isExploreGenomeDisabled}
            isCandidateDisabled={isExploreCandidateDisabled}
            {...(props as ICardProps<TExploreKeys>)}
          />

          <CardPreviousExploreSection />
        </div>
      </Card>
    )
  },
)
