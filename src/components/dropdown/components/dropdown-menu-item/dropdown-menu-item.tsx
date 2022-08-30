import styles from './dropdown-menu-item.module.css'

import { ReactElement } from 'react'
import cn from 'classnames'
import { camelCase } from 'lodash'

import { Checkbox } from '@ui/checkbox/checkbox'
import {
  IDropdownCommonProps,
  IDropdownValue,
} from '@components/dropdown/dropdown.interfaces'

interface IDropdownMenuItemProps<T> extends Required<IDropdownCommonProps<T>> {
  selected: boolean
  option: IDropdownValue<T>
  disabled?: boolean
  renderItem?: (item: IDropdownValue<T>) => ReactElement
}

export const DropdownMenuItem = <T,>({
  variant,
  disabled,
  onChange,
  option,
  showCheckboxes,
  renderItem,
  selected,
}: IDropdownMenuItemProps<T>): ReactElement => {
  const onClick = () => {
    if (!disabled && onChange) {
      onChange(option)
    }
  }

  const extraStyle = showCheckboxes ? '_checkboxed_' : ''

  const menuItemStyles = cn(
    styles.dropdownMenuItem,
    styles[`dropdownMenuItem_${extraStyle}${camelCase(variant)}`],
    selected &&
      styles[`dropdownMenuItem_${extraStyle}${camelCase(variant)}_selected`],
    disabled &&
      styles[`dropdownMenuItem_${extraStyle}${camelCase(variant)}_disabled`],
  )

  const content = renderItem ? renderItem(option) : option.label

  return (
    <div className={menuItemStyles} onClick={onClick}>
      {showCheckboxes ? (
        <Checkbox
          checked={selected}
          className={styles.dropdownMenuItem__checkbox}
          onChange={() => onChange(option)}
        >
          {content}
        </Checkbox>
      ) : (
        content
      )}
    </div>
  )
}
