import { ReactNode } from 'react'

import { IModalBaseProps } from '@ui/modal'
import { Placement } from '@popperjs/core'

export interface IPopoverBaseProps
  extends Omit<IModalBaseProps, 'transitionDuration' | 'isBackdropInvisible'> {
  anchorEl?: HTMLElement | null
}

export interface IPopoverProps extends IPopoverBaseProps {
  modalClassName?: string
  transitionDuration?: number
  className?: string
  placement?: Placement
  offset?: [number | null | undefined, number | null | undefined]
  children: ReactNode
}

export interface IPopoverButtonBaseProps {
  isOpen?: boolean
  disabled?: boolean
  onShowPopover: (target: HTMLElement) => void
}
