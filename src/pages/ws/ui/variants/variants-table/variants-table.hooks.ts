import { RefObject, useLayoutEffect, useMemo, useState } from 'react'

import { ITableLayout, IVariantsTableColumn } from './components'
import { calculateTableLayout } from './variants-table.utils'

export const useTableLayout = (
  rootRef: RefObject<HTMLElement>,
  columns: IVariantsTableColumn[],
  withSticky?: boolean,
): ITableLayout | undefined => {
  const [width, setWidth] = useState<number | undefined>()

  useLayoutEffect(() => {
    const rootEl = rootRef.current

    if (rootEl) {
      const observer = new ResizeObserver(([rootEntry]) => {
        if (rootEntry) {
          setWidth(rootEntry.contentRect.width)
        }
      })
      observer.observe(rootEl)

      return () => observer.disconnect()
    }
  }, [rootRef])

  return useMemo(
    () => calculateTableLayout(columns, width, withSticky),
    [columns, width, withSticky],
  )
}
