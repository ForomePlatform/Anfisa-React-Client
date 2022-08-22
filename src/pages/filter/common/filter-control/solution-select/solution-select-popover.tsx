import { ReactElement } from 'react'

import { t } from '@i18n'
import { Popover } from '@ui/popover'
import { IPopoverBaseProps } from '@ui/popover/popover.interface'
import { PopperMenu } from '@components/popper-menu/popper-menu'
import { PopperMenuItem } from '@components/popper-menu/popper-menu-item'
import { GlbPagesNames } from '@glb/glb-names'
import { popoverOffset } from '@pages/ws/ws.constants'
import {
  FilterControlOptions,
  FilterControlOptionsNames,
} from '../filter-control.const'

interface ISolutionSelectPopoverProps extends IPopoverBaseProps {
  pageName: FilterControlOptionsNames
  goToPage: (page: FilterControlOptions) => void
}

export const SolutionSelectPopover = ({
  pageName,
  anchorEl,
  isOpen,
  goToPage,
  onClose,
}: ISolutionSelectPopoverProps): ReactElement => {
  const handleGoToPage = (
    optionName: FilterControlOptionsNames,
    page: FilterControlOptions,
  ) => {
    if (optionName === pageName) {
      onClose?.()
      return
    }

    goToPage(page)
  }

  return (
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
          onClick={() =>
            handleGoToPage(FilterControlOptionsNames.dtree, GlbPagesNames.Dtree)
          }
          className="rounded-t"
        >
          <div className="flex items-center justify-between">
            <span className="mr-2">{t('dtree.dtree')}</span>
          </div>
        </PopperMenuItem>

        <PopperMenuItem
          onClick={() =>
            handleGoToPage(
              FilterControlOptionsNames.refiner,
              GlbPagesNames.Refiner,
            )
          }
          className="rounded-b"
        >
          <div className="flex items-center justify-between">
            <span className="mr-2">{t('home.refiner')}</span>
          </div>
        </PopperMenuItem>
      </PopperMenu>
    </Popover>
  )
}
