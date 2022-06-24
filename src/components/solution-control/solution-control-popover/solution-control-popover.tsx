import styles from './solution-control-popover.module.css'

import { ReactElement } from 'react'
import cn from 'classnames'

import { t } from '@i18n'
import { Button } from '@ui/button'
import { Popover } from '@ui/popover'
import { IPopoverBaseProps } from '@ui/popover/popover.interface'
import { popoverOffset } from '@pages/ws/ws.constants'
import { ISolutionEntryDescription } from '@service-providers/common'
import { DecisionTreesMenuDataCy } from '../../data-testid/decision-tree-menu.cy'
import { SolutionControlList } from '../solution-control-list'

interface ISolutionControlPopoverProps extends IPopoverBaseProps {
  isCreateDisabled?: boolean
  onCreate: () => void
  onApply: (solutionName: string) => void
  onJoin?: (solutionName: string) => void
  onSelect: (solutionName: string) => void
  onModify: (solutionName: string) => void
  onDelete: (solutionName: string) => void
  solutions: ISolutionEntryDescription[] | undefined
  modifiedSolution?: string
  selected: string
  controlName: string
}

export const SolutionControlPopover = ({
  solutions,
  selected,
  isCreateDisabled,
  controlName,
  modifiedSolution,
  onCreate,
  onSelect,
  onApply,
  onJoin,
  onDelete,
  onModify,
  onClose,
  ...popoverProps
}: ISolutionControlPopoverProps): ReactElement => {
  return (
    <Popover onClose={onClose} offset={popoverOffset} {...popoverProps}>
      <section className={styles.solutionControlCard}>
        <header className={styles.solutionControlCard__header}>
          <button
            disabled={isCreateDisabled}
            className={cn(
              styles.solutionControlCard__createButton,
              isCreateDisabled &&
                styles.solutionControlCard__createButton_disabled,
            )}
            onClick={() => {
              onClose?.()
              onCreate()
            }}
          >
            {t('solutionControl.createNewSolution', { controlName })}
          </button>
        </header>
        {solutions && (
          <SolutionControlList
            className={styles.solutionControlCard__list}
            solutions={solutions}
            selected={selected}
            onSelect={onSelect}
            modifiedSolution={modifiedSolution}
            onModify={solutionName => {
              onClose?.()
              onModify(solutionName)
            }}
            onDelete={solutionName => {
              onClose?.()
              onDelete(solutionName)
            }}
          />
        )}
        <footer className={styles.solutionControlCard__actions}>
          <Button
            size="xs"
            textSize="sm"
            padding="dense"
            className={styles.solutionControlCard__button}
            variant="tertiary"
            text={t('general.cancel')}
            onClick={onClose}
          />
          {onJoin && (
            <Button
              size="xs"
              textSize="sm"
              padding="dense"
              className={styles.solutionControlCard__button}
              variant="secondary"
              text={t('solutionControl.join')}
              disabled={!selected}
              onClick={() => {
                onClose?.()
                onJoin(selected)
              }}
            />
          )}
          <Button
            dataTestId={DecisionTreesMenuDataCy.applyFilter}
            size="xs"
            textSize="sm"
            padding="dense"
            className={styles.solutionControlCard__button}
            text={t('solutionControl.apply')}
            disabled={!selected}
            onClick={() => {
              onClose?.()
              onApply(selected)
            }}
          />
        </footer>
      </section>
    </Popover>
  )
}
