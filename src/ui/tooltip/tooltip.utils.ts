import styles from './tooltip.module.css'

import { RefObject } from 'react'
import cn from 'classnames'

import {
  TTooltipOptions,
  TTooltipTheme,
  TTooltipWidth,
} from '@ui/tooltip/tooltip.interface'
import { createPopper, Instance } from '@popperjs/core'

let globalTooltipEl: HTMLElement
let tooltipContentEl: HTMLElement
let tooltipArrowEl: HTMLElement

const createTooltipEl = (): void => {
  if (!globalTooltipEl) {
    globalTooltipEl = document.createElement('div')
    globalTooltipEl.innerHTML = `<div class='${styles.tooltip__arrow}'></div><div class='${styles.tooltip__content}'></div>`
    globalTooltipEl.className = styles.tooltip
    tooltipArrowEl = globalTooltipEl.firstChild as HTMLElement
    tooltipContentEl = globalTooltipEl.lastChild as HTMLElement
    document.body.appendChild(globalTooltipEl)
  }
}

const showTooltipEl = (
  content: string,
  theme: TTooltipTheme,
  maxWidth: TTooltipWidth,
): HTMLElement => {
  tooltipContentEl.innerHTML = content
  globalTooltipEl.className = cn(
    styles.tooltip,
    styles[`tooltip_${theme}`],
    styles.tooltip_shown,
  )
  globalTooltipEl.style.maxWidth =
    typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth

  return globalTooltipEl
}
const hideTooltipEl = (): void => {
  if (globalTooltipEl) {
    globalTooltipEl.classList.remove(styles.tooltip_shown)
  }
}

const showTooltip = (
  element: HTMLElement,
  tooltip: HTMLElement | string,
  options: TTooltipOptions,
): Instance => {
  const { placement, theme, maxWidth } = options
  const tooltipEl = showTooltipEl(
    typeof tooltip === 'string' ? tooltip : tooltip.innerHTML,
    theme,
    maxWidth,
  )
  const skidding =
    placement.endsWith('start') || placement.endsWith('end') ? -6 : 0

  return createPopper(element, tooltipEl, {
    placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [skidding, 8],
        },
      },
      {
        name: 'arrow',
        options: {
          element: tooltipArrowEl,
          padding: 4,
        },
      },
    ],
  })
}

const hideTooltip = (popperInstance: Instance | null) => {
  if (popperInstance) {
    popperInstance.destroy()
    popperInstance = null
  }
  hideTooltipEl()
}

export const setupHoverTooltipEvents = (
  element: HTMLElement,
  tooltipRef: RefObject<HTMLElement | string>,
  optionsRef: RefObject<TTooltipOptions>,
): (() => void) => {
  createTooltipEl()

  let enterTimeout: number = -1
  let leaveTimeout: number = -1
  let popperInstance: Instance | null = null

  const enterHandler = () => {
    window.clearTimeout(leaveTimeout)

    const options = optionsRef.current
    const tooltip = tooltipRef.current

    if (!tooltip || !options) {
      return
    }

    enterTimeout = window.setTimeout(() => {
      popperInstance = showTooltip(element, tooltip, options)
    }, options.enterDelay)
  }
  const leaveHandler = () => {
    const options = optionsRef.current

    window.clearTimeout(enterTimeout)
    leaveTimeout = window.setTimeout(() => {
      hideTooltip(popperInstance)
      popperInstance = null
    }, options?.leaveDelay)
  }
  element.addEventListener('mouseenter', enterHandler)
  element.addEventListener('mouseleave', leaveHandler)

  return () => {
    element.removeEventListener('mouseenter', enterHandler)
    element.removeEventListener('mouseleave', leaveHandler)
  }
}

export const setupClickTooltipEvents = (
  element: HTMLElement,
  tooltipRef: RefObject<HTMLElement | string>,
  optionsRef: RefObject<TTooltipOptions>,
): (() => void) => {
  createTooltipEl()

  let popperInstance: Instance | null = null

  const enterHandler = () => {
    const options = optionsRef.current
    const tooltip = tooltipRef.current

    if (!tooltip || !options) {
      return
    }
    showTooltip(element, tooltip, options)

    document.body.addEventListener(
      'mousedown',
      event => {
        if (element.contains(event.target as Node)) {
          event.stopImmediatePropagation()
        }
        hideTooltip(popperInstance)
        popperInstance = null
      },
      {
        capture: true,
        once: true,
      },
    )
  }
  element.addEventListener('mousedown', enterHandler)

  return () => {
    element.removeEventListener('mousedown', enterHandler)
  }
}
