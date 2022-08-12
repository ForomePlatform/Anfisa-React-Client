import { ReactElement, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'

interface IFlatList<T> {
  elements: T[]
  selectedItemId?: string
  selectedItemIndex?: number
  useWindow?: boolean
  renderRow: (data: T[], index: number) => ReactElement | null
}

export const FlatList = <T,>({
  elements,
  selectedItemId,
  selectedItemIndex,
  renderRow,
  useWindow = false,
}: IFlatList<T>) => {
  const length = elements.length
  const itemsPerPage = length < 20 ? length : 20
  const noNeedToScroll =
    !selectedItemIndex || !selectedItemId || selectedItemIndex === -1

  const [hasMore, setHasMore] = useState(true)
  const [records, setRecords] = useState(itemsPerPage)

  const loadMore = () => {
    records === length
      ? setHasMore(false)
      : setTimeout(() => {
          setRecords(records + itemsPerPage)
        }, 300)
  }

  const showItems = (renderData: T[]) => {
    const items = []

    for (let i = 0; i < records; i++) {
      renderData[i] && items.push(renderRow(renderData, i))
    }
    return items
  }

  useEffect(() => {
    if (noNeedToScroll) {
      return
    }

    if (records < selectedItemIndex) {
      setRecords(records + selectedItemIndex)
    } else {
      const item = document.getElementById(selectedItemId)
      item?.scrollIntoView()
    }
  }, [noNeedToScroll, records, selectedItemIndex, selectedItemId])

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMore}
      hasMore={hasMore}
      useWindow={useWindow}
    >
      {showItems(elements)}
    </InfiniteScroll>
  )
}
