import styles from './solution-control-popover.module.css'

import { ReactElement, useState } from 'react'

import { t } from '@i18n'
import { Button } from '@ui/button'
import { Popover } from '@ui/popover'
import { IPopoverBaseProps } from '@ui/popover/popover.interface'
import { ConfirmDialog } from '@components/confirm-dialog'
import { DecisionTreesMenuDataCy } from '@data-testid'
import { popoverOffset } from '@pages/ws/ws.constants'
import { ISolutionEntryDescription } from '@service-providers/common'
import { SolutionControlList } from '../solution-control-list'

interface ISolutionControlPopoverProps extends IPopoverBaseProps {
  onApply: (solutionName: string) => void
  onReset: (solutionName: string) => void
  onSelect: (solutionName: string) => void
  onModify: (solutionName: string) => void
  onDelete: (solutionName: string) => void
  controlName: string
  solutions: ISolutionEntryDescription[] | undefined
  modifiedSolution?: string
  selected: string
  isResetActive: boolean
}

export const SolutionControlPopover = ({
  solutions,
  selected,
  modifiedSolution,
  controlName,
  isResetActive,
  onSelect,
  onApply,
  onDelete,
  onReset,
  onModify,
  onClose,
  ...popoverProps
}: ISolutionControlPopoverProps): ReactElement => {
  const applyButtonDictionary = {
    [t('solutionControl.filterPreset')]: t('filter.applyPreset'),
    [t('solutionControl.decisionTree')]: t('dtree.applyFilter'),
  }

  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const applyButtonText = applyButtonDictionary[controlName]

  const onApplyReset = () => {
    onClose?.()
    onReset(selected)
  }

  return (
    <Popover onClose={onClose} offset={popoverOffset} {...popoverProps}>
      <section className={styles.solutionControlCard}>
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
          <Button
            size="xs"
            textSize="sm"
            padding="dense"
            className={styles.solutionControlCard__button}
            variant="diestruction"
            text={t('solutionControl.reset')}
            disabled={!isResetActive}
            onClick={() => setIsConfirmOpen(true)}
          />
          <Button
            dataTestId={DecisionTreesMenuDataCy.applyFilter}
            size="xs"
            textSize="sm"
            padding="dense"
            className={styles.solutionControlCard__button}
            text={applyButtonText}
            disabled={!selected}
            onClick={() => {
              onClose?.()
              onApply(selected)
            }}
          />
        </footer>
      </section>
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onApply={onApplyReset}
        message={t('solutionControl.confirmReset.message', { controlName })}
        title={t('solutionControl.confirmReset.title', { controlName })}
        cancelText={t('solutionControl.confirmReset.cancel')}
        applyText={t('solutionControl.confirmReset.apply')}
      />
    </Popover>
  )
}
