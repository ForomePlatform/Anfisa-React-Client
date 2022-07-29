import styles from './dropdown-arrow.module.css'

import { HTMLProps, ReactElement } from 'react'
import cn from 'classnames'

interface IDropdownArrowProps extends Omit<HTMLProps<HTMLSpanElement>, 'size'> {
  size?: 'md' | 'sm'
  isOpen?: boolean
  dark?: boolean
}

export const DropdownArrow = ({
  className,
  size = 'md',
  isOpen,
  dark,
  ...htmlProps
}: IDropdownArrowProps): ReactElement => {
  return (
    <span className={cn(styles.dropdownArrow, className)} {...htmlProps}>
      <span
        className={cn(
          styles.dropdownArrow__arrow,
          isOpen && styles.dropdownArrow__arrow_open,
          styles[`dropdownArrow__arrow_${size}`],
          dark && styles.dropdownArrow__arrow_black,
        )}
      />
    </span>
  )
}
