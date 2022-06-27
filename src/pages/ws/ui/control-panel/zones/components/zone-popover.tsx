import { ChangeEvent, ReactElement } from 'react'

import { t } from '@i18n'
import { Loader } from '@ui/loader'
import { Popover } from '@ui/popover'
import { IPopoverBaseProps } from '@ui/popover/popover.interface'
import { InputSearch } from '@components/input-search'
import { PopupCard } from '@components/popup-card/popup-card'
import { popoverOffset } from '@pages/ws/ws.constants'
import { ZoneList } from './zone-list'
import { ZoneMods } from './zone-mods'

interface IZonePopoverProps extends IPopoverBaseProps {
  zoneList: string[]
  title: string
  selectedZoneItems: string[]
  searchValue: string
  isTags?: boolean
  isFetching: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onAdd: (value: string) => void
  onRemove: (value: string, type: string) => void
  onApply: () => void
  onClearAll: () => void
}

export const ZonePopover = ({
  zoneList,
  title,
  selectedZoneItems,
  searchValue,
  anchorEl,
  isOpen,
  isFetching,
  isTags,
  onChange,
  onAdd,
  onRemove,
  onClose,
  onApply,
  onClearAll,
}: IZonePopoverProps): ReactElement => (
  <Popover
    isOpen={isOpen}
    anchorEl={anchorEl}
    onClose={onClose}
    offset={popoverOffset}
  >
    <PopupCard title={title} onClose={onClose} onApply={onApply}>
      <InputSearch
        value={searchValue}
        placeholder={t('ds.searchFilter')}
        onChange={onChange}
      />

      <div className="flex justify-between items-center mt-4">
        <span className="text-12 text-grey-blue">
          {selectedZoneItems.length} {'Selected'}
        </span>

        <div className="flex text-blue-bright text-14 leading-5">
          <span className="cursor-pointer" onClick={onClearAll}>
            {t('general.clearAll')}
          </span>
        </div>
      </div>

      {isTags && <ZoneMods />}

      <div className="h-px w-full bg-blue-light mt-4" />

      {isFetching && <Loader size="m" />}

      {!isFetching && (
        <ZoneList
          zoneItems={zoneList.filter(item =>
            item.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
          )}
          selectedItems={selectedZoneItems}
          onAdd={onAdd}
          onRemove={onRemove}
        />
      )}
    </PopupCard>
  </Popover>
)
