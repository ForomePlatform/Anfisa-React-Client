import { useLayoutEffect, useMemo, useRef, useState } from 'react'

import { ITableLayout, IVariantsTableColumn } from './components'
import { calculateTableLayout } from './variants-table.utils'

export const useTableLayout = (
  rootEl: HTMLElement | null,
  columns: IVariantsTableColumn[],
  withSticky?: boolean,
): ITableLayout | undefined => {
  const [width, setWidth] = useState<number | undefined>()

  const observerRef = useRef<ResizeObserver>()
  if (!observerRef.current) {
    observerRef.current = new ResizeObserver(([rootEntry]) => {
      if (rootEntry) {
        setWidth(rootEntry.contentRect.width)
      }
    })
  }

  useLayoutEffect(() => {
    if (rootEl) {
      observerRef.current?.observe(rootEl)

      return () => observerRef.current?.unobserve(rootEl)
    }
  }, [rootEl])

  return useMemo(
    () => calculateTableLayout(columns, width, withSticky),
    [columns, width, withSticky],
  )
}
