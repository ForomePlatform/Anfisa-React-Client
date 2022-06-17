import styles from './variants-table-layout.module.css'

import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import mainTableStore from '@store/ws/main-table.store'
import { Loader } from '@ui/loader'
import { getNearestScrollContainer } from './variants-table-layout.utils'

interface IVariantsTableFootProps {
  colSpan: number
}

export const VariantsTableFoot = observer(
  ({ colSpan }: IVariantsTableFootProps) => {
    const { tabReport } = mainTableStore

    const [triggerEl, setTriggerEl] = useState<HTMLElement | null>(null)

    const isLoading = tabReport.lastPage?.isLoading
    const hasNextPage = tabReport.hasNextPage

    useEffect(() => {
      if (!triggerEl || isLoading) {
        return
      }

      const root = getNearestScrollContainer(triggerEl)

      if (!root) {
        return
      }

      const observer = new IntersectionObserver(
        entries => {
          const rootEntry = entries[0]

          if (rootEntry?.isIntersecting) {
            tabReport.addPage()
          }
        },
        {
          root,
          rootMargin: '0px 0px 50% 0px',
        },
      )

      observer.observe(triggerEl)

      return () => observer.disconnect()
    }, [triggerEl, isLoading, tabReport])

    return (
      <tfoot>
        {(isLoading || hasNextPage) && (
          <tr>
            <td
              colSpan={colSpan}
              className={styles.table__td}
              ref={setTriggerEl}
            >
              {isLoading && (
                <Loader className={styles.table__loader} size="m" />
              )}
            </td>
          </tr>
        )}
      </tfoot>
    )
  },
)

VariantsTableFoot.displayName = 'VariantsTableFoot'
