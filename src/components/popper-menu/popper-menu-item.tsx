import React from 'react'
import cn, { Argument } from 'classnames'

import { Icon, TIcons } from '@ui/icon'

export interface IPopperMenuItemProps {
  iconName?: TIcons
  className?: Argument
  onClick?: () => void
  isDisabled?: boolean
}

export const PopperMenuItem = ({
  children,
  iconName,
  className,
  onClick,
  isDisabled = false,
}: React.PropsWithChildren<IPopperMenuItemProps>) => {
  return (
    <span
      className={cn(
        'py-1',
        'px-2',
        'rounded',
        {
          'hover:bg-blue-light': !isDisabled,
          'cursor-default pointer-events-none opacity-50': isDisabled,
          'flex justify-between': !!iconName,
        },
        className,
      )}
      onClick={onClick}
    >
      {children}
      {iconName && (
        <span className="ml-2">
          <Icon name={iconName} className={'text-grey-blue'} />
        </span>
      )}
    </span>
  )
}