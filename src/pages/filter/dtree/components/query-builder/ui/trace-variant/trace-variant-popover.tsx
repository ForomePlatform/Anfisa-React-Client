import styles from './trace-variant.module.css'

import { FC, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { DtreeTraceAsyncStore } from '@store/dtree/dtree-trace.async.store'
import stepStore, { ActiveStepOptions } from '@store/dtree/step.store'
import { Button } from '@ui/button'
import { Input } from '@ui/input'
import { Loader } from '@ui/loader'
import { MenuList, MenuListItem } from '@ui/menu-list'
import { Popover } from '@ui/popover'
import { IPopoverBaseProps } from '@ui/popover/popover.interface'
import { PopupCard } from '@components/popup-card/popup-card'
import { TracesResultView } from './trace-variant-results'

export interface ITraceVariantButtonProps extends IPopoverBaseProps {
  traceStore: DtreeTraceAsyncStore
}

export type PointToStepIdx = (p: number) => number | undefined
export type PointToStepName = (p: number) => string | undefined

export const TraceVariantPopover: FC<ITraceVariantButtonProps> = observer(
  ({ isOpen, anchorEl, onClose, traceStore }) => {
    const { data, isLoading, activeJobStatus } = traceStore
    const [variant, setVariant] = useState<string>('')
    const [isStopped, setStopped] = useState<boolean>(true)
    const [isHistoryShown, showHistory] = useState<boolean>(false)
    //const [transcript] = useState<string>('') // reserved for future use
    const transcript = ''

    const point2stepIdx: PointToStepIdx = p => {
      const idx = stepStore.steps.findIndex(
        step => step.returnPointIndex === p || step.conditionPointIndex === p,
      )
      return idx < 0 ? undefined : idx
    }

    const point2step: PointToStepName = p => {
      const idx = point2stepIdx(p)
      if (idx != null) {
        return stepStore.steps[idx].isFinalStep
          ? 'Final Step'
          : `Step ${stepStore.steps[idx].step}`
      }
    }

    const keys = traceStore.getCacheKeys()

    const selectStep = (pointNo: number) => {
      const theStepIdx = point2stepIdx(pointNo)
      if (pointNo) {
        stepStore.makeStepActive({
          index: theStepIdx ?? -1,
          option: ActiveStepOptions.ReturnedVariants,
        })
        stepStore.scrollToStep(theStepIdx)
      }
    }

    const historyButton = () => {
      if (isLoading) {
        return (
          <Button
            onClick={() => {
              setStopped(true)
              traceStore.abortController?.abort()
              traceStore.invalidate()
            }}
            text={t('dtree.traceVariant.stop')}
            variant="diestruction"
            disabled={isStopped}
          />
        )
      } else if (keys.length > 0) {
        return (
          <Button
            onClick={() => {
              showHistory(!isHistoryShown)
            }}
            text={t(
              `dtree.traceVariant.${isHistoryShown ? 'results' : 'history'}`,
            )}
            variant="secondary"
          />
        )
      }
    }

    const displayHistory = () => {
      return (
        <div onMouseUp={event => event.stopPropagation()}>
          <MenuList className={styles.traceVariant__results__container}>
            {keys.map(key => (
              <MenuListItem
                label={key}
                onClick={() => {
                  setImmediate(() =>
                    traceStore.setQuery({ variant: key, transcript }),
                  )
                  setVariant(key)
                  showHistory(false)
                }}
              />
            ))}
          </MenuList>
        </div>
      )
    }

    const displayData = () => {
      if (isLoading) {
        return activeJobStatus ? (
          <div>{activeJobStatus}</div>
        ) : (
          <Loader size="xs" />
        )
      }
      if (!data || data[0].variant !== variant) {
        return null
      }
      return data[1] === 'Finished' ? (
        <TracesResultView
          data={data[0]}
          point2step={point2step.bind(this)}
          selectStep={selectStep.bind(this)}
        />
      ) : (
        <div style={{ color: 'red' }}>{`Error: ${data[0].error}`}</div>
      )
    }

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
              setStopped(false)
              setVariant(variant.trim())
              traceStore.setQuery({ variant, transcript })
              showHistory(false)
            }}
            isApplyDisabled={variant.length < 7 || isLoading}
            isLoading={false}
            cancelText={t('dtree.traceVariant.close')}
            applyText={t('dtree.traceVariant.go')}
            additionalBottomButton={historyButton()}
          >
            <Input
              onChange={e => setVariant(e.target.value)}
              value={variant}
              shape="brick"
              placeholder="enter variant id"
              size="m"
            />
            <div style={{ height: '0.7em' }} />
            {isHistoryShown ? displayHistory() : displayData()}
          </PopupCard>
        </Popover>
      </>
    )
  },
)
