import { RefObject, useEffect } from 'react'

export type ScrollDirection = 'horizontal' | 'vertical' | 'both'

const getMouseDownHandler =
  (direction: ScrollDirection, onScroll: (() => void) | undefined) =>
  (event: MouseEvent) => {
    if (event.button !== 0) {
      return
    }

    const element = event.currentTarget as HTMLElement
    let isMoved = false
    const origX = event.clientX
    const origY = event.clientY
    const origScrollLeft = element.scrollLeft
    const origScrollTop = element.scrollTop

    const mouseMoveHandler = (event: MouseEvent) => {
      isMoved = true

      if (direction !== 'horizontal') {
        element.scrollTop = origScrollTop + origY - event.clientY
      }
      if (direction !== 'vertical') {
        element.scrollLeft = origScrollLeft + origX - event.clientX
      }

      onScroll?.()
    }

    element.style.cursor = 'grabbing'
    element.style.userSelect = 'none'

    document.addEventListener('mousemove', mouseMoveHandler)
    document.addEventListener(
      'mouseup',
      () => {
        document.removeEventListener('mousemove', mouseMoveHandler)

        element.style.cursor = ''
        element.style.userSelect = ''
      },
      {
        once: true,
      },
    )
    document.addEventListener(
      'click',
      event => {
        if (isMoved) {
          event.stopPropagation()
        }
      },
      { capture: true, once: true },
    )
  }

export const useComplexScroll = (
  ref: RefObject<HTMLElement>,
  onScroll?: () => void,
  direction: ScrollDirection = 'both',
  enabled = true,
): void => {
  useEffect(() => {
    const el = ref.current
    if (el && enabled) {
      const mouseHandler = getMouseDownHandler(direction, onScroll)
      const wheelHandler = () => onScroll?.()

      el.addEventListener('mousedown', mouseHandler, {
        capture: true,
      })

      el.addEventListener('wheel', wheelHandler)

      return () => {
        el.removeEventListener('mousedown', mouseHandler)
        el.removeEventListener('wheel', wheelHandler)
      }
    }
  }, [ref, direction, enabled, onScroll])
}
