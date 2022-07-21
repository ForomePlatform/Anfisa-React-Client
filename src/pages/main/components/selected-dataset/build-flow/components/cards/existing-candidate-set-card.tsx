import { observer } from 'mobx-react-lite'

import { Card, CardTitle } from '@ui/card'
import { secondaryDsNameByKey } from '../secondary-ds-name-by-key'
import { ICardProps } from '../wizard/wizard.interface'
import wizardStore from '../wizard/wizard.store'

export const ExistingCandidatesCard = observer((props: ICardProps) => {
  const { title, id, maxHeight } = props
  const secodaryDatasets = wizardStore.secondaryDatasets
  const onSelect = (ds: string) => {
    wizardStore.setSelectedDataset(ds, id)
  }

  return (
    <Card className="mt-4" style={{ paddingLeft: 0, paddingRight: 0 }}>
      <CardTitle text={title} className="px-4" />

      <div
        className="mb-4 mt-2 text-14 overflow-y-auto"
        style={{ maxHeight: maxHeight }}
      >
        {secodaryDatasets?.map(
          secondaryDsNameByKey(1, onSelect, wizardStore.selectedDataset),
        )}
      </div>
    </Card>
  )
})
