import styles from '../pagination-list.module.css'

import { FC } from 'react'
import cn, { Argument } from 'classnames'

import { Icon } from '@ui/icon'

interface IPaginationButtonProps {
  onClick: () => void
  position: 'left' | 'right'
  disabled?: boolean
  className?: Argument
}

export const PaginationButton: FC<IPaginationButtonProps> = ({
  onClick,
  disabled,
  position,
  className,
}) => {
  return (
    <button
      className={cn(styles.pagination_footer_button, className)}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon
        name="Arrow"
        size={22}
        className={cn(styles[`pagination_footer_button__icon_${position}`])}
      />
    </button>
  )
}
