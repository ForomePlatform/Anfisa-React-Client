import styles from './sidebar.module.css'

import React, { ReactElement, ReactNode, useRef } from 'react'
import cn from 'classnames'

import { Icon } from '@ui/icon'
import { useExpander, useSeparator } from './sidebar.hooks'
import { stopPropagation } from './sidebar.utils'

interface ISidebarBaseProps {
  className?: string
  contentClassName?: string
  wrapperClassName?: string
  minWidth?: number
  maxWidth?: number
  width: number
  onChangeWidth: (width: number) => void
  children?: ReactNode
}

type TSidebarProps = ISidebarBaseProps &
  (
    | {
        canCollapse?: undefined | false
        isCollapsed?: undefined
        onToggle?: undefined
      }
    | {
        canCollapse: true
        isCollapsed: boolean
        onToggle: (isCollapsed: boolean) => void
      }
  )

export const Sidebar = ({
  className,
  contentClassName,
  wrapperClassName,
  minWidth = 0,
  maxWidth = Infinity,
  width,
  onChangeWidth,
  children,
  canCollapse,
  isCollapsed = false,
  onToggle,
}: TSidebarProps): ReactElement => {
  const rootRef = useRef<HTMLDivElement>(null)
  const [isExpanded, onMouseEnter, onMouseLeave] = useExpander(isCollapsed)
  const onStartDrag = useSeparator(isCollapsed, rootRef, {
    minWidth,
    maxWidth,
    onToggle,
    onChangeWidth,
  })

  const widthCss = `${width}px`
  const widthStyle = { width: widthCss }

  return (
    <div
      ref={rootRef}
      className={cn(
        styles.sidebar,
        isCollapsed && styles.sidebar_collapsed,
        isExpanded && styles.sidebar_expanded,
        className,
      )}
      style={!isCollapsed ? widthStyle : undefined}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={cn(
          styles.sidebar__wrapper,
          isExpanded && styles.sidebar__wrapper_expanded,
          wrapperClassName,
        )}
        style={isExpanded ? widthStyle : undefined}
      >
        <div
          role="separator"
          className={cn(
            styles.sidebar__separator,
            isCollapsed && styles.sidebar__separator_collapsed,
          )}
          onMouseDown={onStartDrag}
        >
          {canCollapse && (
            <button
              className={styles.sidebar__collapseBtn}
              onMouseDown={stopPropagation}
              onClick={() => onToggle?.(!isCollapsed)}
            >
              <Icon name={isCollapsed ? 'ArrowRightS' : 'ArrowLeftS'} />
            </button>
          )}
        </div>
        <div
          className={cn(
            styles.sidebar__contentWrapper,
            isExpanded && styles.sidebar__contentWrapper_expanded,
          )}
          onMouseEnter={onMouseEnter}
        >
          <div
            className={cn(styles.sidebar__content, contentClassName)}
            style={{
              minWidth: `${minWidth}px`,
              width: isCollapsed ? widthCss : undefined,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
