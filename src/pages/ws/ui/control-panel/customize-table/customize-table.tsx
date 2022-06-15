import { ReactElement, useState } from 'react'

import { ViewTypeEnum } from '@core/enum/view-type-enum'
import columnsStore from '@store/ws/columns'
import columnListStore from './columns-list/columns-list.store'
import { CustomizeTableButton } from './customize-table-button'
import { CustomizeTablePopover } from './customize-table-popover'

export const CustomizeTable = (): ReactElement => {
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null)

  const [viewType, setViewType] = useState<ViewTypeEnum>(columnsStore.viewType)

  const closePopover = () => {
    setPopoverAnchor(null)
  }

  const isPopoverOpen = !!popoverAnchor

  const handleClose = () => {
    columnsStore.resetColumns()
    closePopover()
  }

  const handleApply = () => {
    columnsStore.filterColumns()
    columnsStore.setViewType(viewType)
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
        visibleColumnsAmount={columnListStore.visibleColumnsAmount}
        viewType={viewType}
        isPopoverOpen={isPopoverOpen}
        popoverAnchor={popoverAnchor}
        onClose={handleClose}
        onApply={handleApply}
        setViewType={setViewType}
      />
    </>
  )
}
