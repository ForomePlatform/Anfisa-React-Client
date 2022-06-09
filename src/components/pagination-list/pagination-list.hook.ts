import {
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
} from 'react'

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

      if (
        lastElement.to === state.maxValue &&
        state.page === state.pageElements.length - 1
      ) {
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
  ref: RefObject<HTMLDivElement>,
): [IPaginationListState, () => void, () => void] => {
  const [state, dispatch] = useReducer(reducer, count, init)
  const { page, pageElements } = state

  const next = () => dispatch({ type: PaginationListActionKind.NextPage })
  const prev = () => dispatch({ type: PaginationListActionKind.PrevPage })

  const reset = () => dispatch({ type: PaginationListActionKind.Reset })
  const setPage = (value: PageValue) =>
    dispatch({ type: PaginationListActionKind.SetPage, payload: value })

  const findRightAmountPerPage = useCallback(() => {
    if (page < pageElements.length - 1) return

    const current = ref.current

    if (!current) return

    const containerBottom = getBottomPosition(current)
    const children = current.children
    const lastChildBottom = getBottomPosition(
      children[children.length - 1] as HTMLElement,
    )

    const range = pageElements[page]
    const lastElementOut = lastChildBottom > containerBottom
    const shouldShowPagination =
      page !== 0 || range.to < length || lastElementOut

    if (!shouldShowPagination) return

    const lastIndex = findIndexOfLastElement(current, children)

    setPage({
      index: pageElements.length - 1,
      value: { ...range, to: range.from + lastIndex },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageElements])

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

  return [state, next, prev]
}
