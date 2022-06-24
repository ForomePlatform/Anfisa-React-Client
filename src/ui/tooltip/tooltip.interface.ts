import { ReactElement, Ref } from 'react'

import { Placement } from '@popperjs/core'

export type TTooltipPlacement = Placement

export type TTooltipChild = ReactElement & {
  ref?: Ref<HTMLElement>
}

export type TTooltipTrigger = 'hover' | 'click'

export type TTooltipTheme = 'light' | 'dark'

export type TTooltipWidth = number | 'auto'

export type TTooltipOptions = {
  enterDelay: number
  leaveDelay: number
  placement: TTooltipPlacement
  theme: TTooltipTheme
  maxWidth: TTooltipWidth
}
