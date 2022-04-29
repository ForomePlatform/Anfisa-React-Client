import styles from './dialog.module.css'

import React, { ReactElement, ReactNode } from 'react'
import classNames from 'classnames'

import { Icon } from '../icon'
import { IModalBaseProps, Modal } from '../modal'

export type TDialogWidth = 's' | 'm' | 'l'

export interface IDialogProps
  extends Omit<IModalBaseProps, 'transitionDuration'> {
  width?: TDialogWidth
  modalClassName?: string
  transitionDuration?: number
  className?: string
  title?: ReactNode
  actions?: ReactNode
  children?: ReactNode
}

export const Dialog = ({
  className,
  modalClassName,
  isOpen,
  isKeepMounted,
  width = 's',
  transitionDuration = 300,
  onClose,
  title,
  actions,
  children,
}: IDialogProps): ReactElement => {
  return (
    <Modal
      className={modalClassName}
      transitionDuration={transitionDuration}
      isOpen={isOpen}
      isKeepMounted={isKeepMounted}
      onClose={onClose}
      render={({ state }) => (
        <div
          className={classNames(
            styles.dialog,
            styles[`dialog_${state}`],
            styles[`dialog_${width}`],
            className,
          )}
          style={{
            transitionDuration: `${transitionDuration}ms`,
            visibility: state === 'exited' && !isOpen ? 'hidden' : undefined,
          }}
        >
          <button
            tabIndex={-1}
            className={styles.dialog__close}
            onClick={onClose}
          >
            <Icon name="Close" size={16} />
          </button>
          {title && <h2 className={styles.dialog__title}>{title}</h2>}
          <div className={styles.dialog__content}>{children}</div>
          {actions && <div className={styles.dialog__actions}>{actions}</div>}
        </div>
      )}
    />
  )
}
