import styles from '@ui/sidebar/sidebar.module.css'

import React, { RefObject, useEffect, useRef, useState } from 'react'

type TUseExpanderResult = [
  isExpanded: boolean,
  onMouseEnter?: () => void,
  onMouseLeave?: () => void,
]

export const useExpander = (
  isCollapsed: boolean,
  timeout = 200,
): TUseExpanderResult => {
  const [isExpanded, setExpanded] = useState(false)
  const timeoutRef = useRef<number>(-1)
  const handlersRef = useRef<[() => void, () => void]>()

  useEffect(() => {
    if (!isCollapsed) {
      window.setTimeout(() => setExpanded(false), 0)
    }
  }, [isCollapsed])

  if (!isCollapsed) {
    return [isExpanded]
  }

  if (!handlersRef.current) {
    handlersRef.current = [
      () => {
        window.clearTimeout(timeoutRef.current)
        timeoutRef.current = window.setTimeout(() => {
          setExpanded(true)
        }, timeout)
      },
      () => {
        window.clearTimeout(timeoutRef.current)
        timeoutRef.current = window.setTimeout(() => {
          setExpanded(false)
        }, timeout)
      },
    ]
  }

  return [isExpanded, handlersRef.current[0], handlersRef.current[1]]
}

type TUseSeparatorOptions = {
  minWidth: number
  maxWidth: number
  onChangeWidth: (width: number) => void
  onToggle?: (isCollapsed: boolean) => void
}
type TUseSeparatorResult = ((event: React.MouseEvent) => void) | undefined

export const useSeparator = (
  isCollapsed: boolean,
  rootRef: RefObject<HTMLDivElement>,
  options: TUseSeparatorOptions,
): TUseSeparatorResult => {
  const optionsRef = useRef<TUseSeparatorOptions>(options)
  const startDragRef = useRef<TUseSeparatorResult>()
  if (isCollapsed) {
    return undefined
  }

  if (!startDragRef.current) {
    startDragRef.current = (event: React.MouseEvent) => {
      const { minWidth, maxWidth, onChangeWidth, onToggle } = optionsRef.current
      const root = rootRef.current
      if (!root) {
        return
      }
      root.classList.add(styles.sidebar_resize)

      const startPos = event.clientX
      const startWidth = root.getBoundingClientRect().width
      let dragWidth = startWidth

      const moveHandler = (event: MouseEvent) => {
        event.preventDefault()
        dragWidth = event.clientX - startPos + startWidth
        root.style.width = `${dragWidth}px`
      }

      document.addEventListener('mousemove', moveHandler)
      document.addEventListener(
        'mouseup',
        () => {
          root.classList.remove(styles.sidebar_resize)
          document.removeEventListener('mousemove', moveHandler)

          if (onToggle && (dragWidth < minWidth || dragWidth === startWidth)) {
            onToggle(true)
          } else {
            const newWidth = Math.max(minWidth, Math.min(maxWidth, dragWidth))
            root.style.width = `${newWidth}px`
            onChangeWidth(newWidth)
          }
        },
        {
          once: true,
        },
      )
    }
  }

  return startDragRef.current
}
