import { FC } from 'react'
import cn from 'classnames'

import datasetStore from '@store/dataset/dataset'
import dtreeStore from '@store/dtree'
import { Button } from '@ui/button'
import filteringRegimeProvider from '@service-providers/filtering-regime/filtering-regime.provider'

export interface IDebugButtonProps {
  isFullStep: boolean
  stepIndex: number
  unit: string
}

export const DebugButton: FC<IDebugButtonProps> = ({
  stepIndex,
  unit,
  isFullStep,
}) => {
  const indexForApi = dtreeStore.getStepIndexForApi(stepIndex)
  const onClickSendDruidReq = () => {
    filteringRegimeProvider
      .getStatUnits({
        ds: datasetStore.datasetName,
        no: String(indexForApi - (isFullStep ? 2 : 1)),
        rq_id: new Date().toISOString(),
        units: [unit],
        dtree: dtreeStore.currentDtreeName || undefined,
        ctx: { 'druid-rq': 1 },
      })
      .then(res => {
        // eslint-disable-next-line no-console
        console.log(res)
      })
  }

  return (
    <Button
      className={cn(
        'absolute',
        isFullStep ? 'top-[35px]' : 'top-[20px]',
        isFullStep ? 'right-[16px]' : 'right-[-15px]',
      )}
      text="Send request"
      onClick={onClickSendDruidReq}
      size="xs"
    />
  )
}
