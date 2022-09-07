import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'

import defaultsStore from '@store/defaults'
import { Card, CardTitle } from '@ui/card'
import { Loader } from '@ui/loader'
import { PresetsInfoCard } from '@pages/main/components/selected-dataset/build-flow/components/cards/presets-info-card/presets-info-card'
import { secondaryDsNameByKey } from '../wizard/secondary-ds-item'
import { ICardProps } from '../wizard/wizard.interface'
import wizardStore from '../wizard/wizard.store'

const HEIGHT_ABOVE = 432

export const ExistingCandidatesCard = observer(
  ({ title, id, maxHeight, position }: ICardProps) => {
    const ref = useRef<HTMLDivElement>(null)

    const [height, setHeight] = useState<number>(0)

    const { isFetchingDropDs } = defaultsStore
    const { secondaryDatasets } = wizardStore
    const card = useMemo(
      () => wizardStore.wizardScenario.find(card => card.id === id),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [id, wizardStore.wizardScenario],
    )

    const onSelect = (ds: string) => {
      wizardStore.setSelectedDataset(ds, id)
    }

    useLayoutEffect(() => {
      setHeight(HEIGHT_ABOVE + (ref.current?.clientHeight ?? 0))
    }, [])

    return (
      <>
        <Card
          isNeedToAnimate={wizardStore.isNeedToAnimateCard(id)}
          className="mt-4 !px-0"
          position={position}
          innerRef={ref}
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
                secondaryDsNameByKey(onSelect, wizardStore.selectedDataset),
              )}
            </div>
          )}
        </Card>

        {!!card?.selectedValue && (
          <PresetsInfoCard maxHeight={`calc(100vh - ${height}px)`} />
        )}
      </>
    )
  },
)
