import { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { Routes } from '@router/routes.enum'
import { Popover } from '@ui/popover'
import { IPopoverBaseProps } from '@ui/popover/popover.interface'
import { PopperMenu } from '@components/popper-menu/popper-menu'
import { PopperMenuItem } from '@components/popper-menu/popper-menu-item'
import { popoverOffset } from '@pages/ws/constants'

interface IOpenIgvPopoverProps extends IPopoverBaseProps {
  igvUrls: string
  onOpenModal: () => void
}

export const OpenIgvPopover = observer(
  ({
    igvUrls,
    isOpen,
    anchorEl,
    onOpenModal,
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
        <PopperMenuItem className="rounded-t">
          <Link target="_blank" to={`${Routes.IGV}?${igvUrls}`}>
            {t('variant.openInANewTab')}
          </Link>
        </PopperMenuItem>

        <PopperMenuItem onClick={onOpenModal} className="rounded-b">
          {t('variant.openInAModalWindow')}
        </PopperMenuItem>
      </PopperMenu>
    </Popover>
  ),
)
