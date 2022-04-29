import { ReactElement, ReactNode, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePopper } from 'react-popper'

import { useOutsideClick } from '@core/hooks/use-outside-click'
import { Placement } from '@popperjs/core'
import { PopoverRoot } from './popover.styles'

interface IPopoverProps {
  isOpen?: boolean
  onClose?: () => void
  anchorEl?: HTMLElement | null
  placement?: Placement
  offset?: [number | null | undefined, number | null | undefined]
  rootElement?: HTMLElement
  children: ReactNode
}

export const Popover = ({
  isOpen,
  onClose,
  anchorEl,
  placement = 'bottom-start',
  offset,
  rootElement = document.body,
  children,
}: IPopoverProps): ReactElement => {
  const [popperEl, setPopperEl] = useState<HTMLDivElement | null>(null)
  const popperRef = useRef(popperEl)
  popperRef.current = popperEl

  useOutsideClick(popperRef, onClose)

  const { styles, attributes } = usePopper(anchorEl, popperEl, {
    placement,
    modifiers: [
      {
        enabled: !!offset,
        name: 'offset',
        options: {
          offset,
        },
      },
    ],
  })

  return (
    <>
      {isOpen &&
        createPortal(
          <PopoverRoot
            style={styles.popper}
            ref={setPopperEl}
            {...attributes.popper}
          >
            {children}
          </PopoverRoot>,
          rootElement,
        )}
    </>
  )
}
