import { Icon } from '@ui/icon'
import { IPopoverButtonBaseProps } from '@ui/popover/popover.interface'

export const HandleDatasetButton = ({
  onShowPopover,
}: IPopoverButtonBaseProps) => {
  return (
    <button
      onClick={e => onShowPopover(e.currentTarget)}
      className="hover:bg-blue-darkHover p-1 rounded-md"
    >
      <Icon name="Options" className="text-white hover:text-grey-blue" />
    </button>
  )
}
