import styles from './trace-variant.module.css'

import { ReactElement, useState } from 'react'
import cn from 'classnames'

import { Input } from '@ui/input'
import {
  TDtreeTrace,
  TDtreeTraceResultData,
} from '@service-providers/decision-trees/decision-trees.interface'
import { PointToStepName } from './trace-variant-popover'
import { t } from '@i18n'

export interface TracesResultViewProps {
  data: TDtreeTraceResultData
  point2step: PointToStepName
  selectStep: (p: number) => void
}

export const TracesResultView = ({
  data,
  point2step,
  selectStep,
}: TracesResultViewProps): ReactElement => {
  const [filter, setFilter] = useState('')
  const traces: Array<TDtreeTrace> =
    data.traces ?? (data.trace && [{ ...data.trace, transcripts: [] }]) ?? []
  if (data.trace && data['transcript-id']) {
    traces[0].transcripts = [data['transcript-id']]
  }

  const [selected, setSelected] = useState(-1)
  const select = (idx: number) => {
    setSelected(idx)
    const pointNo =
      idx >= 0 && idx < traces.length ? traces[idx]['point-no'] : -1
    selectStep(pointNo)
  }

  let showFilter = filter.length > 0
  if (!showFilter) {
    let total = 0
    for (const trace of traces) {
      total += trace.transcripts.length
      if (total > 3) {
        showFilter = true
        break
      }
    }
  }

  const getFilteredTraces = (transcripts: string[]) => {
    const children: Array<ReactElement> = []
    transcripts.forEach(transcript => {
      if (transcript.includes(filter)) {
        children.push(
          <div style={{ paddingLeft: '2ch' }} key={transcript}>
            {transcript}
          </div>,
        )
      }
    })
    if (children.length === 0) {
      children.push(
        <div style={{ paddingLeft: '2ch', fontStyle: 'italic' }}>
          {t('dtree.traceVariant.filteredOut')}
        </div>,
      )
    }
    return children
  }

  return (
    <>
      {showFilter && (
        <Input
          onChange={e => setFilter(e.target.value)}
          value={filter}
          shape="brick"
          placeholder="search for transcript"
          size="s"
        />
      )}
      <div className={styles.traceVariant__results__container}>
        {traces.map((trace, idx) => (
          <div
            className={cn(
              styles.traceVariant__results,
              selected === idx
                ? styles.traceVariant__results_selected
                : styles.traceVariant__results_unselected,
            )}
            onClick={() => select(idx)}
          >
            {`${trace.status} at ${point2step(trace['point-no'])}`}
            {getFilteredTraces(trace.transcripts)}
          </div>
        ))}
      </div>
    </>
  )
}
