import { RefObject, useCallback, useReducer } from 'react'

import { PageElements } from '@components/pagination-list/pagination-list.interfaces'
import {
  findIndexOfLastElement,
  getBottomPosition,
  getDefaultCount,
} from '@components/pagination-list/pagination-list.utils'

interface IPaginationListState {
  page: number
  pageElements: PageElements[]
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
  payload?: PageValue
}

type PageValue = { value: PageElements; index: number }

const reducer = (
  state: IPaginationListState,
  action: PaginationListAction,
): IPaginationListState => {
  switch (action.type) {
    case PaginationListActionKind.NextPage: {
      const lastElement = state.pageElements[state.pageElements.length - 1]

      if (lastElement.to === state.maxValue) {
        return state
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
      return init(state.maxValue)

    case PaginationListActionKind.SetPage:
      return {
        ...state,
        pageElements: state.pageElements.map((it, index) =>
          index === action.payload!.index ? action.payload!.value : it,
        ),
      }
  }
}

const init = (count: number): IPaginationListState => ({
  page: 0,
  pageElements: [{ from: 0, to: Math.min(getDefaultCount(), count) }],
  maxValue: count,
})

export const usePagination = (
  count: number,
): [
  IPaginationListState,
  boolean,
  boolean,
  () => void,
  () => void,
  () => void,
  (value: PageValue) => void,
] => {
  const [state, dispatch] = useReducer(reducer, count, init)

  const value = state.pageElements[state.page]

  const hasNext = value.to < count
  const hasPrev = value.from > 0
  const next = () => dispatch({ type: PaginationListActionKind.NextPage })
  const prev = () => dispatch({ type: PaginationListActionKind.PrevPage })
  const reset = () => dispatch({ type: PaginationListActionKind.Reset })
  const setPage = (value: PageValue) =>
    dispatch({ type: PaginationListActionKind.SetPage, payload: value })

  return [state, hasNext, hasPrev, next, prev, reset, setPage]
}

export const useFindRightAmountOfElements = (
  page: number,
  pageElements: PageElements[],
  ref: RefObject<HTMLDivElement>,
  containerRef: RefObject<HTMLElement>,
  length: number,
  setPage: (value: PageValue) => void,
): (() => void) => {
  return useCallback(() => {
    if (page < pageElements.length - 1) return

    const current = ref.current
    const container = containerRef.current

    if (!current || !container) return

    const containerBottom = getBottomPosition(current)
    const children = container.children
    const lastChildBottom = getBottomPosition(
      children[children.length - 1] as HTMLElement,
    )

    const range = pageElements[page]
    const lastElementOut = lastChildBottom > containerBottom
    const shouldShowPagination =
      range.from !== 0 || range.to < length || lastElementOut

    if (!shouldShowPagination) return

    const lastIndex = findIndexOfLastElement(
      current,
      children,
      shouldShowPagination,
    )

    setPage({
      index: pageElements.length - 1,
      value: { ...range, to: range.from + lastIndex },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageElements])
}
