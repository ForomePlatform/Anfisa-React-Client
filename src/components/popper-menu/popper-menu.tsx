import React from 'react'
import cn, { Argument } from 'classnames'

export interface IPopperMenuProps {
  close?: () => void
  className?: Argument
}

export const PopperMenu = ({
  children,
  className,
}: React.PropsWithChildren<IPopperMenuProps>) => {
  return (
    <div
      className={cn(
        'bg-white',
        'text-black',
        'rounded',
        'shadow-card',
        'cursor-pointer',
        'text-12',
        'flex',
        'flex-col',
        className,
      )}
    >
      {children}
    </div>
  )
}
