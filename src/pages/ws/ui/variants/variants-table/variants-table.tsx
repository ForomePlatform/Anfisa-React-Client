import styles from './variants-table.module.css'

import { ReactElement, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import columnsStore from '@store/ws/columns'
import mainTableStore from '@store/ws/main-table.store'

export const VariantsTable = observer((): ReactElement => {
  const rootRef = useRef<HTMLDivElement>(null)

  const { tabReport } = mainTableStore
  const { selectedColumns } = columnsStore

  return (
    <div ref={rootRef}>
      <table className={styles.table}>
        <thead className={styles.table__head}>
          <tr>
            {selectedColumns.map(column => (
              <th key={column} className={styles.table__th}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tabReport.pages.map(page =>
            page.data?.map(row => (
              <tr key={row._no} className={styles.table__row}>
                {selectedColumns.map(column => (
                  <td key={column} className={styles.table__td}>
                    {column}
                  </td>
                ))}
              </tr>
            )),
          )}
        </tbody>
      </table>
    </div>
  )
})
