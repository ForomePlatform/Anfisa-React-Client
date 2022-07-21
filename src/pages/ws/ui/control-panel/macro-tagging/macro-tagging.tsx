import { ReactElement } from 'react'

import { usePopover } from '@core/hooks/use-popover'
import { MacroTaggingButton } from './components/macro-tagging-button'

export const MacroTagging = (): ReactElement => {
  const { isPopoverOpen, onToggle } = usePopover()
  return (
    <>
      <MacroTaggingButton onClick={onToggle} isOpen={isPopoverOpen} />
    </>
  )
}
