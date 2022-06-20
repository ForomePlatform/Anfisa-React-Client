import styles from './variants.module.css'

import { ReactElement, useMemo } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { ViewTypeEnum } from '@core/enum/view-type-enum'
import columnsStore from '@store/ws/columns'
import mainTableStore from '@store/ws/main-table.store'
import { Loader } from '@ui/loader'
import { getColumns } from './variants.utils'
import { VariantsNoResults } from './variants-no-results'
import { columnsForDrawer, VariantsTable } from './variants-table'

interface IVariantsProps {
  className?: string
  isDrawerVisible?: boolean
  selectedVariantNo?: number
}

export const Variants = observer(
  ({
    className,
    isDrawerVisible,
    selectedVariantNo,
  }: IVariantsProps): ReactElement => {
    const { tabReport, wsList } = mainTableStore

    const isNoResults = !wsList.data?.records.length

    const isLoading =
      !wsList.data || (!isNoResults && !tabReport.firstPage?.data)

    const { selectedColumns, viewType } = columnsStore

    // TODO: should be refactored with columnsStore
    const columns = useMemo(
      () => (isDrawerVisible ? columnsForDrawer : getColumns(selectedColumns)),
      [isDrawerVisible, selectedColumns],
    )

    return (
      <div className={cn(styles.variants, className)}>
        {isLoading ? (
          <Loader />
        ) : isNoResults ? (
          <VariantsNoResults />
        ) : (
          <VariantsTable
            columns={columns}
            isCompact={viewType == ViewTypeEnum.Compact}
            selectedVariantNo={selectedVariantNo}
          />
        )}
      </div>
    )
  },
)
