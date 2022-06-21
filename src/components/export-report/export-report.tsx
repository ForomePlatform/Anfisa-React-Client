import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { ExportTypeEnum } from '@core/enum/export-type.enum'
import { usePopover } from '@core/hooks/use-popover'
import { t } from '@i18n'
import operationsStore from '@store/operations'
import mainTableStore from '@store/ws/main-table.store'
import { showToast } from '@utils/notifications'
import { ExportReportButton } from './export-report-button'
import { ExportReportPopover } from './export-report-popover'

export const ExportReport = observer((): ReactElement => {
  const { variantsForExport } = mainTableStore

  const disabled = !variantsForExport

  const { popoverAnchor, isPopoverOpen, onToggle, closePopover } = usePopover()

  const handleDownload = (type: ExportTypeEnum) => {
    if (typeof variantsForExport === 'number' && variantsForExport > 300) {
      showToast(t('ds.tooMuchVariants'), 'error', {
        position: 'top-right',
        autoClose: 3500,
        style: { top: 40 },
      })

      return
    }

    operationsStore.exportReportAsync(type)
  }

  return (
    <>
      <ExportReportButton
        isOpen={isPopoverOpen}
        onClick={onToggle}
        disabled={disabled}
      />

      <ExportReportPopover
        isOpen={isPopoverOpen}
        anchorEl={popoverAnchor}
        onClose={closePopover}
        handleDownload={handleDownload}
      />
    </>
  )
})
