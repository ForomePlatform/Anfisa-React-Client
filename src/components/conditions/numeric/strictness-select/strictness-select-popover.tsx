import { ReactElement } from 'react'

import { Popover } from '@ui/popover'
import { IPopoverBaseProps } from '@ui/popover/popover.interface'
import { PopperMenu } from '@components/popper-menu/popper-menu'
import { PopperMenuItem } from '@components/popper-menu/popper-menu-item'
import { popoverOffset } from '@pages/ws/constants'
export interface IStrictnessSelectPopover extends IPopoverBaseProps {
  onSelect: (value: boolean) => void
}

export const StrictnessSelectPopover = ({
  isOpen,
  anchorEl,
  onClose,
  onSelect,
}: IStrictnessSelectPopover): ReactElement | null => (
  <Popover
    onClose={onClose}
    isOpen={isOpen}
    anchorEl={anchorEl}
    offset={popoverOffset}
    className="border border-grey-disabled rounded-md"
    placement="bottom"
  >
    <PopperMenu className="text-14">
      <PopperMenuItem
        className="px-4 py-0 text-blue-bright rounded-t"
        onClick={() => onSelect(false)}
      >
        <span>{'<'}</span>
      </PopperMenuItem>

      <PopperMenuItem
        className="px-4 py-0 text-blue-bright rounded-b"
        onClick={() => onSelect(true)}
      >
        <span>{'≤'}</span>
      </PopperMenuItem>
    </PopperMenu>
  </Popover>
)
