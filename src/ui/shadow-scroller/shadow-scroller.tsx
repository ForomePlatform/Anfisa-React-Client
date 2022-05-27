import styles from './shadow-scroller.module.css'

import { FC, useEffect, useRef } from 'react'
import cn, { Argument } from 'classnames'

import { ScrollDirection, useGrabScroll } from '@core/hooks/use-grab-scroll'
import {
  createShadow,
  createTrigger,
  DisplayValue,
  hide,
  Placement,
} from '@ui/shadow-scroller/shadow-scroller.utils'

interface IScrollerProp {
  direction?: ScrollDirection
  showShadows?: boolean
  grabScroll?: boolean
  className?: Argument
}

export const ShadowScroller: FC<IScrollerProp> = ({
  direction = 'both',
  grabScroll = true,
  className,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const shadowsRef = useRef<HTMLDivElement>(null)

  const onMouseDown = useGrabScroll(ref, direction)

  useEffect(() => {
    const scrollable = ref.current
    const shadows = shadowsRef.current

    if (!scrollable || !shadows) {
      return
    }

    const area = scrollable?.firstElementChild as HTMLDivElement

    if (!area) {
      return
    }

    const topTrigger = createTrigger(area, Placement.top)
    const rightTrigger = createTrigger(area, Placement.right)
    const bottomTrigger = createTrigger(area, Placement.bottom)
    const leftTrigger = createTrigger(area, Placement.left)

    const topShadow = createShadow(shadows, Placement.top, direction)
    const rightShadow = createShadow(shadows, Placement.right, direction)
    const bottomShadow = createShadow(shadows, Placement.bottom, direction)
    const leftShadow = createShadow(shadows, Placement.left, direction)

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
          switch (entry.target) {
            case topTrigger:
              topShadow.style.display =
                entry.isIntersecting || hide(Placement.top, direction)
                  ? DisplayValue.none
                  : DisplayValue.block
              break
            case rightTrigger:
              rightShadow.style.display =
                entry.isIntersecting || hide(Placement.right, direction)
                  ? DisplayValue.none
                  : DisplayValue.block
              break
            case bottomTrigger:
              bottomShadow.style.display =
                entry.isIntersecting || hide(Placement.bottom, direction)
                  ? DisplayValue.none
                  : DisplayValue.block
              break
            case leftTrigger:
              leftShadow.style.display =
                entry.isIntersecting || hide(Placement.left, direction)
                  ? DisplayValue.none
                  : DisplayValue.block
              break
          }
        }
      },
      {
        root: scrollable,
      },
    )
    intersectionObserver.observe(topTrigger)
    intersectionObserver.observe(rightTrigger)
    intersectionObserver.observe(bottomTrigger)
    intersectionObserver.observe(leftTrigger)

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
      ].forEach(target => target.remove())
      intersectionObserver.disconnect()
      resizeObserver.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={cn(styles.container, className)}>
      <div className={cn(styles.container__shadow)} ref={shadowsRef} />
      <div
        className={cn(
          styles.container__scroller,
          styles[`container__scroller_${direction}`],
        )}
        onMouseDown={grabScroll ? onMouseDown : undefined}
        ref={ref}
      >
        <div
          className={cn(
            styles.container__value,
            styles[`container__value_${direction}`],
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
