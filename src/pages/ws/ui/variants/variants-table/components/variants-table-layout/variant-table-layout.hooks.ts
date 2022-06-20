import { RefObject, useLayoutEffect, useState } from 'react'

import { getNearestScrollContainer } from './variants-table-layout.utils'

export const useVirtualizedPages = (
  ref: RefObject<HTMLElement>,
): Record<number, boolean> => {
  const [hiddenPages, setHiddenPages] = useState<Record<number, boolean>>({})

  useLayoutEffect(() => {
    const bodyEl = ref.current
    if (bodyEl) {
      const containerEl = getNearestScrollContainer(bodyEl)

      if (!containerEl) {
        return
      }

      const triggers = Array.from(
        bodyEl.querySelectorAll('tr[data-page-trigger]'),
      )

      if (!triggers.length) {
        return
      }

      const updatePageState = (page: number, isHidden: boolean) => {
        if ((hiddenPages[page] ?? false) !== isHidden) {
          setHiddenPages(pagesState => ({
            ...pagesState,
            [page]: isHidden,
          }))
        }
      }

      const observer = new IntersectionObserver(
        entries => {
          for (const entry of entries) {
            const page = parseInt(
              (entry.target as HTMLElement).dataset.pageTrigger as string,
              10,
            )

            if (entry.isIntersecting) {
              updatePageState(page, false)
              updatePageState(page + 1, false)
            } else if (entry.rootBounds) {
              const y = entry.boundingClientRect.bottom

              if (y < entry.rootBounds.top) {
                updatePageState(page, true)
              } else if (y > entry.rootBounds.bottom) {
                updatePageState(page + 1, true)
              }
            }
          }
        },
        {
          root: containerEl,
          rootMargin: '200% 0px',
        },
      )

      triggers.forEach(el => observer.observe(el))

      return () => observer.disconnect()
    }
  })

  return hiddenPages
}
