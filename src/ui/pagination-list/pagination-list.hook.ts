import { RefObject, useEffect, useLayoutEffect, useReducer } from 'react'

import { ElementsRange } from '@ui/pagination-list/pagination-list.interfaces'
import {
  findIndexOfLastElement,
  getBottomPosition,
  getDefaultCount,
} from '@ui/pagination-list/pagination-list.utils'

interface IPaginationListState {
  page: number
  pageElements: ElementsRange[]
  maxValue: number
}

enum PaginationListActionKind {
  NextPage = 'Next',
  PrevPage = 'Prev',
  SetPage = 'SetPage',
  Reset = 'Reset',
}

type PaginationListAction = {
  type: PaginationListActionKind
  payload?: PageValue | number
}

type PageValue = { value: ElementsRange; index: number }

const init = (count: number): IPaginationListState => ({
  page: 0,
  pageElements: [{ from: 0, to: Math.min(getDefaultCount(), count) }],
  maxValue: count,
})

const reducer = (
  state: IPaginationListState,
  action: PaginationListAction,
): IPaginationListState => {
  switch (action.type) {
    case PaginationListActionKind.NextPage: {
      const lastElement = state.pageElements[state.pageElements.length - 1]

      if (
        lastElement.to === state.maxValue &&
        state.page < state.pageElements.length - 1
      ) {
        return { ...state, page: state.page + 1 }
      }

      const page = state.page + 1
      const pageElements = [
        ...state.pageElements,
        {
          from: lastElement.to,
          to: Math.min(state.maxValue, lastElement.to + getDefaultCount()),
        },
      ]

      return {
        page: page,
        pageElements: pageElements,
        maxValue: state.maxValue,
      }
    }

    case PaginationListActionKind.PrevPage:
      return { ...state, page: state.page === 0 ? 0 : state.page - 1 }

    case PaginationListActionKind.Reset:
      return init(
        typeof action.payload === 'number' ? action.payload : state.maxValue,
      )

    case PaginationListActionKind.SetPage: {
      const payload = action!.payload as PageValue

      return {
        ...state,
        pageElements: state.pageElements.map((it, index) =>
          index === payload.index ? payload.value : it,
        ),
      }
    }
  }
}

export const usePagination = (
  count: number,
  ref: RefObject<HTMLDivElement>,
): [IPaginationListState, () => void, () => void] => {
  const [state, dispatch] = useReducer(reducer, count, init)
  const { page, pageElements } = state

  const next = () => dispatch({ type: PaginationListActionKind.NextPage })
  const prev = () => dispatch({ type: PaginationListActionKind.PrevPage })
  const reset = (value?: number) =>
    dispatch({ type: PaginationListActionKind.Reset, payload: value })
  const setPage = (value: PageValue) =>
    dispatch({ type: PaginationListActionKind.SetPage, payload: value })

  useEffect(() => {
    const current = ref.current

    if (!current) return

    let height = current.clientHeight
    let width = current.clientWidth

    const observer = new ResizeObserver(entries => {
      if (
        entries[0].target.clientHeight !== height ||
        width !== entries[0].target.clientWidth
      ) {
        reset()

        height = entries[0].target.clientHeight
        width = entries[0].target.clientWidth
      }
    })

    observer.observe(current)

    return () => {
      observer.unobserve(current)
    }
  }, [ref])

  useLayoutEffect(() => {
    const rangeLength = pageElements.length
    const pageRange = pageElements[page]

    if (page < rangeLength - 1) return

    const current = ref.current

    if (!current) return

    const containerBottom = getBottomPosition(current)
    const children = current.children
    const lastChildBottom = getBottomPosition(
      children[children.length - 1] as HTMLElement,
    )

    const shouldShowPagination =
      page !== 0 || pageRange.to < count || lastChildBottom > containerBottom

    if (!shouldShowPagination) return

    const lastIndex = findIndexOfLastElement(current, children)

    const computed = { ...pageRange, to: pageRange.from + lastIndex }

    if (computed.to !== pageRange.to) {
      setPage({
        index: rangeLength - 1,
        value: computed,
      })
    }
  }, [count, page, pageElements, ref])

  useEffect(() => {
    reset(count)
  }, [count])

  return [state, next, prev]
}
