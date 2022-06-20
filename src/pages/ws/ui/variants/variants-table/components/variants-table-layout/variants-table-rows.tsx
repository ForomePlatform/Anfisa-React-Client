import styles from './variants-table-layout.module.css'

import { Fragment, useLayoutEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import mainTableStore from '@store/ws/main-table.store'
import { useVirtualizedPages } from './variant-table-layout.hooks'
import { IVariantsTableLayoutProps } from './variants-table-layout.interface'
import { VariantsTableRow } from './variants-table-row'

const NORMAL_ROW_HEIGHT = 80
const COMPACT_ROW_HEIGHT = 60

export const VariantsTableRows = observer(
  ({
    columns,
    layout,
    isCompact,
    onRowClick,
    selectedVariantNo,
  }: IVariantsTableLayoutProps) => {
    const {
      tabReport: { pages },
    } = mainTableStore

    const bodyRef = useRef<HTMLTableSectionElement>(null)
    const lastIndex = pages.length - 1
    const rowHeight = isCompact ? COMPACT_ROW_HEIGHT : NORMAL_ROW_HEIGHT

    const hiddenPages = useVirtualizedPages(bodyRef)

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
        {pages.map((page, pageIndex) => {
          const rowsInPage = page.data?.length ?? 0
          const lastRowIndex = rowsInPage - 1

          return (
            <Fragment key={pageIndex}>
              {hiddenPages[pageIndex] ? (
                <tr data-page-trigger={pageIndex}>
                  <td
                    style={{
                      height: `${(rowsInPage ?? 0) * rowHeight}px`,
                    }}
                  />
                </tr>
              ) : (
                page.data?.map((row, rowIndex) => (
                  <VariantsTableRow
                    key={row._no}
                    row={row}
                    columns={columns}
                    layout={layout}
                    onRowClick={onRowClick}
                    isCompact={isCompact}
                    isSelected={row._no === selectedVariantNo}
                    pageTrigger={
                      pageIndex < lastIndex && rowIndex === lastRowIndex
                        ? pageIndex
                        : undefined
                    }
                  />
                ))
              )}
            </Fragment>
          )
        })}
      </tbody>
    )
  },
)

VariantsTableRows.displayName = 'VariantsTableRows'
