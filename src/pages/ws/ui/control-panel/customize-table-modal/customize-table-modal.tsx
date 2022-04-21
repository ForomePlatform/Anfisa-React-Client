import { ReactElement, useState } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { ViewTypeEnum } from '@core/enum/view-type-enum'
import { t } from '@i18n'
import variantStore from '@store/variant'
import columnsStore from '@store/wsColumns'
import { PopperTableModal } from '@components/popper-table-modal'
import { ViewTypeTable } from '@components/view-type-table'
import { ColumnsList } from './columns-list/columns-list'
import { ColumnListStore } from './columns-list/columns-list.store'

interface ICustomizeTableModalProps {
  close: () => void
}

export const CustomizeTableModal = observer(
  ({ close }: ICustomizeTableModalProps): ReactElement => {
    const [viewType, setViewType] = useState<ViewTypeEnum>(
      columnsStore.viewType,
    )

    const columnListStore = new ColumnListStore()

    return (
      <PopperTableModal
        title={t('ds.columns')}
        searchInputPlaceholder={t('ds.searchColumn')}
        selectedAmount={columnListStore.visibleColumnsAmount}
        searchValue={columnsStore.searchColumnValue}
        onChange={v => columnsStore.setSearchColumnValue(v)}
        onSelectAll={() => columnsStore.selectAllColumns()}
        onClearAll={() => columnsStore.clearAllColumns()}
        onApply={() => {
          columnsStore.filterColumns()
          columnsStore.setViewType(viewType)
          close()
        }}
        onClose={() => {
          columnsStore.resetSearchColumnValue()
          columnsStore.resetColumns()
          close()
        }}
        setViewType={setViewType}
        viewType={viewType}
        isNotSearchable
        notShowSelectedPanel={variantStore.drawerVisible}
      >
        <>
          {!variantStore.drawerVisible && <ColumnsList />}
          <div
            className={cn('mt-4 mb-7 mr-4', {
              'border-t-[1px] border-t-blue-light': !variantStore.drawerVisible,
            })}
          >
            <ViewTypeTable setViewType={setViewType} viewType={viewType} />
          </div>
        </>
      </PopperTableModal>
    )
  },
)
