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

      if (onScroll) {
        onScroll()
      }
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

export const useGrabScroll = (
  ref: RefObject<HTMLElement>,
  onScroll?: () => void,
  direction: ScrollDirection = 'both',
  enabled = true,
): void => {
  useEffect(() => {
    const el = ref.current
    if (el && enabled) {
      const handler = getMouseDownHandler(direction, onScroll)
      el.addEventListener('mousedown', handler, {
        capture: true,
      })

      return () => el.removeEventListener('mousedown', handler)
    }
  }, [ref, direction, enabled, onScroll])
}
