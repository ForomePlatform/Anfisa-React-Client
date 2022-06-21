import styles from '../pagination-list.module.css'

import { FC } from 'react'
import cn, { Argument } from 'classnames'

import { PaginationButton } from '@ui/pagination-list/components/pagination-button'

interface IPaginationFooterProps {
  next: () => void
  prev: () => void
  hasNext: boolean
  hasPrev: boolean
  text: string
  className?: Argument
}

export const PaginationFooter: FC<IPaginationFooterProps> = ({
  next,
  prev,
  hasPrev,
  hasNext,
  text,
  className,
}) => {
  return (
    <footer className={cn(styles.pagination_footer, className)}>
      <PaginationButton
        onClick={prev}
        disabled={!hasPrev}
        className={styles.pagination_footer_button_left}
        position="left"
      />
      <div className={cn(styles.pagination_footer_text)}>{text}</div>
      <PaginationButton
        onClick={next}
        disabled={!hasNext}
        className={styles.pagination_footer_button_right}
        position="right"
      />
    </footer>
  )
}
