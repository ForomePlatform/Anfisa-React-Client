import { ReactElement, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'

interface IFlatList<T> {
  data: T[]
  renderRow: (data: T[], index: number) => ReactElement | null
  useWindow?: boolean
}

export const FlatList = <T,>({
  data,
  renderRow,
  useWindow = false,
}: IFlatList<T>) => {
  const itemsPerPage = data.length < 20 ? data.length : 20

  const [hasMore, setHasMore] = useState(true)
  const [records, setRecords] = useState(itemsPerPage)

  const loadMore = () => {
    records === data.length
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

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMore}
      hasMore={hasMore}
      useWindow={useWindow}
    >
      {showItems(data)}
    </InfiniteScroll>
  )
}
