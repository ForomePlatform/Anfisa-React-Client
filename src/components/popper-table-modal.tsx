import { ReactElement, useRef } from 'react'
import cn, { Argument } from 'classnames'
import noop from 'lodash/noop'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { ViewTypeEnum } from '@core/enum/view-type-enum'
import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import zoneStore from '@store/filterZone'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { InputSearch } from '@components/input-search'
import { ZoneModalMods } from '@pages/ws/ui/control-panel/zone-modals/components/zone-modal-mods'
import { MainTableDataCy } from './data-testid/main-table.cy'

interface IPopperTableModalProps {
  title?: string
  selectedAmount?: number
  searchValue: string
  searchInputPlaceholder?: string
  viewType?: ViewTypeEnum
  children: ReactElement
  onSelectAll?: () => void
  onClearAll?: () => void
  onClose?: () => void
  onApply?: () => void
  setViewType?: (viewType: ViewTypeEnum) => void
  onChange?: (value: string) => void
  isGenes?: boolean
  isGenesList?: boolean
  isSamples?: boolean
  isTags?: boolean
  isNotSearchable?: boolean
  notShowSelectedPanel?: boolean
  className?: Argument
}

export const PopperTableModal = observer(
  ({
    title,
    selectedAmount,
    searchValue,
    searchInputPlaceholder,
    viewType,
    children,
    onSelectAll,
    onClearAll,
    onClose,
    onApply,
    onChange,
    isGenes,
    isGenesList,
    isSamples,
    isTags,
    isNotSearchable,
    notShowSelectedPanel,
    className,
  }: IPopperTableModalProps) => {
    const ref = useRef(null)

    const defineClearFilter = () => {
      isGenes && zoneStore.unselectAllGenes()
      isGenesList && zoneStore.unselectAllGenesList()
      isSamples && zoneStore.unselectAllSamples()
      isTags && zoneStore.unselectAllTags()
    }

    const onOutsideClick = () => {
      defineClearFilter()

      onClose && onClose()
    }

    useOutsideClick(ref, onOutsideClick ?? noop)

    const defintSelectedAmount = () => {
      if (isGenes) return toJS(zoneStore.localGenes).length

      if (isGenesList) return toJS(zoneStore.localGenesList).length

      if (isSamples) return toJS(zoneStore.localSamples).length

      if (isTags) return toJS(zoneStore.localTags).length
    }

    const handleClose = () => {
      defineClearFilter()

      onClose && onClose()
    }

    const handleApply = () => {
      zoneStore.submitTagsMode()

      onApply && onApply()
    }

    return (
      <div
        style={{ minWidth: 342 }}
        className={cn('bg-white shadow-card rounded-lg', className)}
        ref={ref}
      >
        <div className="px-4 pt-4">
          <div className="flex justify-between mb-5 items-center">
            <span className="text-blue-dark font-medium">{title}</span>
            <Icon
              name="Close"
              onClick={handleClose}
              size={16}
              className="cursor-pointer"
            />
          </div>

          {!isNotSearchable && (
            <InputSearch
              value={searchValue}
              placeholder={searchInputPlaceholder}
              onChange={e => onChange && onChange(e.target.value)}
              isModal
            />
          )}
          {!notShowSelectedPanel && (
            <div className="flex justify-between items-center mt-5">
              {viewType ? (
                <span className="text-12 text-grey-blue">
                  {selectedAmount} {'Selected'}
                </span>
              ) : (
                <span className="text-12 text-grey-blue">
                  {defintSelectedAmount() || 0} {'Selected'}
                </span>
              )}

              <span className="text-blue-bright text-14 leading-5">
                {onSelectAll && (
                  <span className="cursor-pointer mr-3" onClick={onSelectAll}>
                    {t('general.selectAll')}
                  </span>
                )}

                <span className="cursor-pointer" onClick={onClearAll}>
                  {t('general.clearAll')}
                </span>
              </span>
            </div>
          )}
          {isTags && <ZoneModalMods />}

          <div className="h-px w-full bg-blue-light mt-4" />
        </div>

        <div className="w-full pl-4">{children}</div>

        <div className="flex justify-end pb-4 px-4 mt-3">
          <Button
            text={t('general.cancel')}
            variant="cancel"
            onClick={handleClose}
          />

          <Button
            text={t('general.applyFilters')}
            variant="secondary"
            className="ml-3"
            onClick={handleApply}
            dataTestId={MainTableDataCy.applyButton}
          />
        </div>
      </div>
    )
  },
)
