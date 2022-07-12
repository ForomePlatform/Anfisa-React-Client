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
    <span
      className={cn(
        styles.arrow,
        isOpen && styles.arrow_open,
        styles[`arrow_${size}`],
        dark && styles.arrow_black,
        className,
      )}
      {...htmlProps}
    />
  )
}
