import { ReactElement } from 'react'

import { ExportTypeEnum } from '@core/enum/export-type.enum'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import operationsStore from '@store/operations'
import { showToast } from '@utils/notifications/showToast'
import { MainTableDataCy } from './data-testid/main-table.cy'
import {
  ISimplePopperModalProps,
  SimplePopperModal,
} from './simple-popper-modal/simple-popper-modal'
import { SimplePopperModalItem } from './simple-popper-modal/simple-popper-modal-item'

export const ExportPanel = ({
  close,
}: ISimplePopperModalProps): ReactElement => {
  const { variantCounts } = datasetStore.fixedStatAmount

  const handleDownload = (type: ExportTypeEnum) => {
    if (typeof variantCounts === 'number' && variantCounts > 300) {
      showToast(t('ds.tooMuchVariants'), 'error')

      close()

      return
    }

    operationsStore.exportReportAsync(type)
    close()
  }

  return (
    <SimplePopperModal close={close} className="w-32">
      <SimplePopperModalItem
        onClick={() => handleDownload(ExportTypeEnum.Excel)}
        data-testid={MainTableDataCy.exportExcel}
      >
        {t('general.excel')}
      </SimplePopperModalItem>

      <SimplePopperModalItem
        onClick={() => handleDownload(ExportTypeEnum.CSV)}
        data-testid={MainTableDataCy.exportCsv}
      >
        {t('general.csv')}
      </SimplePopperModalItem>
    </SimplePopperModal>
  )
}
