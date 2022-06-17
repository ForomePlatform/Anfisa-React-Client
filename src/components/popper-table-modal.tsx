import { ReactElement } from 'react'
import { Argument } from 'classnames'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { ViewTypeEnum } from '@core/enum/view-type-enum'
import { t } from '@i18n'
import zoneStore from '@store/ws/zone'
import { InputSearch } from '@components/input-search'
import { ZoneModalMods } from '@pages/ws/ui/control-panel/zone-modals/components/zone-modal-mods'
import { MainTableDataCy } from './data-testid/main-table.cy'
import { PopupCard } from './popup-card/popup-card'

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
    const defineClearFilter = () => {
      isGenes && zoneStore.unselectAllGenes()
      isGenesList && zoneStore.unselectAllGenesList()
      isSamples && zoneStore.unselectAllSamples()
      if (isTags) {
        zoneStore.unselectAllTags()
        zoneStore.resetModes()
      }
    }

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
      <PopupCard
        className={className}
        title={title ?? ''}
        onClose={handleClose}
        onApply={handleApply}
      >
        <div className="">
          {!isNotSearchable && (
            <InputSearch
              dataTestId={MainTableDataCy.searchFilter}
              value={searchValue}
              placeholder={searchInputPlaceholder}
              onChange={e => onChange && onChange(e.target.value)}
            />
          )}

          {isTags && (
            <div className="my-3">
              <ZoneModalMods />
            </div>
          )}

          {!notShowSelectedPanel && (
            <div className="flex justify-between items-center mt-4">
              {viewType ? (
                <span className="text-12 text-grey-blue">
                  {selectedAmount} {'Selected'}
                </span>
              ) : (
                <span className="text-12 text-grey-blue">
                  {defintSelectedAmount() || 0} {'Selected'}
                </span>
              )}

              <div className="flex text-blue-bright text-14 leading-5">
                {onSelectAll && (
                  <div className="flex">
                    <div className="cursor-pointer" onClick={onSelectAll}>
                      {t('general.selectAll')}
                    </div>

                    <div className="w-[2px] h-full mx-2 bg-blue-light" />
                  </div>
                )}

                <span className="cursor-pointer" onClick={onClearAll}>
                  {t('general.clearAll')}
                </span>
              </div>
            </div>
          )}

          <div className="h-px w-full bg-blue-light mt-4" />
        </div>

        <div className="w-full">{children}</div>
      </PopupCard>
    )
  },
)
