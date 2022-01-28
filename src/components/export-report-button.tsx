import { ReactElement } from 'react'
import cn, { Argument } from 'classnames'

import { t } from '@i18n'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { MainTableDataCy } from './data-testid/main-table.cy'

interface Props {
  isOpen?: boolean
  refEl: any
  className?: Argument
  onClick?: () => void
}

export const ExportReportButton = ({ isOpen, refEl, className, ...rest }: Props): ReactElement => (
  <Button
    text={t('general.exportReport')}
    dataTestId={MainTableDataCy.exportReport}
    refEl={refEl}
    size="sm"
    prepend={<Icon name="Export" />}
    onClick={rest.onClick}
    append={<Icon name="Arrow" className={cn('transform transition-transform', isOpen ? 'rotate-90' : '-rotate-90')} />}
  />
)
