import { ReactElement, useEffect, useState } from 'react'

import { useModal } from '@core/hooks/use-modal'
import { usePopover } from '@core/hooks/use-popover'
import { SolutionControlPopover } from '@components/solution-control/solution-control-popover'
import { ISolutionEntryDescription } from '@service-providers/common'
import { SolutionControlButton } from './solution-control-button'
import { SolutionCreateDialog } from './solution-create-dialog'
import { SolutionDeleteDialog } from './solution-delete-dialog'

interface ISolutionControlProps {
  className?: string
  controlName: string
  solutions: ISolutionEntryDescription[] | undefined
  selected: string
  isCreateDisabled?: boolean
  isFetchingSolutions: boolean
  modifiedSolution?: string
  onCreate: (solutionName: string) => void
  onApply: (solutionName: string) => void
  onJoin?: (solutionName: string) => void
  onModify: (solutionName: string) => void
  onDelete: (solutionName: string) => void
}

export const SolutionControl = ({
  className,
  solutions,
  controlName,
  selected: selectedProp,
  isCreateDisabled,
  isFetchingSolutions,
  modifiedSolution,
  onCreate,
  onApply,
  onJoin,
  onModify,
  onDelete,
}: ISolutionControlProps): ReactElement => {
  const [selected, setSelected] = useState(selectedProp)
  const { popoverAnchor, isPopoverOpen, onToggle, closePopover } = usePopover()
  const [deleteDialog, openDeleteDialog, closeDeleteDialog] = useModal({
    solutionName: '',
  })
  const [createDialog, openCreateDialog, closeCreateDialog] = useModal()

  const isModified = !!(selectedProp && modifiedSolution === selectedProp)

  useEffect(() => {
    if (!isPopoverOpen) {
      setSelected(selectedProp)
    }
  }, [isPopoverOpen, selectedProp])

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
        isCreateDisabled={isCreateDisabled}
        controlName={controlName}
        onClose={closePopover}
        anchorEl={popoverAnchor}
        solutions={solutions}
        modifiedSolution={modifiedSolution}
        selected={selected}
        onCreate={() => openCreateDialog()}
        onSelect={setSelected}
        onJoin={onJoin}
        onApply={onApply}
        onModify={onModify}
        onDelete={solutionName => openDeleteDialog({ solutionName })}
      />
      <SolutionDeleteDialog
        {...deleteDialog}
        onClose={closeDeleteDialog}
        onDelete={() => {
          closeDeleteDialog()
          if (deleteDialog.solutionName) {
            onDelete(deleteDialog.solutionName)
          }
        }}
        controlName={controlName}
      />
      <SolutionCreateDialog
        {...createDialog}
        solutions={solutions}
        onClose={closeCreateDialog}
        controlName={controlName}
        onCreate={solutionName => {
          closeCreateDialog()
          onCreate(solutionName)
        }}
      />
    </>
  )
}
