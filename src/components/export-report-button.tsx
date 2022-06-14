import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { theme } from '@theme'
import operationsStore from '@store/operations'
import mainTableStore from '@store/ws/main-table.store'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { MainTableDataCy } from './data-testid/main-table.cy'
interface IExportReportButtonProps {
  isOpen?: boolean
  refEl: HTMLAnchorElement
  onClick?: () => void
}

export const ExportReportButton = observer(
  ({ isOpen, refEl, ...rest }: IExportReportButtonProps): ReactElement => {
    const { variantsForExport } = mainTableStore

    const disabled = !variantsForExport

    return (
      <Button
        disabled={disabled}
        text={t('general.exportReport')}
        isLoading={operationsStore.isExportingReport}
        dataTestId={MainTableDataCy.exportReport}
        refEl={refEl}
        size="xs"
        padding="dense"
        variant="primary-dark"
        prepend={<Icon name="Export" />}
        onClick={rest.onClick}
        style={{
          pointerEvents: operationsStore.isExportingReport ? 'none' : 'inherit',
          backgroundColor: !disabled && theme('colors.blue.secondary'),
          borderColor: !disabled && theme('colors.blue.secondary'),
        }}
        textSize="sm"
        append={
          <Icon
            name="Arrow"
            className={cn(
              'transform transition-transform',
              isOpen ? 'rotate-90' : '-rotate-90',
            )}
          />
        }
        onMouseUp={e => e.stopPropagation()}
      />
    )
  },
)
