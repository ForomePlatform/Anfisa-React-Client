import { observer } from 'mobx-react-lite'

import defaultsStore from '@store/defaults'
import { Card, CardTitle } from '@ui/card'
import { Loader } from '@ui/loader'
import { secondaryDsNameByKey } from '../secondary-ds-name-by-key'
import { ICardProps } from '../wizard/wizard.interface'
import wizardStore from '../wizard/wizard.store'

export const ExistingCandidatesCard = observer((props: ICardProps) => {
  const { title, id, maxHeight, position } = props
  const { isFetchingDropDs } = defaultsStore
  const { secondaryDatasets } = wizardStore

  const onSelect = (ds: string) => {
    wizardStore.setSelectedDataset(ds, id)
  }

  return (
    <Card
      isNeedToAnimate={wizardStore.isNeedToAnimateCard(id)}
      className="mt-4 !px-0"
      position={position}
    >
      <CardTitle text={title} className="px-4" />

      {isFetchingDropDs ? (
        <Loader size="m" />
      ) : (
        <div
          className="mb-4 mt-2 text-14 overflow-y-auto"
          style={{ maxHeight: maxHeight }}
        >
          {secondaryDatasets?.map(
            secondaryDsNameByKey(1, onSelect, wizardStore.selectedDataset),
          )}
        </div>
      )}
    </Card>
  )
})
