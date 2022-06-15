import styles from './variants-table-layout.module.css'

import { VariantsTableColgroup } from './variants-table-colgroup'
import { VariantsTableFoot } from './variants-table-foot'
import { VariantsTableHead } from './variants-table-head'
import { IVariantsTableLayoutProps } from './variants-table-layout.interface'
import { VariantsTableRows } from './variants-table-rows'

export const VariantsTableLayout = ({
  columns,
  layout,
  isCompact,
  onRowClick,
}: IVariantsTableLayoutProps) => {
  return (
    <table className={styles.table} style={{ width: `${layout.width}px` }}>
      <VariantsTableColgroup columns={columns} layout={layout} />
      <VariantsTableHead columns={columns} layout={layout} />
      <VariantsTableRows
        columns={columns}
        layout={layout}
        isCompact={isCompact}
        onRowClick={onRowClick}
      />
      <VariantsTableFoot colSpan={columns.length} />
    </table>
  )
}
