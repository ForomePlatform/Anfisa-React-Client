import styles from './shadow-scroller.module.css'

import { ElementType, FC, Ref, useRef } from 'react'
import cn, { Argument } from 'classnames'

import { Color } from '@core/colors'
import {
  ScrollDirection,
  useComplexScroll,
} from '@core/hooks/use-complex-scroll'
import { useForkRef } from '@core/hooks/use-fork-ref'
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
  component?: ElementType
  onScroll?: () => void
  innerRef?: Ref<HTMLElement>
}

export const ShadowScroller: FC<IShadowScrollerProp> = ({
  direction = 'both',
  component: Component = 'div',
  shadowColor = [0, 0, 0, 0.3],
  shadowSize = 20,
  grabScroll = true,
  hideShadows = false,
  hideScrollbars,
  className,
  contentClassName,
  onScroll,
  innerRef,
  children,
}) => {
  const scrollableRef = useRef<HTMLDivElement>(null)
  const shadowsRef = useRef<HTMLDivElement>(null)

  useComplexScroll(scrollableRef, onScroll, direction, grabScroll)

  useScrollShadows({
    scrollableRef,
    shadowsRef,
    direction,
    color: shadowColor,
    size: shadowSize,
    isDisabled: hideShadows,
  })

  const ref = useForkRef(scrollableRef, innerRef)

  return (
    <div className={cn(styles.container, className)}>
      {!hideShadows && (
        <div className={cn(styles.container__shadow)} ref={shadowsRef} />
      )}
      <Component
        ref={ref}
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
      </Component>
    </div>
  )
}
