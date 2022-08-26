import styles from './dropdown.module.css'

import { ReactElement } from 'react'
import cn from 'classnames'
import { camelCase } from 'lodash'

import { Popover } from '@ui/popover'
import { IPopoverBaseProps } from '@ui/popover/popover.interface'
import {
  IDropdownCommonProps,
  IDropdownValue,
} from '@components/dropdown/dropdown.interfaces'
import { DropdownMenuItem } from '@components/dropdown/dropdown-menu-item'

interface IDropdownMenu<T>
  extends IPopoverBaseProps,
    Required<IDropdownCommonProps> {
  options: IDropdownValue<T>[]
}

export const DropdownMenu = <T,>({
  anchorEl,
  isOpen,
  onClose,
  variant,
  options,
}: IDropdownMenu<T>): ReactElement => {
  return (
    <Popover isOpen={isOpen} anchorEl={anchorEl} onClose={onClose}>
      <div
        className={cn(
          styles.dropdown__menu,
          styles[`dropdown__menu_${camelCase(variant)}`],
        )}
      >
        {options.map(option => (
          <DropdownMenuItem
            variant={variant}
            key={option.label}
            onClick={() => {}}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </div>
    </Popover>
  )
}
