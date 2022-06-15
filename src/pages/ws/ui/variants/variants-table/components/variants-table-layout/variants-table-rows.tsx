import styles from './variants-table-layout.module.css'

import React from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import mainTableStore from '@store/ws/main-table.store'
import zoneStore from '@store/ws/zone'
import { IVariantsTableLayoutProps } from './variants-table-layout.interface'

export const VariantsTableRows = observer(
  ({ columns, layout, isCompact, onRowClick }: IVariantsTableLayoutProps) => {
    const { tabReport } = mainTableStore
    const { preparedSamples } = zoneStore

    return (
      <tbody className={styles.table__body}>
        {tabReport.pages.map(page =>
          page.data?.map(row => (
            <tr
              key={row._no}
              className={cn(
                styles.table__row,
                isCompact && styles.table__row_compact,
              )}
              onClick={onRowClick ? () => onRowClick?.(row) : undefined}
            >
              {columns.map(({ name, component: Component }, index) => {
                const isSticky = typeof layout.stickyPos[index] === 'number'

                return (
                  <Component
                    key={name}
                    className={cn(
                      styles.table__td,
                      isSticky && styles.table__td_sticky,
                    )}
                    style={
                      isSticky
                        ? { left: `${layout?.stickyPos[index]}px` }
                        : undefined
                    }
                    row={row}
                    isRowSelected={false}
                    samples={preparedSamples}
                  />
                )
              })}
            </tr>
          )),
        )}
      </tbody>
    )
  },
)

VariantsTableRows.displayName = 'VariantsTableRows'
