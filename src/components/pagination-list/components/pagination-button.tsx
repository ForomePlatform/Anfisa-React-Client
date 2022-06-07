import styles from '../pagination-list.module.css'

import { FC } from 'react'
import cn, { Argument } from 'classnames'

interface IPaginationButtonProps {
  onClick: () => void
  text: string
  disabled?: boolean
  className?: Argument
}

export const PaginationButton: FC<IPaginationButtonProps> = ({
  onClick,
  text,
  disabled,
  className,
}) => {
  return (
    <button
      className={cn(styles.pagination_footer_button, className)}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}
