import { RefObject, useEffect, useRef } from 'react'

import {
  setupClickTooltipEvents,
  setupHoverTooltipEvents,
} from '@ui/tooltip/tooltip.utils'
import { TTooltipOptions, TTooltipTrigger } from './tooltip.interface'

export const useTooltip = (
  element: HTMLElement | null,
  tooltipRef: RefObject<HTMLElement | string>,
  trigger: TTooltipTrigger,
  options: TTooltipOptions,
) => {
  const optionsRef = useRef(options)
  optionsRef.current = options

  useEffect(() => {
    if (element) {
      if (trigger === 'hover') {
        return setupHoverTooltipEvents(element, tooltipRef, optionsRef)
      } else {
        return setupClickTooltipEvents(element, tooltipRef, optionsRef)
      }
    }
  }, [element, tooltipRef, trigger])
}
