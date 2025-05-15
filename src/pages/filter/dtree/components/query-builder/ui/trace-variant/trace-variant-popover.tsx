import styles from './trace-variant.module.css'

import { FC, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { DtreeTraceAsyncStore } from '@store/dtree/dtree-trace.async.store'
import stepStore, { ActiveStepOptions } from '@store/dtree/step.store'
import { Input } from '@ui/input'
import { Loader } from '@ui/loader'
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
    const { data, isLoading } = traceStore
    const [variant, setVariant] = useState<string>('')
    const [transcript] = useState<string>('') // reserved for future use

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

    const displayData = () => {
      if (isLoading) return <Loader size="s" />
      if (!data || data[0].variant.split(' ')[0] !== variant.split(' ')[0]) {
        return null
      }
      return data[1] === 'Finished' ? (
        <TracesResultView
          data={data[0]}
          point2step={point2step.bind(this)}
          selectStep={selectStep.bind(this)}
        />
      ) : (
        <div
          style={{ color: 'red', marginTop: '0.5em' }}
        >{`Error: ${data[0].error}`}</div>
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
              setVariant(variant.trim())
              traceStore.setQuery({ variant, transcript })
            }}
            isApplyDisabled={variant.length < 10}
            isLoading={false}
            applyText={t('dtree.traceVariant.go')}
          >
            <Input
              onChange={e => setVariant(e.target.value)}
              value={variant}
              shape="brick"
              placeholder="enter variant id"
              size="m"
            />
            {/* <div style={{ height: '10px' }} />
             <Input
              onChange={e => setTranscript(e.target.value.trim())}
              value={transcript}
              shape="brick"
              placeholder="optional, transcript id"
              size="m"
            /> */}
            {displayData()}
          </PopupCard>
        </Popover>
      </>
    )
  },
)
