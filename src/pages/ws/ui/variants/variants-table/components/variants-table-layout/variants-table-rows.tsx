import styles from './variants-table-layout.module.css'

import { useLayoutEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import mainTableStore from '@store/ws/main-table.store'
import { IVariantsTableLayoutProps } from './variants-table-layout.interface'
import { VariantsTableRow } from './variants-table-row'

export const VariantsTableRows = observer(
  ({
    columns,
    layout,
    isCompact,
    onRowClick,
    selectedVariantNo,
  }: IVariantsTableLayoutProps) => {
    const { tabReport } = mainTableStore

    const bodyRef = useRef<HTMLTableSectionElement>(null)

    useLayoutEffect(() => {
      if (bodyRef.current && selectedVariantNo !== undefined) {
        bodyRef.current
          .querySelector(`tr[data-no="${selectedVariantNo}"]`)
          ?.scrollIntoView({
            block: 'nearest',
          })
      }
    }, [selectedVariantNo])

    return (
      <tbody ref={bodyRef} className={styles.table__body}>
        {tabReport.pages.map(page =>
          page.data?.map(row => (
            <VariantsTableRow
              key={row._no}
              row={row}
              columns={columns}
              layout={layout}
              onRowClick={onRowClick}
              isCompact={isCompact}
              isSelected={row._no === selectedVariantNo}
            />
          )),
        )}
      </tbody>
    )
  },
)

VariantsTableRows.displayName = 'VariantsTableRows'
