import { ReactElement, useState } from 'react'

import { ViewTypeEnum } from '@core/enum/view-type-enum'
import { usePopover } from '@core/hooks/use-popover'
import columnsStore from '@store/ws/columns'
import columnListStore from './columns-list/columns-list.store'
import { CustomizeTableButton } from './customize-table-button'
import { CustomizeTablePopover } from './customize-table-popover'

export const CustomizeTable = (): ReactElement => {
  const { popoverAnchor, isPopoverOpen, onToggle, closePopover } = usePopover()

  const [viewType, setViewType] = useState<ViewTypeEnum>(columnsStore.viewType)

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
      <CustomizeTableButton isOpen={isPopoverOpen} onClick={onToggle} />

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
