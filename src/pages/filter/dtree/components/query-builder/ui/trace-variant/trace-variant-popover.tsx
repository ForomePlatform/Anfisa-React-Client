import styles from './trace-variant.module.css'

import { FC, useState } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { DtreeTraceAsyncStore } from '@store/dtree/dtree-trace.async.store'
import { Icon } from '@ui/icon'
import { Input } from '@ui/input'
import { Popover } from '@ui/popover'
import { IPopoverBaseProps } from '@ui/popover/popover.interface'
import { PopupCard } from '@components/popup-card/popup-card'
import { TraceVariantMany } from './trace-variant-show-many'

export interface ITraceVariantButtonProps extends IPopoverBaseProps {
  traceStore: DtreeTraceAsyncStore
}

export const TraceVariantPopover: FC<ITraceVariantButtonProps> = observer(
  ({ isOpen, anchorEl, onClose, traceStore }) => {
    const { data, isFetching, isLoading } = traceStore
    const [variant, setVariant] = useState<string>('')
    const [transcript, setTranscript] = useState<string>('')
    return (
      <>
        <Popover
          isOpen={isOpen}
          anchorEl={anchorEl}
          onClose={onClose}
          className={styles.traceVariant__popover}
        >
          <PopupCard
            title={t('dtree.traceVariant.title')}
            onClose={onClose}
            onApply={() => {
              traceStore.setQuery({ variant, transcript })
            }}
            isApplyDisabled={variant.length < 10}
            isLoading={false}
            applyText={t('dtree.traceVariant.go')}
          >
            <Input
              onChange={e => setVariant(e.target.value.trim())}
              value={variant}
              shape="brick"
              placeholder="enter variant id"
              size="m"
            />
            <div style={{ height: '10px' }} />
            <Input
              onChange={e => setTranscript(e.target.value.trim())}
              value={transcript}
              shape="brick"
              placeholder="optional, transcript id"
              size="m"
            />
            {isFetching || isLoading ? (
              <Icon
                name="Reload"
                size={16}
                className={cn(styles.traceVariant__buttonIcon_loading)}
              />
            ) : data && data[1] === 'Finished' ? (
              data[0].traces ? (
                <TraceVariantMany data={data[0]} />
              ) : (
                data[0].trace && (
                  <div style={{ paddingLeft: '2ch', marginTop: '0.5em' }}>
                    {`${data[0].trace.status} at ${data[0].trace['point-no']}`}
                  </div>
                )
              )
            ) : data ? (
              <div
                style={{ color: 'red', marginTop: '0.5em' }}
              >{`Error: ${data[0].error}`}</div>
            ) : null}
          </PopupCard>
        </Popover>
      </>
    )
  },
)
