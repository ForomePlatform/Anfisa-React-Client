import { ReactElement } from 'react'
import cn from 'classnames'

import { t } from '@i18n'
import variantStore from '@store/ws/variant'
import { Popover } from '@ui/popover'
import { CustomizableList } from '@components/customizable-list'
import { PopupCard } from '@components/popup-card/popup-card'
import { ViewTypeTable } from '@components/view-type-table'
import { popoverOffset } from '@pages/ws/ws.constants'
import { useCustomizeTableValues } from './customize-table.hooks'
import { TCustomizeTableValues } from './customize-table.interface'

interface ICustomizeTablePopoverProps {
  isOpen: boolean
  anchorEl: HTMLElement | null
  onClose: () => void
  initialValues: TCustomizeTableValues
  onApply: (values: TCustomizeTableValues) => void
}

export const CustomizeTablePopover = ({
  isOpen,
  anchorEl,
  onClose,
  onApply,
  initialValues,
}: ICustomizeTablePopoverProps): ReactElement => {
  const [values, dispatch] = useCustomizeTableValues(initialValues, isOpen)

  const { viewType, columns } = values

  return (
    <Popover
      isOpen={isOpen}
      anchorEl={anchorEl}
      onClose={onClose}
      offset={popoverOffset}
    >
      <PopupCard
        title={t('ds.columns')}
        onClose={onClose}
        onApply={() => onApply(values)}
      >
        <div className="flex justify-between items-center mt-4">
          <span className="text-12 text-grey-blue">
            {t('general.selected', {
              value: columns.reduce(
                (acc, column) => (column.isHidden ? acc : acc + 1),
                0,
              ),
            })}
          </span>

          <div className="flex text-blue-bright text-14 leading-5">
            <div className="flex">
              <div
                className="cursor-pointer"
                onClick={() =>
                  dispatch({ type: 'toggleAllColumns', isHidden: false })
                }
              >
                {t('general.selectAll')}
              </div>

              <div className="w-[2px] h-full mx-2 bg-blue-light" />
            </div>

            <span
              className="cursor-pointer"
              onClick={() =>
                dispatch({ type: 'toggleAllColumns', isHidden: true })
              }
            >
              {t('general.clearAll')}
            </span>
          </div>
        </div>

        <div className="h-px w-full bg-blue-light mt-4" />

        <div className="w-full">
          <>
            {!variantStore.isVariantShown && (
              <CustomizableList
                value={columns}
                onChange={columns => dispatch({ type: 'setColumns', columns })}
              />
            )}
            <div
              className={cn('mt-4 mb-5', {
                'border-t-[1px] border-t-blue-light':
                  !variantStore.isVariantShown,
              })}
            >
              <ViewTypeTable
                value={viewType}
                onChange={viewType =>
                  dispatch({ type: 'setViewType', viewType })
                }
              />
            </div>
          </>
        </div>
      </PopupCard>
    </Popover>
  )
}
