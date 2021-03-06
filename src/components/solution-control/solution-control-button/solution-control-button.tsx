import styles from './solution-control-button.module.css'

import { ButtonHTMLAttributes, ReactElement } from 'react'
import cn from 'classnames'

import { t } from '@i18n'
import { Icon } from '@ui/icon'
import { Loader } from '@ui/loader'
import { DecisionTreesMenuDataCy } from '@data-testid'

interface ISolutionControlButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  solutionName: string | undefined
  controlName: string
  isOpen: boolean
  isModified?: boolean
  isFetchingSolutions?: boolean
}

export const SolutionControlButton = ({
  className,
  solutionName,
  controlName,
  isOpen,
  isModified,
  isFetchingSolutions,
  ...buttonProps
}: ISolutionControlButtonProps): ReactElement => {
  return (
    <button
      data-testid={DecisionTreesMenuDataCy.selectDecisionTree}
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
}
