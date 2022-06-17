import styles from './variants-table-layout.module.css'

import { memo } from 'react'
import cn from 'classnames'

import { ITabReportRecord } from '@service-providers/dataset-level'
import { IVariantsTableLayoutProps } from './variants-table-layout.interface'

interface IVariantsTableRowProps
  extends Omit<IVariantsTableLayoutProps, 'selectedVariantNo'> {
  row: ITabReportRecord
  isSelected?: boolean
  pageTrigger?: number
}

export const VariantsTableRow = memo(
  ({
    isCompact,
    isSelected,
    columns,
    layout,
    onRowClick,
    row,
    pageTrigger,
  }: IVariantsTableRowProps) => {
    return (
      <tr
        className={cn(
          styles.table__row,
          isSelected && styles.table__row_selected,
          isCompact && styles.table__row_compact,
        )}
        data-no={row._no}
        data-page-trigger={pageTrigger}
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
                isSticky ? { left: `${layout?.stickyPos[index]}px` } : undefined
              }
              row={row}
              isRowSelected={isSelected}
            />
          )
        })}
      </tr>
    )
  },
)

VariantsTableRow.displayName = 'VariantsTableRow'
