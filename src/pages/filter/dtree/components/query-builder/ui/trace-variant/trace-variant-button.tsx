import styles from './trace-variant.module.css'

import { FC } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

// import { t } from '@i18n'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
// import { MainTableDataCy } from '@data-testid'

interface ITraceVariantButtonProps {
  onClick: (target: HTMLElement) => void
  isOpen: boolean
}

export const TraceVariantButton: FC<ITraceVariantButtonProps> = observer(
  ({ onClick, isOpen }) => (
    <Button
      dataTestId="TODO"
      text="Trace variant"
      append={
        <Icon
          name="Arrow"
          size={14}
          className={cn(
            styles.traceVariant__buttonIcon_arrow,
            isOpen && styles.traceVariant__buttonIcon_arrow_opened,
          )}
        />
      }
      onClick={e => onClick(e.currentTarget)}
      variant="secondary"
      size="sm"
      className="w-[180px]"
    />
  ),
)
