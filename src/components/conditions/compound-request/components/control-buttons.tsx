import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { RequestBlockOperations } from '@core/enum/request-block-operations'
import { Button } from '@ui/button'
import { TRequestCondition } from '@service-providers/common'

interface IControlButtonsProps {
  handleRequestBlocksAmount: (type: string, activeRequestIndex: number) => void
  activeRequestIndex: number
  onTouch?: () => void
  requestCondition: TRequestCondition[]
}

export const ControlButtons = observer(
  ({
    handleRequestBlocksAmount,
    onTouch,
    activeRequestIndex,
    requestCondition,
  }: IControlButtonsProps): ReactElement => (
    <div className="flex">
      <Button
        onClick={() => {
          handleRequestBlocksAmount(
            RequestBlockOperations.Add,
            activeRequestIndex,
          )
          onTouch?.()
        }}
        text="Add"
        variant="secondary"
        className={cn('mr-4')}
        disabled={requestCondition.length === 5}
      />

      <Button
        onClick={() => {
          handleRequestBlocksAmount(
            RequestBlockOperations.Remove,
            activeRequestIndex,
          )
          onTouch?.()
        }}
        text="Remove"
        variant="diestruction"
        disabled={requestCondition.length === 1}
      />
    </div>
  ),
)
