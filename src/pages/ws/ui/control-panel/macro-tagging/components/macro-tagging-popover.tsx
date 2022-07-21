import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { Popover } from '@ui/popover'
import { IPopoverBaseProps } from '@ui/popover/popover.interface'

export const MacroTaggingPopover: FC<IPopoverBaseProps> = observer(
  ({ isOpen, anchorEl, onClose }) => {
    return (
      <Popover isOpen={isOpen} anchorEl={anchorEl} onClose={onClose}>
        Hi
      </Popover>
    )
  },
)
