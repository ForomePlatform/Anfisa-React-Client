import React, { useRef } from 'react'

import { useOutsideClick } from '@core/hooks/use-outside-click'
import cn, { Argument } from 'classnames'

export interface ISimplePopperModalProps {
  close: () => void
  className?: Argument
}

export const SimplePopperModal = ({
  close,
  children,
  className,
}: React.PropsWithChildren<ISimplePopperModalProps>) => {
  const ref = useRef<any>(null)
  useOutsideClick(ref, close)

  return (
    <div
      ref={ref}
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
