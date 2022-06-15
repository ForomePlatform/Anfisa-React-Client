import styles from './variants-table-layout.module.css'

import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import mainTableStore from '@store/ws/main-table.store'
import { Loader } from '@ui/loader'

interface IVariantsTableFootProps {
  colSpan: number
}

export const VariantsTableFoot = observer(
  ({ colSpan }: IVariantsTableFootProps) => {
    const { tabReport } = mainTableStore

    const [rootEl, triggerEl] = useState<HTMLElement | null>(null)

    useEffect(() => {
      if (rootEl) {
        const observer = new IntersectionObserver(entries => {
          const rootEntry = entries[0]

          if (
            rootEntry &&
            rootEntry.isIntersecting &&
            !tabReport.lastPage?.isLoading
          ) {
            tabReport.addPage()
          }
        })

        observer.observe(rootEl)

        return () => {
          observer.disconnect()
        }
      }
    }, [rootEl, tabReport])

    return tabReport.lastPage?.isLoading || tabReport.hasNextPage ? (
      <tfoot>
        <tr>
          <td colSpan={colSpan} className={styles.table__td}>
            <div ref={triggerEl} className={styles.table__loadingTrigger} />
            <Loader size="m" />
          </td>
        </tr>
      </tfoot>
    ) : null
  },
)

VariantsTableFoot.displayName = 'VariantsTableFoot'
