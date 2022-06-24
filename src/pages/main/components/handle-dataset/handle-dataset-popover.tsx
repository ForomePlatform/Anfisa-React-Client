import { Popover } from '@ui/popover'
import { IPopoverBaseProps } from '@ui/popover/popover.interface'
import { PopperMenu } from '@components/popper-menu/popper-menu'
import { PopperMenuItem } from '@components/popper-menu/popper-menu-item'
import { popoverOffset } from '@pages/ws/ws.constants'

interface IHandleDatasetPopoverProps extends IPopoverBaseProps {
  onToggleImport: () => void
  onToggleExport: () => void
  disabled: boolean
}

export const HandleDatasetPopover = ({
  isOpen,
  disabled,
  anchorEl,
  onToggleImport,
  onToggleExport,
  onClose,
}: IHandleDatasetPopoverProps) => (
  <Popover
    onClose={onClose}
    isOpen={isOpen}
    anchorEl={anchorEl}
    offset={popoverOffset}
    placement="bottom"
  >
    <PopperMenu close={close} className="w-32">
      <PopperMenuItem
        onClick={onToggleImport}
        iconName="Import"
        className="rounded-t"
      >
        Import
      </PopperMenuItem>

      <PopperMenuItem
        isDisabled={disabled}
        onClick={onToggleExport}
        iconName="Export"
        className="rounded-b"
      >
        Export
      </PopperMenuItem>
    </PopperMenu>
  </Popover>
)
