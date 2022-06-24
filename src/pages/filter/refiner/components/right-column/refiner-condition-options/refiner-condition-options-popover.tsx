import { ReactElement } from 'react'

import { t } from '@i18n'
import { Icon } from '@ui/icon'
import { Popover } from '@ui/popover'
import { IPopoverBaseProps } from '@ui/popover/popover.interface'
import { DecisionTreeModalDataCy } from '@components/data-testid/decision-tree-modal.cy'
import { PopperMenu } from '@components/popper-menu/popper-menu'
import { PopperMenuItem } from '@components/popper-menu/popper-menu-item'
import { popoverOffset } from '@pages/ws/ws.constants'

interface IRefinerConditionPopoverProps extends IPopoverBaseProps {
  onDeleteFilterBlock: (e: React.MouseEvent) => void
  onCopyFilterName: (e: React.MouseEvent) => void
}

export const RefinerConditionPopover = ({
  isOpen,
  anchorEl,
  onClose,
  onDeleteFilterBlock,
  onCopyFilterName,
}: IRefinerConditionPopoverProps): ReactElement => {
  return (
    <Popover
      onClose={onClose}
      isOpen={isOpen}
      anchorEl={anchorEl}
      offset={popoverOffset}
      className="w-32"
    >
      <PopperMenu>
        <PopperMenuItem
          onClick={onDeleteFilterBlock}
          data-testid={DecisionTreeModalDataCy.joinByAnd}
          className="rounded-t"
        >
          <div className="flex items-center justify-between">
            <span className="mr-2">{t('filter.delete')}</span>

            <Icon name="Delete" />
          </div>
        </PopperMenuItem>

        <PopperMenuItem
          onClick={onCopyFilterName}
          data-testid={DecisionTreeModalDataCy.joinByOr}
          className="rounded-b"
        >
          <div className="flex items-center justify-between">
            <span className="mr-2">{t('filter.copy')}</span>

            <Icon name="Copy" className="text-grey-blue" />
          </div>
        </PopperMenuItem>
      </PopperMenu>
    </Popover>
  )
}
