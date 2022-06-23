import { ReactElement, useEffect, useMemo, useState } from 'react'

import { useModal } from '@core/hooks/use-modal'
import { usePopover } from '@core/hooks/use-popover'
import { SolutionControlPopover } from '@components/solution-control/solution-control-popover'
import { ISolutionEntryDescription } from '@service-providers/common'
import { SolutionControlButton } from './solution-control-button'
import { SolutionDeleteDialog } from './solution-delete-dialog'

interface ISolutionControlProps {
  className?: string
  controlName: string
  solutions: ISolutionEntryDescription[] | undefined
  selected: string
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

  const isSelectedSolutionNonStandard = useMemo(
    () =>
      !!selectedProp &&
      !solutions?.find(({ name }) => name === selectedProp)?.standard,
    [selectedProp, solutions],
  )

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
        isDeleteShown={isSelectedSolutionNonStandard}
        onDeleteClick={() => {
          openDeleteDialog({ solutionName: selectedProp })
        }}
        onClick={e => onToggle(e.currentTarget)}
        onMouseUp={event => event.stopPropagation()}
      />
      <SolutionControlPopover
        isOpen={isPopoverOpen}
        onClose={closePopover}
        anchorEl={popoverAnchor}
        solutions={solutions}
        selected={selected}
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
    </>
  )
}
