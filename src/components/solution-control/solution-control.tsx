import { ReactElement, useEffect, useState } from 'react'

import { useModal } from '@core/hooks/use-modal'
import { usePopover } from '@core/hooks/use-popover'
import {
  SolutionDeleteDialog,
  SolutionModifyDialog,
} from '@components/solution-control/solution-change-dialog'
import { SolutionControlPopover } from '@components/solution-control/solution-control-popover'
import { ISolutionEntryDescription } from '@service-providers/common'
import { SolutionControlButton } from './solution-control-button'

interface ISolutionControlProps {
  className?: string
  controlName: string
  solutions: ISolutionEntryDescription[] | undefined
  selected: string
  isFetchingSolutions: boolean
  modifiedSolution?: string
  isResetActive: boolean
  onApply: (solutionName: string) => void
  onReset: (solutionName: string) => void
  onModify: (solutionName: string) => void
  onDelete: (solutionName: string) => void
}

export const SolutionControl = ({
  className,
  solutions,
  controlName,
  selected: selectedProp,
  isFetchingSolutions,
  modifiedSolution,
  isResetActive,
  onApply,
  onReset,
  onModify,
  onDelete,
}: ISolutionControlProps): ReactElement => {
  const [selected, setSelected] = useState(selectedProp)
  const { popoverAnchor, isPopoverOpen, onToggle, closePopover } = usePopover()
  const [deleteDialog, openDeleteDialog, closeDeleteDialog] = useModal({
    solutionName: '',
  })
  const [modifyDialog, openModifyDialog, closeModifyDialog] = useModal({
    solutionName: '',
  })

  const isModified = !!(selectedProp && modifiedSolution === selectedProp)

  useEffect(() => {
    if (!isPopoverOpen) {
      setSelected(selectedProp)
    }
  }, [isPopoverOpen, selectedProp])

  const onModifyDialog = () => {
    closeModifyDialog()
    if (modifyDialog.solutionName) {
      onModify(modifyDialog.solutionName)
    }
  }

  const onDeleteDialog = () => {
    closeDeleteDialog()
    if (deleteDialog.solutionName) {
      onDelete(deleteDialog.solutionName)
    }
  }

  return (
    <>
      <SolutionControlButton
        className={className}
        solutionName={selectedProp}
        controlName={controlName}
        isOpen={isPopoverOpen}
        isFetchingSolutions={isFetchingSolutions}
        isModified={isModified}
        onClick={e => onToggle(e.currentTarget)}
        onMouseUp={event => event.stopPropagation()}
      />
      <SolutionControlPopover
        isOpen={isPopoverOpen}
        onClose={closePopover}
        controlName={controlName}
        anchorEl={popoverAnchor}
        solutions={solutions}
        modifiedSolution={modifiedSolution}
        selected={selected}
        isResetActive={isResetActive}
        onSelect={setSelected}
        onReset={onReset}
        onApply={onApply}
        onModify={solutionName => openModifyDialog({ solutionName })}
        onDelete={solutionName => openDeleteDialog({ solutionName })}
      />
      <SolutionModifyDialog
        {...modifyDialog}
        onClose={closeModifyDialog}
        onApply={onModifyDialog}
        controlName={controlName}
      />
      <SolutionDeleteDialog
        {...deleteDialog}
        onClose={closeDeleteDialog}
        onApply={onDeleteDialog}
        controlName={controlName}
      />
    </>
  )
}
