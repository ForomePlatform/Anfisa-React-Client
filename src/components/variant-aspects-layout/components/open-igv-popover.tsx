import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { Popover } from '@ui/popover'
import { IPopoverBaseProps } from '@ui/popover/popover.interface'
import { PopperMenu } from '@components/popper-menu/popper-menu'
import { PopperMenuItem } from '@components/popper-menu/popper-menu-item'
import { popoverOffset } from '@pages/ws/constants'

interface IOpenIgvPopoverProps extends IPopoverBaseProps {
  onOpenModal: () => void
  onOpenPage: () => void
}

export const OpenIgvPopover = observer(
  ({
    isOpen,
    anchorEl,
    onOpenModal,
    onOpenPage,
    onClose,
  }: IOpenIgvPopoverProps): ReactElement => (
    <Popover
      onClose={onClose}
      isOpen={isOpen}
      anchorEl={anchorEl}
      offset={popoverOffset}
      placement="bottom"
    >
      <PopperMenu>
        <PopperMenuItem onClick={onOpenPage} className="rounded-t">
          {t('variant.openInANewTab')}
        </PopperMenuItem>

        <PopperMenuItem onClick={onOpenModal} className="rounded-b">
          {t('variant.openInAModalWindow')}
        </PopperMenuItem>
      </PopperMenu>
    </Popover>
  ),
)
