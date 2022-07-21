import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { Icon } from '@ui/icon'
import { Popover } from '@ui/popover'
import { IPopoverBaseProps } from '@ui/popover/popover.interface'
import { PopupCard } from '@components/popup-card/popup-card'

export const MacroTaggingPopover: FC<IPopoverBaseProps> = observer(
  ({ isOpen, anchorEl, onClose }) => {
    return (
      <Popover isOpen={isOpen} anchorEl={anchorEl} onClose={onClose}>
        <PopupCard
          title={t('ds.macroTagsModal.title')}
          onClose={onClose}
          onApply={() => {
            /*TODO*/
          }}
          applyText={t('ds.macroTagsModal.apply')}
          applyAppend={<Icon name="Arrow" />}
        >
          TODO: Add input here
        </PopupCard>
      </Popover>
    )
  },
)
