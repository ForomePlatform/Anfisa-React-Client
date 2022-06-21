import styles from './shadow-scroller.module.css'

import { FC, useRef } from 'react'
import cn, { Argument } from 'classnames'

import { Color } from '@core/colors'
import { ScrollDirection, useGrabScroll } from '@core/hooks/use-grab-scroll'
import { useScrollShadows } from '@ui/shadow-scroller/shadow-scroller.hook'

interface IShadowScrollerProp {
  direction?: ScrollDirection
  shadowColor?: string | Color
  shadowSize?: number
  hideShadows?: boolean
  hideScrollbars?: boolean
  grabScroll?: boolean
  className?: Argument
  contentClassName?: string
}

export const ShadowScroller: FC<IShadowScrollerProp> = ({
  direction = 'both',
  shadowColor = [0, 0, 0, 0.3],
  shadowSize = 20,
  grabScroll = true,
  hideShadows = false,
  hideScrollbars,
  className,
  contentClassName,
  children,
}) => {
  const scrollableRef = useRef<HTMLDivElement>(null)
  const shadowsRef = useRef<HTMLDivElement>(null)

  useGrabScroll(scrollableRef, direction, grabScroll)

  useScrollShadows({
    scrollableRef,
    shadowsRef,
    direction,
    color: shadowColor,
    size: shadowSize,
    isDisabled: hideShadows,
  })

  return (
    <div className={cn(styles.container, className)}>
      {!hideShadows && (
        <div className={cn(styles.container__shadow)} ref={shadowsRef} />
      )}
      <div
        ref={scrollableRef}
        className={cn(
          styles.container__scroller,
          styles[`container__scroller_${direction}`],
          hideScrollbars && styles.container__scroller_nobars,
        )}
      >
        <div
          className={cn(
            styles.container__value,
            styles[`container__value_${direction}`],
            contentClassName,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
