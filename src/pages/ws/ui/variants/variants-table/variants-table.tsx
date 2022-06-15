import { ReactElement, useRef } from 'react'

import variantStore from '@store/ws/variant'
import { IVariantsTableColumn, VariantsTableLayout } from './components'
import { useTableLayout } from './variants-table.hooks'

interface IVariantsTableProps {
  columns: IVariantsTableColumn[]
  selectedVariantNo?: number
  isCompact?: boolean
}

export const VariantsTable = ({
  columns,
  isCompact,
  selectedVariantNo,
}: IVariantsTableProps): ReactElement => {
  const rootRef = useRef<HTMLDivElement>(null)

  const layout = useTableLayout(rootRef, columns, true)

  return (
    <div ref={rootRef}>
      {layout && (
        <VariantsTableLayout
          columns={columns}
          layout={layout}
          isCompact={isCompact}
          selectedVariantNo={selectedVariantNo}
          onRowClick={row => {
            variantStore.showVariant(row._no)
          }}
        />
      )}
    </div>
  )
}
