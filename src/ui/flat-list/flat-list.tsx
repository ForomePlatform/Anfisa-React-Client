import { ReactElement, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'

interface IFlatList<T> {
  elements: T[]
  selectedItemName?: string
  selectedItemIndex?: number
  useWindow?: boolean
  renderRow: (data: T[], index: number) => ReactElement | null
}

export const FlatList = <T,>({
  elements,
  selectedItemName,
  selectedItemIndex,
  renderRow,
  useWindow = false,
}: IFlatList<T>) => {
  const length = elements.length
  const itemsPerPage = length < 20 ? length : 20
  const noNeedToScroll =
    !selectedItemIndex || !selectedItemName || selectedItemIndex === -1

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
      const item = document.getElementById(selectedItemName)
      item?.scrollIntoView()
    }
  }, [noNeedToScroll, records, selectedItemIndex, selectedItemName])

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
