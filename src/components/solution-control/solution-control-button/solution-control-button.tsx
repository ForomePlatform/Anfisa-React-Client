import styles from './solution-control-button.module.css'

import { ButtonHTMLAttributes, ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import { Icon } from '@ui/icon'

interface ISolutionControlButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  solutionName: string | undefined
  controlName: string
  isOpen: boolean
  isDeleteShown?: boolean
  onDeleteClick?: () => void
}

export const SolutionControlButton = observer(
  ({
    className,
    solutionName,
    controlName,
    isOpen,
    ...buttonProps
  }: ISolutionControlButtonProps): ReactElement => {
    const isModified =
      solutionName &&
      (filterStore.isPresetModified || dtreeStore.isDtreeModified)

    return (
      <button
        className={cn(styles.solutionControlButton, className)}
        {...buttonProps}
      >
        <span className={styles.solutionControlButton__label}>
          {solutionName || t('solutionControl.selectSolution', { controlName })}
        </span>
        {isModified && (
          <span className={cn(styles.solutionControlButton__icon_modified)}>
            <Icon name="Edit" />
          </span>
        )}

        <span className={cn(styles.solutionControlButton__icon)}>
          <span
            className={cn(
              styles.solutionControlButton__arrow,
              isOpen && styles.solutionControlButton__arrow_open,
            )}
          />
        </span>
      </button>
    )
  },
)
