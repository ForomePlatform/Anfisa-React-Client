import { ReactElement } from 'react'

import { Popover } from '@ui/popover'
import { IPopoverBaseProps } from '@ui/popover/popover.interface'
import { IDropdownCommonProps } from '@components/dropdown/dropdown.interfaces'

interface IDropdownMenu
  extends IPopoverBaseProps,
    Required<IDropdownCommonProps> {}

export const DropdownMenu = ({
  anchorEl,
  isOpen,
  onClose,
}: IDropdownMenu): ReactElement => {
  return (
    <Popover isOpen={isOpen} anchorEl={anchorEl} onClose={onClose}>
      Menu
    </Popover>
  )
}
