import { ReactElement, useState } from 'react'

import { customizeTableStore } from './customize-table.store'
import { CustomizeTableButton } from './customize-table-button'
import { CustomizeTablePopover } from './customize-table-popover'

export const CustomizeTable = (): ReactElement => {
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null)

  const closePopover = () => {
    setPopoverAnchor(null)
  }

  const isPopoverOpen = !!popoverAnchor

  const handleApply = () => {
    customizeTableStore.applyValues()
    closePopover()
  }
  return (
    <>
      <CustomizeTableButton
        isOpen={isPopoverOpen}
        onClose={closePopover}
        setPopoverAnchor={setPopoverAnchor}
      />
      <CustomizeTablePopover
        isOpen={isPopoverOpen}
        anchorEl={popoverAnchor}
        onClose={closePopover}
        onApply={handleApply}
      />
    </>
  )
}
