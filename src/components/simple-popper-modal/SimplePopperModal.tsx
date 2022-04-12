import React, { useRef } from 'react'

import { useOutsideClick } from '@core/hooks/use-outside-click'

export interface ISimplePopperModalProps
  extends React.HTMLAttributes<HTMLDivElement> {
  close: () => void
}

export const SimplePopperModal = ({
  close,
  children,
  ...rest
}: React.PropsWithChildren<ISimplePopperModalProps>) => {
  const ref = useRef<any>(null)
  useOutsideClick(ref, close)

  return (
    <div
      ref={ref}
      {...rest}
      className={`bg-white text-black rounded shadow-card text-12 cursor-pointer flex flex-col ${rest.className}`}
    >
      {children}
    </div>
  )
}
