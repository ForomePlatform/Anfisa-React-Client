import { ReactElement } from 'react'

import { usePopover } from '@core/hooks/use-popover'
import { MacroTaggingPopover } from '@pages/ws/ui/control-panel/macro-tagging/components/macro-tagging-popover'
import { MacroTaggingButton } from './components/macro-tagging-button'

export const MacroTagging = (): ReactElement => {
  const { isPopoverOpen, onToggle, closePopover, popoverAnchor } = usePopover()
  return (
    <>
      <MacroTaggingButton onClick={onToggle} isOpen={isPopoverOpen} />
      <MacroTaggingPopover
        onClose={closePopover}
        isOpen={isPopoverOpen}
        anchorEl={popoverAnchor}
      />
    </>
  )
}
