import { ReactElement, useState } from 'react'

import { wsUiStore } from '../../ws-ui.store'
import { TCustomizeTableValues } from './customize-table.interface'
import { CustomizeTableButton } from './customize-table-button'
import { CustomizeTablePopover } from './customize-table-popover'

export const CustomizeTable = (): ReactElement => {
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null)

  const closePopover = () => {
    setPopoverAnchor(null)
  }

  const isPopoverOpen = !!popoverAnchor

  const handleApply = ({ viewType, columns }: TCustomizeTableValues) => {
    wsUiStore.setViewType(viewType)
    wsUiStore.setOptionalColumns(columns)
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
        initialValues={wsUiStore.customizeTableValues}
        isOpen={isPopoverOpen}
        anchorEl={popoverAnchor}
        onClose={closePopover}
        onApply={handleApply}
      />
    </>
  )
}
