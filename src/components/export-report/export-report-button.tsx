import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { theme } from '@theme'
import operationsStore from '@store/operations'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { IPopoverButtonBaseProps } from '@ui/popover/popover.interface'
import { MainTableDataCy } from '@data-testid'

export const ExportReportButton = observer(
  ({
    disabled,
    isOpen,
    onShowPopover,
  }: IPopoverButtonBaseProps): ReactElement => (
    <Button
      disabled={disabled}
      text={t('general.exportReport')}
      isLoading={operationsStore.isExportingReport}
      dataTestId={MainTableDataCy.exportReport}
      size="xs"
      padding="dense"
      variant="primary-dark"
      prepend={<Icon name="Export" />}
      onClick={e => onShowPopover(e.currentTarget)}
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
    />
  ),
)
