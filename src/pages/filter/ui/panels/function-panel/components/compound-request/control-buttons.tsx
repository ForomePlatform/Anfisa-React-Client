import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { RequestBlockOperations } from '@core/enum/request-block-operations'
import filterStore from '@store/filter'
import { Button } from '@ui/button'
import compoundRequestStore from './compound-request.store'

interface IControlButtonsProps {
  activeRequestIndex: number
}

export const ControlButtons = observer(
  ({ activeRequestIndex }: IControlButtonsProps): ReactElement => (
    <div className="flex">
      <Button
        onClick={() => {
          compoundRequestStore.handleRequestBlocksAmount(
            RequestBlockOperations.Add,
            activeRequestIndex,
          )
          filterStore.setIsChanged()
        }}
        text="Add"
        variant="secondary"
        className={cn('mr-4')}
        disabled={compoundRequestStore.requestCondition.length === 5}
      />

      <Button
        onClick={() => {
          compoundRequestStore.handleRequestBlocksAmount(
            RequestBlockOperations.Remove,
            activeRequestIndex,
          )
          filterStore.setIsChanged()
        }}
        text="Remove"
        variant="secondary"
        className={cn(
          'border-red-secondary hover:text-white hover:bg-red-secondary',
        )}
        disabled={compoundRequestStore.requestCondition.length === 1}
      />
    </div>
  ),
)
