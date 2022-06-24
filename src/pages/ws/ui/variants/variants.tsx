import styles from './variants.module.css'

import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { ViewTypeTableEnum } from '@core/enum/view-type-table-enum'
import mainTableStore from '@store/ws/main-table.store'
import { Loader } from '@ui/loader'
import { wsUiStore } from '../ws-ui.store'
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
    selectedVariantNo,
    isDrawerVisible,
  }: IVariantsProps): ReactElement => {
    const { tabReport, wsList } = mainTableStore
    const { columns, viewType } = wsUiStore

    const isNoResults = !wsList.data?.records.length

    const isLoading =
      !wsList.data || (!isNoResults && !tabReport.firstPage?.data)

    return (
      <div className={cn(styles.variants, className)}>
        {isLoading ? (
          <Loader />
        ) : isNoResults ? (
          <VariantsNoResults />
        ) : (
          <VariantsTable
            columns={isDrawerVisible ? columnsForDrawer : columns}
            isCompact={viewType == ViewTypeTableEnum.Compact}
            selectedVariantNo={selectedVariantNo}
          />
        )}
      </div>
    )
  },
)
