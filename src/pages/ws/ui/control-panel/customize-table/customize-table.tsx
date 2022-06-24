import { ReactElement } from 'react'

import { usePopover } from '@core/hooks/use-popover'
import { customizeTableStore } from './customize-table.store'
import { CustomizeTableButton } from './customize-table-button'
import { CustomizeTablePopover } from './customize-table-popover'

export const CustomizeTable = (): ReactElement => {
  const { popoverAnchor, isPopoverOpen, onToggle, closePopover } = usePopover()

  const handleApply = () => {
    customizeTableStore.applyValues()
    closePopover()
  }
  return (
    <>
      <CustomizeTableButton isOpen={isPopoverOpen} onShowPopover={onToggle} />
      <CustomizeTablePopover
        isOpen={isPopoverOpen}
        anchorEl={popoverAnchor}
        onClose={closePopover}
        onApply={handleApply}
      />
    </>
  )
}
