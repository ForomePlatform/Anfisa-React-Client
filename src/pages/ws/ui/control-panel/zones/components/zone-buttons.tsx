import { ReactElement } from 'react'

import { t } from '@i18n'
import { Divider } from '@ui/divider'
import { ZoneTags } from './zone-tags'

interface IZoneButtonsProps {
  title: string
  selectedZoneItems: string[]
  isOpen: boolean
  isLast?: boolean
  dataTestId?: string
  onClose: () => void
  setPopoverAnchor: (target: HTMLDivElement) => void
  onRemove: (geneName: string, type: string) => void
}

export const ZoneButtons = ({
  title,
  isOpen,
  isLast,
  selectedZoneItems,
  dataTestId,
  onClose,
  setPopoverAnchor,
  onRemove,
}: IZoneButtonsProps): ReactElement => (
  <div
    onClick={event =>
      isOpen ? onClose() : setPopoverAnchor(event.currentTarget)
    }
    className="flex items-center text-14 justify-between cursor-pointer text-blue-bright ml-1"
    data-testid={dataTestId}
  >
    {!selectedZoneItems.length && <span>{`${t('general.add')} ${title}`}</span>}

    <div className="flex justify-between">
      <ZoneTags
        selectedTagsList={selectedZoneItems}
        title={title}
        removeZoneTag={onRemove}
      />
    </div>

    {selectedZoneItems.length > 0 && <span className="ml-1 text-14">+</span>}

    {!isLast && <Divider orientation="vertical" className="h-[63%]" />}
  </div>
)
