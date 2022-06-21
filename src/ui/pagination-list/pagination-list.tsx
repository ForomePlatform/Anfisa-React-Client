import styles from './pagination-list.module.css'

import { PropsWithChildren, ReactNode, useRef } from 'react'
import cn, { Argument } from 'classnames'

import { t } from '@i18n'
import { PaginationFooter } from '@ui/pagination-list/components/pagination-footer'
import { usePagination } from '@ui/pagination-list/pagination-list.hook'

interface IPaginationListProps<T> {
  defaultCount?: number
  className?: Argument
  elements: T[]
  render: (input: T) => ReactNode
}

export const PaginationList = <T,>({
  elements,
  render,
  className,
}: PropsWithChildren<IPaginationListProps<T>>) => {
  const ref = useRef<HTMLDivElement>(null)

  const [{ page, pageElements }, nextPage, prevPage] = usePagination(
    elements.length,
    ref,
  )

  const pageValue = pageElements[page]
  const showPagination = page !== 0 || pageValue.to < elements.length
  const hasNext = pageValue.to < elements.length
  const hasPrev = pageValue.from > 0

  return (
    <div className={cn(styles.pagination, className)}>
      <div ref={ref} className={cn(styles.pagination_container)}>
        {elements.slice(pageValue.from, pageValue.to).map(it => render(it))}
      </div>

      {showPagination && (
        <PaginationFooter
          next={nextPage}
          prev={prevPage}
          hasNext={hasNext}
          hasPrev={hasPrev}
          text={t('paginationList.footer', {
            from: pageValue.from + 1,
            to: pageValue.to,
            length: elements.length,
          })}
        />
      )}
    </div>
  )
}
