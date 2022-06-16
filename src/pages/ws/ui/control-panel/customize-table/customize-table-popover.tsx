import { Dispatch, ReactElement, SetStateAction } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { ViewTypeEnum } from '@core/enum/view-type-enum'
import { t } from '@i18n'
import columnsStore from '@store/ws/columns'
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
  disabled: boolean
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
    disabled,
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

          <div
            className={cn('flex text-blue-bright text-14 leading-5', {
              ' text-grey-blue': disabled,
            })}
          >
            <div className="flex">
              <button
                onClick={() => columnsStore.toggleColumns(false)}
                disabled={disabled}
              >
                {t('general.selectAll')}
              </button>

              <div className="w-[2px] h-full mx-2 bg-blue-light" />
            </div>

            <button
              onClick={() => columnsStore.toggleColumns(true)}
              disabled={disabled}
            >
              {t('general.clearAll')}
            </button>
          </div>
        </div>

        <div className="h-px w-full bg-blue-light mt-4" />

        <div className="w-full">
          <>
            {!disabled && <ColumnsList />}
            <div
              className={cn('mt-4 mb-5', {
                'border-t-[1px] border-t-blue-light': !disabled,
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
