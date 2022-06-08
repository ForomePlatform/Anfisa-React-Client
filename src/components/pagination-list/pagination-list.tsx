import styles from './pagination-list.module.css'

import {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react'
import cn, { Argument } from 'classnames'

import { PaginationFooter } from '@components/pagination-list/components/pagination-footer'
import {
  useFindRightAmountOfElements,
  usePagination,
} from '@components/pagination-list/pagination-list.hook'

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
  const containerRef = useRef<HTMLDivElement>(null)

  const [
    { page, pageElements },
    hasNext,
    hasPrev,
    nextPage,
    prevPage,
    reset,
    setPage,
  ] = usePagination(elements.length)

  const findRightAmountPerPage = useFindRightAmountOfElements(
    page,
    pageElements,
    ref,
    containerRef,
    elements.length,
    setPage,
  )

  useEffect(() => {
    const current = ref.current

    if (!current) return

    let height = current.clientHeight

    const observer = new ResizeObserver(entries => {
      if (entries[0].target.clientHeight !== height) {
        reset()
        findRightAmountPerPage()

        height = entries[0].target.clientHeight
      }
    })

    observer.observe(current)

    return () => {
      observer.unobserve(current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useLayoutEffect(() => {
    findRightAmountPerPage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const pageValue = pageElements[page]
  const showPagination = page !== 0 || pageValue.to < elements.length

  return (
    <div ref={ref} className={cn(styles.pagination, className)}>
      <div ref={containerRef} className={cn(styles.pagination_container)}>
        {elements.slice(pageValue.from, pageValue.to).map(it => render(it))}
      </div>

      {showPagination && (
        <PaginationFooter
          next={nextPage}
          prev={prevPage}
          hasNext={hasNext}
          hasPrev={hasPrev}
          text={`From ${pageValue.from + 1} to ${pageValue.to} out of ${
            elements.length
          }`}
        />
      )}
    </div>
  )
}
