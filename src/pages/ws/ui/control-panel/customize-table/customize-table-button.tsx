import { ReactElement } from 'react'
import cn from 'classnames'

import { t } from '@i18n'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { IPopoverButtonBaseProps } from '@ui/popover/popover.interface'
import { MainTableDataCy } from '@data-testid'

export const CustomizeTableButton = ({
  isOpen,
  onShowPopover,
}: IPopoverButtonBaseProps): ReactElement => (
  <Button
    dataTestId={MainTableDataCy.customizeTable}
    onClick={e => onShowPopover(e.currentTarget)}
    text={t('ds.customizeTable')}
    variant="secondary-dark"
    size="sm"
    prepend={<Icon name="Settings" size={14} className="text-blue-bright" />}
    append={
      <Icon
        name="Arrow"
        size={14}
        className={cn(
          'transform transition-transform',
          isOpen ? 'rotate-90' : '-rotate-90',
        )}
      />
    }
  />
)
