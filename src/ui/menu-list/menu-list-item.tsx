import styles from './menu-list.module.css'

import React, { ReactElement, ReactNode } from 'react'
import cn from 'classnames'

import { Tooltip } from '@ui/tooltip'

interface IMenuListItemProps {
  className?: string
  tooltip?: string
  isDense?: boolean
  disabled?: boolean
  wrap?: 'normal' | 'nowrap'
  isSelected?: boolean
  label: ReactNode
  actions?: ReactNode
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

const stopPropagation = (event: React.MouseEvent) => event.stopPropagation()

export const MenuListItem = ({
  className,
  tooltip,
  wrap,
  isDense,
  isSelected,
  label,
  actions,
  onClick,
  disabled,
}: IMenuListItemProps): ReactElement => {
  return (
    <Tooltip theme="light" title={tooltip} placement="top-start">
      <div
        tabIndex={-1}
        role="menuitem"
        className={cn(
          styles.menuListItem,
          isDense && styles.menuListItem_dense,
          isSelected && styles.menuListItem_selected,
          disabled && styles.menuListItem_disabled,
          className,
        )}
        onClick={!disabled ? onClick : undefined}
      >
        <span
          className={cn(
            styles.menuListItem__label,
            wrap === 'nowrap' && styles.menuListItem__label_nowrap,
          )}
        >
          {label}
        </span>
        {actions && (
          <span
            className={styles.menuListItem__actions}
            onClick={stopPropagation}
          >
            {actions}
          </span>
        )}
      </div>
    </Tooltip>
  )
}
