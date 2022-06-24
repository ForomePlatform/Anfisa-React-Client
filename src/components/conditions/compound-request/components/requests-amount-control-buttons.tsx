import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { RequestBlockOperations } from '@core/enum/request-block-operations'
import { Button } from '@ui/button'
import { TRequestCondition } from '@service-providers/common'

interface IControlButtonsProps {
  activeRequestIndex: number
  requestCondition: TRequestCondition[]
  handleChangeRequestsAmount: (type: string, activeRequestIndex: number) => void
  onTouch?: () => void
}

export const RequestsAmountControlButtons = observer(
  ({
    handleChangeRequestsAmount,
    onTouch,
    activeRequestIndex,
    requestCondition,
  }: IControlButtonsProps): ReactElement => (
    <div className="flex">
      <Button
        onClick={() => {
          handleChangeRequestsAmount(
            RequestBlockOperations.Remove,
            activeRequestIndex,
          )
          onTouch?.()
        }}
        text="Remove"
        variant="diestruction"
        disabled={requestCondition.length === 1}
      />

      <Button
        onClick={() => {
          handleChangeRequestsAmount(
            RequestBlockOperations.Add,
            activeRequestIndex,
          )
          onTouch?.()
        }}
        text="Add"
        variant="secondary"
        className="ml-2"
        disabled={requestCondition.length === 5}
      />
    </div>
  ),
)
