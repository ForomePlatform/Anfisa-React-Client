import { RefObject, useEffect } from 'react'

import { alpha, Color, color2str, parseColor } from '@core/colors'
import { ScrollDirection } from '@core/hooks/use-complex-scroll'
import {
  createShadow,
  createTrigger,
  Placement,
} from '@ui/shadow-scroller/shadow-scroller.utils'

type TUseScrollShadowsParams = {
  scrollableRef: RefObject<HTMLDivElement>
  shadowsRef: RefObject<HTMLDivElement>
  direction: ScrollDirection
  size: number
  color: string | Color
  isDisabled: boolean
}

export const useScrollShadows = ({
  scrollableRef,
  shadowsRef,
  direction,
  size,
  color,
  isDisabled,
}: TUseScrollShadowsParams) => {
  useEffect(() => {
    const scrollable = scrollableRef.current
    const shadows = shadowsRef.current

    if (isDisabled || !scrollable || !shadows) {
      return
    }

    const area = scrollable?.firstElementChild as HTMLDivElement

    if (!area) {
      return
    }

    let topTrigger: HTMLElement | undefined
    let bottomTrigger: HTMLElement | undefined
    let leftTrigger: HTMLElement | undefined
    let rightTrigger: HTMLElement | undefined

    let topShadow: HTMLElement | undefined
    let bottomShadow: HTMLElement | undefined
    let leftShadow: HTMLElement | undefined
    let rightShadow: HTMLElement | undefined

    const resizeObserver = new ResizeObserver(entries => {
      const {
        contentRect: { width, height },
      } = entries[0]
      shadows.style.width = `${width}px`
      shadows.style.height = `${height}px`
    })

    resizeObserver.observe(scrollable)

    const intersectionObserver = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          const displayValue = entry.isIntersecting ? 'none' : 'block'

          switch (entry.target) {
            case topTrigger:
              topShadow && (topShadow.style.display = displayValue)
              break
            case rightTrigger:
              rightShadow && (rightShadow.style.display = displayValue)
              break
            case bottomTrigger:
              bottomShadow && (bottomShadow.style.display = displayValue)
              break
            case leftTrigger:
              leftShadow && (leftShadow.style.display = displayValue)
              break
          }
        }
      },
      {
        root: scrollable,
      },
    )

    const shadowColor = Array.isArray(color) ? color : parseColor(color)
    const fromColor = color2str(alpha(shadowColor, 0))
    const toColor = color2str(shadowColor)

    if (direction !== 'horizontal') {
      topTrigger = createTrigger(area, Placement.top)
      bottomTrigger = createTrigger(area, Placement.bottom)

      topShadow = createShadow(shadows, Placement.top, size, fromColor, toColor)
      bottomShadow = createShadow(
        shadows,
        Placement.bottom,
        size,
        fromColor,
        toColor,
      )

      intersectionObserver.observe(topTrigger)
      intersectionObserver.observe(bottomTrigger)
    }

    if (direction !== 'vertical') {
      leftTrigger = createTrigger(area, Placement.left)
      rightTrigger = createTrigger(area, Placement.right)

      leftShadow = createShadow(
        shadows,
        Placement.left,
        size,
        fromColor,
        toColor,
      )
      rightShadow = createShadow(
        shadows,
        Placement.right,
        size,
        fromColor,
        toColor,
      )

      intersectionObserver.observe(leftTrigger)
      intersectionObserver.observe(rightTrigger)
    }

    return () => {
      ;[
        topTrigger,
        rightTrigger,
        bottomTrigger,
        leftTrigger,
        topShadow,
        rightShadow,
        bottomShadow,
        leftShadow,
      ].forEach(target => target?.remove())
      intersectionObserver.disconnect()
      resizeObserver.disconnect()
    }
  }, [scrollableRef, shadowsRef, direction, size, color, isDisabled])
}
