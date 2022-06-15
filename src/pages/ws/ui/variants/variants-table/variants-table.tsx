import { ReactElement, useMemo, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { ViewTypeEnum } from '@core/enum/view-type-enum'
import columnsStore from '@store/ws/columns'
import { VariantsTableLayout } from './components'
import { useTableLayout } from './variants-table.hooks'
import { getColumns } from './variants-table.utils'

export const VariantsTable = observer((): ReactElement => {
  const [rootEl, setRootEl] = useState<HTMLDivElement | null>(null)

  const { selectedColumns, viewType } = columnsStore

  const columns = useMemo(() => getColumns(selectedColumns), [selectedColumns])
  const layout = useTableLayout(rootEl, columns, true)

  return (
    <div ref={setRootEl}>
      {layout && (
        <VariantsTableLayout
          columns={columns}
          layout={layout}
          isCompact={viewType === ViewTypeEnum.Compact}
        />
      )}
    </div>
  )
})
