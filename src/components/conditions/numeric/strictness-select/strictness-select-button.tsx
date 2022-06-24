import { ReactElement } from 'react'
import cn from 'classnames'

import { Icon } from '@ui/icon'
import { IPopoverButtonBaseProps } from '@ui/popover/popover.interface'

interface IStrictnessSelectButtonProps extends IPopoverButtonBaseProps {
  value: boolean
}

export const StrictnessSelectButton = ({
  isOpen,
  disabled,
  onShowPopover,
  value,
}: IStrictnessSelectButtonProps): ReactElement => (
  <button
    className={cn(
      'flex items-center h-8 w-12 p-1 rounded bg-white border border-grey-disabled shadow-input',
      disabled
        ? 'text-grey-blue'
        : 'cursor-pointer text-black  hover:text-blue-bright',
      isOpen && 'text-blue-bright',
    )}
    onClick={e => onShowPopover(e.currentTarget)}
  >
    <span
      className={cn(
        'flex items-center justify-center w-3/5 h-full rounded',
        disabled
          ? 'bg-grey-light text-grey-blue'
          : 'bg-blue-light text-blue-bright',
      )}
    >
      {value ? '≤' : '<'}
    </span>

    <span className="flex items-center justify-center pl-1 w-2/5 h-full">
      <Icon
        name="Arrow"
        size={16}
        className={cn('transform rotate-90 transition-transform', {
          'transform -rotate-90': !isOpen,
        })}
      />
    </span>
  </button>
)
