import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { ExportTypeEnum } from '@core/enum/export-type.enum'
import { t } from '@i18n'
import { Popover } from '@ui/popover'
import { IPopoverBaseProps } from '@ui/popover/popover.interface'
import { popoverOffset } from '@pages/ws/constants'
import { MainTableDataCy } from '../data-testid/main-table.cy'
import { PopperMenu } from '../popper-menu/popper-menu'
import { PopperMenuItem } from '../popper-menu/popper-menu-item'

interface IExportReportPopoverProps extends IPopoverBaseProps {
  handleDownload: (type: ExportTypeEnum) => void
}

export const ExportReportPopover = observer(
  ({
    isOpen,
    anchorEl,
    onClose,
    handleDownload,
  }: IExportReportPopoverProps): ReactElement => (
    <Popover
      onClose={onClose}
      isOpen={isOpen}
      anchorEl={anchorEl}
      offset={popoverOffset}
      placement="bottom"
      className="w-32 border border-white rounded-md"
    >
      <PopperMenu>
        <PopperMenuItem
          onClick={() => handleDownload(ExportTypeEnum.Excel)}
          dataTestId={MainTableDataCy.exportExcel}
          className="rounded-t"
        >
          {t('general.excel')}
        </PopperMenuItem>

        <PopperMenuItem
          onClick={() => handleDownload(ExportTypeEnum.CSV)}
          dataTestId={MainTableDataCy.exportCsv}
          className="rounded-b"
        >
          {t('general.csv')}
        </PopperMenuItem>
      </PopperMenu>
    </Popover>
  ),
)
