import { ReactElement } from 'react'

import { usePopover } from '@core/hooks/use-popover'
import {
  IDropdownCommonProps,
  IDropdownValue,
} from '@components/dropdown/dropdown.interfaces'
import { DropdownButton } from '@components/dropdown/dropdown-button'
import { DropdownMenu } from '@components/dropdown/dropdown-menu'

interface IDropdownProps<T> extends IDropdownCommonProps {
  options?: IDropdownValue<T>[]
  value?: IDropdownValue<T> | IDropdownValue<T>[]
  placeholder?: string
  hasError?: string
}

export const Dropdown = <T,>({
  options = [],
  value,
  hasError,
  placeholder = 'Select value',
  variant = 'primary',
}: IDropdownProps<T>): ReactElement => {
  const { isPopoverOpen, onToggle, closePopover, popoverAnchor } = usePopover()
  return (
    <>
      <DropdownButton
        isOpen={isPopoverOpen}
        onToggle={onToggle}
        variant={variant}
        placeholder={placeholder}
      />
      <DropdownMenu
        anchorEl={popoverAnchor}
        isOpen={isPopoverOpen}
        onClose={closePopover}
        variant={variant}
        options={options}
      />
    </>
  )
}
