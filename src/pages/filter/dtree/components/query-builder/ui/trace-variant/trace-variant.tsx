import { ReactElement } from 'react'

import { usePopover } from '@core/hooks/use-popover'
import dtreeStore from '@store/dtree'
import { TraceVariantButton } from './trace-variant-button'
import { TraceVariantPopover } from './trace-variant-popover'
export const TraceVariant = (): ReactElement => {
  const { isPopoverOpen, onToggle, closePopover, popoverAnchor } = usePopover()
  return (
    <>
      <TraceVariantButton onClick={onToggle} isOpen={isPopoverOpen} />
      <TraceVariantPopover
        onClose={closePopover}
        isOpen={isPopoverOpen}
        anchorEl={popoverAnchor}
        traceStore={dtreeStore.traceStore}
      />
    </>
  )
}
