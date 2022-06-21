import { ReactElement } from 'react'

import { t } from '@i18n'
import { Popover } from '@ui/popover'
import { IPopoverBaseProps } from '@ui/popover/popover.interface'
import { PopperMenu } from '@components/popper-menu/popper-menu'
import { PopperMenuItem } from '@components/popper-menu/popper-menu-item'
import { GlbPagesNames } from '@glb/glb-names'
import { popoverOffset } from '@pages/ws/constants'
import { FilterControlOptions } from '../filter-control.const'

interface ISolutionSelectPopoverProps extends IPopoverBaseProps {
  goToPage: (page: FilterControlOptions) => void
}

export const SolutionSelectPopover = ({
  anchorEl,
  isOpen,
  goToPage,
  onClose,
}: ISolutionSelectPopoverProps): ReactElement => (
  <Popover
    onClose={onClose}
    isOpen={isOpen}
    anchorEl={anchorEl}
    offset={popoverOffset}
    placement="bottom"
    className="w-32"
  >
    <PopperMenu>
      <PopperMenuItem
        onClick={() => goToPage(GlbPagesNames.Dtree)}
        className="rounded-t"
      >
        <div className="flex items-center justify-between">
          <span className="mr-2">{t('dtree.dtree')}</span>
        </div>
      </PopperMenuItem>

      <PopperMenuItem
        onClick={() => goToPage(GlbPagesNames.Refiner)}
        className="rounded-b"
      >
        <div className="flex items-center justify-between">
          <span className="mr-2">{t('home.refiner')}</span>
        </div>
      </PopperMenuItem>
    </PopperMenu>
  </Popover>
)
