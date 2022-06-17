import styles from './drawer-popover.module.css'

import { ReactElement, ReactNode } from 'react'
import cn from 'classnames'

import { Icon } from '@ui/icon'
import { IPopoverProps, Popover } from '@ui/popover'

export interface IDrawerPopoverProps
  extends Pick<
    IPopoverProps,
    'className' | 'isOpen' | 'onClose' | 'anchorEl' | 'children'
  > {
  title?: ReactNode
  withCloseButton?: boolean
}

export const DrawerPopover = ({
  className,
  title,
  withCloseButton,
  children,
  onClose,
  ...popoverProps
}: IDrawerPopoverProps): ReactElement => {
  return (
    <Popover
      {...popoverProps}
      className={cn(styles.drawerPopover, className)}
      onClose={onClose}
      placement="bottom"
    >
      <div className={styles.drawerPopover__header}>
        <div className={styles.drawerPopover__title}>{title}</div>
        {withCloseButton && (
          <button
            tabIndex={-1}
            className={styles.drawerPopover__close}
            onClick={onClose}
          >
            <Icon name="Close" size={16} />
          </button>
        )}
      </div>
      {children}
    </Popover>
  )
}
