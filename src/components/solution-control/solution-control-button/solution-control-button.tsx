import styles from './solution-control-button.module.css'

import { ButtonHTMLAttributes, ReactElement } from 'react'
import cn from 'classnames'

import { t } from '@i18n'
import { Icon } from '@ui/icon'
import { Loader } from '@ui/loader'

interface ISolutionControlButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  solutionName: string | undefined
  controlName: string
  isOpen: boolean
  isFetchingSolutions: boolean
  isDeleteShown?: boolean
  onDeleteClick?: () => void
}

export const SolutionControlButton = ({
  className,
  solutionName,
  controlName,
  isOpen,
  isDeleteShown,
  isFetchingSolutions,
  onDeleteClick,
  ...buttonProps
}: ISolutionControlButtonProps): ReactElement => {
  return (
    <button
      className={cn(styles.solutionControlButton, className)}
      {...buttonProps}
    >
      <span className={styles.solutionControlButton__label}>
        {isFetchingSolutions ? (
          <Loader size="xs" className="pb-2" />
        ) : (
          solutionName || t('solutionControl.selectSolution', { controlName })
        )}
      </span>
      <span
        className={cn(
          styles.solutionControlButton__icon,
          isDeleteShown && styles.solutionControlButton__icon_delete,
        )}
      >
        {isDeleteShown ? (
          <Icon
            name="Delete"
            size={16}
            onClick={event => {
              event.stopPropagation()
              onDeleteClick?.()
            }}
          />
        ) : (
          <span
            className={cn(
              styles.solutionControlButton__arrow,
              isOpen && styles.solutionControlButton__arrow_open,
            )}
          />
        )}
      </span>
    </button>
  )
}
