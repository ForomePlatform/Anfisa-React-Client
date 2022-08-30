import styles from './dropdown-menu.module.css'

import { ReactElement, useMemo } from 'react'
import cn from 'classnames'
import { camelCase } from 'lodash'

import { Popover } from '@ui/popover'
import { IPopoverBaseProps } from '@ui/popover/popover.interface'
import { DropdownClearAllMenu } from '@components/dropdown/components/dropdown-clear-all-menu/dropdown-clear-all-menu'
import { DropdownDivider } from '@components/dropdown/components/dropdown-divider/dropdown-divider'
import { DropdownMenuItem } from '@components/dropdown/components/dropdown-menu-item/dropdown-menu-item'
import {
  IDropdownCommonProps,
  IDropdownValue,
} from '@components/dropdown/dropdown.interfaces'

interface IDropdownMenu<T>
  extends IPopoverBaseProps,
    Required<IDropdownCommonProps<T>> {
  options: IDropdownValue<T>[]
  extraOptions: IDropdownValue<T>[]
  offset?: [number | undefined | null, number | undefined | null]
  renderItem?: (item: IDropdownValue<T>) => ReactElement
  clearAll?: () => void
}

export const DropdownMenu = <T,>({
  anchorEl,
  isOpen,
  onClose,
  variant,
  options,
  onChange,
  clearAll,
  values,
  extraOptions,
  showCheckboxes,
  offset,
  renderItem,
}: IDropdownMenu<T>): ReactElement => {
  const selectedOptionsValues = useMemo(
    () => new Set<T>(values.map(option => option.value)),
    [values],
  )

  const showClearAllMenu: boolean = !!clearAll && !!values.length
  const showExtra: boolean = !!extraOptions.length

  return (
    <Popover
      isOpen={isOpen}
      anchorEl={anchorEl}
      onClose={onClose}
      offset={offset}
    >
      <div
        className={cn(
          styles.dropdownMenu,
          styles[`dropdownMenu_${camelCase(variant)}`],
        )}
      >
        {showClearAllMenu && (
          <DropdownClearAllMenu count={values.length} clearAll={clearAll!} />
        )}
        {showExtra && (
          <>
            {extraOptions.map(option => (
              <DropdownMenuItem
                selected={selectedOptionsValues.has(option.value)}
                option={option}
                onChange={onChange}
                showCheckboxes={showCheckboxes}
                values={values}
                key={option.label}
                variant={variant}
                renderItem={renderItem}
              />
            ))}

            <DropdownDivider />
          </>
        )}
        {options.map(option => (
          <DropdownMenuItem
            option={option}
            variant={variant}
            key={option.label}
            onChange={onChange}
            selected={selectedOptionsValues.has(option.value)}
            values={values}
            showCheckboxes={showCheckboxes}
            renderItem={renderItem}
          />
        ))}
      </div>
    </Popover>
  )
}
