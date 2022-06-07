import styles from './pagination-list.module.css'

import {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import cn, { Argument } from 'classnames'

import { PaginationFooter } from '@components/pagination-list/components/pagination-footer'
import { PageElements } from '@components/pagination-list/pagination-list.interfaces'
import {
  findIndexOfLastElement,
  getBottomPosition,
} from '@components/pagination-list/pagination-list.utils'

interface IPaginationListProps<T> {
  defaultCount?: number
  className?: Argument
  elements: T[]
  render: (input: T) => ReactNode
}

export const PaginationList = <T,>({
  elements,
  render,
  defaultCount = Math.round(window.innerHeight / 20),
  className,
}: PropsWithChildren<IPaginationListProps<T>>) => {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [pagesElements, setPagesElements] = useState<PageElements[]>([
    { from: 0, to: defaultCount },
  ])
  const [page, setPage] = useState<number>(0)

  useEffect(() => {
    const current = ref.current
    const container = containerRef.current

    if (!current || !container) return

    const observer = new ResizeObserver(() => {
      setPage(0)
      setPagesElements([{ from: 0, to: defaultCount }])
    })
    observer.observe(current)
    observer.observe(container)

    return () => {
      observer.unobserve(current)
      observer.unobserve(container)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current, containerRef.current])

  useLayoutEffect(() => {
    if (page < pagesElements.length) return

    const current = ref.current
    const container = containerRef.current

    if (!current || !container) return

    const containerBottom = getBottomPosition(current)
    const children = container.children
    const lastChildBottom = getBottomPosition(
      children[children.length] as HTMLElement,
    )

    const range = pagesElements[page]
    const lastElementOut = lastChildBottom > containerBottom
    const shouldShowPagination =
      range.from !== 0 || range.to < elements.length || lastElementOut

    if (!shouldShowPagination) return

    const lastIndex = findIndexOfLastElement(
      current,
      children,
      shouldShowPagination,
    )

    setPagesElements(it => [
      ...it.slice(0, it.length - 1),
      { ...range, from: lastIndex },
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const showPagination =
    pagesElements[page].from < elements.length || pagesElements[page].to > 0

  const pageValue = pagesElements[page]

  const hasNext = pageValue.to < elements.length
  const nextPage = () => {
    if (!hasNext) return

    setPagesElements(it => {
      const last = it[it.length - 1].to

      return [
        ...it,
        {
          from: last,
          to: Math.min(last + defaultCount, elements.length + 1),
        },
      ]
    })
    setPage(it => it + 1)
  }
  const prevPage = () => setPage(it => it - 1)
  const hasPrev = pageValue.from > 0

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
          text={`From ${pageValue.from} to ${pageValue.to - 1} out of ${
            elements.length
          }`}
        />
      )}
    </div>
  )
}
