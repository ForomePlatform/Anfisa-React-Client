import { FC, ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { TExploreKeys } from '@core/enum/explore-types-enum'
import { Card } from '@ui/card'
import { ICardProps } from '../../build-flow/components/wizard/wizard.interface'
import { CardPreviousExploreSection } from './card-previous-explore-section'
import { CardStartExploreSection } from './card-start-explore-section'

export const CardExploreType: FC<Partial<ICardProps>> = observer(
  (props): ReactElement => {
    const { position = 'stretch' } = props

    return (
      <Card
        className="w-full mt-4 bg-grey-tertiary min-h-[162px]"
        position={position}
      >
        <div className="flex">
          <CardStartExploreSection {...(props as ICardProps<TExploreKeys>)} />

          <CardPreviousExploreSection />
        </div>
      </Card>
    )
  },
)
