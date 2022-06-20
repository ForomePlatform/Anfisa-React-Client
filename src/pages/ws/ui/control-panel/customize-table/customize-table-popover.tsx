import { Dispatch, ReactElement, SetStateAction } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { ViewTypeEnum } from '@core/enum/view-type-enum'
import { t } from '@i18n'
import columnsStore from '@store/ws/columns'
import variantStore from '@store/ws/variant'
import { Popover } from '@ui/popover'
import { PopupCard } from '@components/popup-card/popup-card'
import { ViewTypeTable } from '@components/view-type-table'
import { popoverOffset } from '@pages/ws/constants'
import { ColumnsList } from './columns-list/columns-list'

interface ICustomizeTablePopoverProps {
  visibleColumnsAmount: number
  viewType: ViewTypeEnum
  isPopoverOpen: boolean
  popoverAnchor: HTMLElement | null
  onClose: () => void
  onApply: () => void
  setViewType: Dispatch<SetStateAction<ViewTypeEnum>>
}

export const CustomizeTablePopover = observer(
  ({
    viewType,
    visibleColumnsAmount,
    isPopoverOpen,
    popoverAnchor,
    onClose,
    onApply,
    setViewType,
  }: ICustomizeTablePopoverProps): ReactElement => (
    <Popover
      isOpen={isPopoverOpen}
      anchorEl={popoverAnchor}
      onClose={onClose}
      offset={popoverOffset}
    >
      <PopupCard title={t('ds.columns')} onClose={onClose} onApply={onApply}>
        <div className="flex justify-between items-center mt-4">
          <span className="text-12 text-grey-blue">
            {visibleColumnsAmount} {'Selected'}
          </span>

          <div className="flex text-blue-bright text-14 leading-5">
            <div className="flex">
              <div
                className="cursor-pointer"
                onClick={columnsStore.selectAllColumns}
              >
                {t('general.selectAll')}
              </div>

              <div className="w-[2px] h-full mx-2 bg-blue-light" />
            </div>

            <span
              className="cursor-pointer"
              onClick={columnsStore.clearAllColumns}
            >
              {t('general.clearAll')}
            </span>
          </div>
        </div>

        <div className="h-px w-full bg-blue-light mt-4" />

        <div className="w-full">
          <>
            {!variantStore.isVariantShown && <ColumnsList />}
            <div
              className={cn('mt-4 mb-5', {
                'border-t-[1px] border-t-blue-light':
                  !variantStore.isVariantShown,
              })}
            >
              <ViewTypeTable setViewType={setViewType} viewType={viewType} />
            </div>
          </>
        </div>
      </PopupCard>
    </Popover>
  ),
)
