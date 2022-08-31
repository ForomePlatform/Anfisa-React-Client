import { ReactElement } from 'react'
import { Argument } from 'classnames'

import { usePopover } from '@core/hooks/use-popover'
import { DropdownButton } from '@components/dropdown/components/dropdown-button/dropdown-button'
import { DropdownMenu } from '@components/dropdown/components/dropdown-menu/dropdown-menu'
import {
  IDropdownCommonProps,
  IDropdownValue,
} from '@components/dropdown/dropdown.interfaces'
import { popoverOffset } from '@pages/ws/ws.constants'

interface IDropdownProps<T> extends IDropdownCommonProps<T> {
  options?: IDropdownValue<T>[]
  extraOptions?: IDropdownValue<T>[]
  isLoading?: boolean
  isMulti?: boolean
  hasError?: boolean
  placeholder?: string
  offset?: [number | undefined | null, number | undefined | null]
  clearAll?: () => void
  renderItem?: (item: IDropdownValue<T>) => ReactElement
  renderChosen?: (item: IDropdownValue<T>) => ReactElement
  prepend?: JSX.Element | null
  append?: JSX.Element | null
  className?: Argument
}

export const Dropdown = <T,>({
  options = [],
  values,
  onChange,
  hasError = false,
  extraOptions = [],
  showCheckboxes = false,
  clearAll,
  placeholder = 'Select value',
  variant = 'primary',
  offset = popoverOffset,
  renderItem,
  renderChosen,
  prepend,
  append,
  isLoading = false,
  isMulti = false,
  className,
}: IDropdownProps<T>): ReactElement => {
  const { isPopoverOpen, onToggle, closePopover, popoverAnchor } = usePopover()
  return (
    <>
      <DropdownButton
        isOpen={isPopoverOpen}
        onToggle={onToggle}
        variant={variant}
        placeholder={placeholder}
        values={values}
        showCheckboxes={showCheckboxes}
        onChange={onChange}
        renderChosen={renderChosen}
        prepend={prepend}
        append={append}
        isLoading={isLoading}
        hasError={hasError}
        className={className}
      />
      <DropdownMenu
        anchorEl={popoverAnchor}
        isOpen={isPopoverOpen}
        onClose={closePopover}
        variant={variant}
        options={options}
        values={values}
        onChange={onChange}
        extraOptions={extraOptions}
        offset={offset}
        renderItem={renderItem}
        showCheckboxes={showCheckboxes}
        clearAll={clearAll}
        isMulti={isMulti}
      />
    </>
  )
}
