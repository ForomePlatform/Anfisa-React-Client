import styles from '../pagination-list.module.css'

import { FC } from 'react'
import cn, { Argument } from 'classnames'

import { PaginationButton } from '@components/pagination-list/components/pagination-button'

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
        text="Prev"
        disabled={!hasPrev}
        className={styles.pagination_footer_button_left}
      />
      <div className={cn(styles.pagination_footer_text)}>{text}</div>
      <PaginationButton
        onClick={next}
        text="Next"
        disabled={!hasNext}
        className={styles.pagination_footer_button_right}
      />
    </footer>
  )
}
