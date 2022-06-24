import styles from './tooltip.module.css'

import {
  Children,
  cloneElement,
  ReactElement,
  ReactNode,
  RefObject,
  useRef,
  useState,
} from 'react'

import { useForkRef } from '@core/hooks/use-fork-ref'
import { useTooltip } from './tooltip.hooks'
import {
  TTooltipChild,
  TTooltipPlacement,
  TTooltipTheme,
  TTooltipTrigger,
  TTooltipWidth,
} from './tooltip.interface'

export interface ITooltipProps {
  title: ReactNode
  children: TTooltipChild
  placement?: TTooltipPlacement
  trigger?: TTooltipTrigger
  theme?: TTooltipTheme
  maxWidth?: TTooltipWidth
  enterDelay?: number
  leaveDelay?: number
}

export const Tooltip = (props: ITooltipProps): ReactElement => {
  if (!props.title || !Children.only(props.children)) {
    return props.children
  }

  return <TooltipWrapper {...props} />
}

const TooltipWrapper = ({
  title,
  children,
  placement = 'top',
  trigger = 'hover',
  theme = 'dark',
  maxWidth = 300,
  enterDelay = 100,
  leaveDelay = 0,
}: ITooltipProps): ReactElement => {
  const [childNode, setChildNode] = useState<HTMLElement | null>(null)
  const tooltipRef = useRef<HTMLDivElement | string | null>(null)
  const ref = useForkRef(children.ref, setChildNode)

  const clonedProps = {
    ...children.props,
    ref,
  }

  const titleIsString = typeof title === 'string'

  if (titleIsString) {
    tooltipRef.current = title
  }

  useTooltip(childNode, tooltipRef, trigger, {
    enterDelay,
    leaveDelay,
    placement,
    theme,
    maxWidth,
  })

  return (
    <>
      {cloneElement(children, clonedProps)}
      {titleIsString || (
        <div
          className={styles.tooltip}
          ref={tooltipRef as RefObject<HTMLDivElement>}
        >
          {title}
        </div>
      )}
    </>
  )
}
