import styles from './trace-variant.module.css'

import { ReactElement, useState } from 'react'
import cn from 'classnames'

import {
  TDtreeTrace,
  TDtreeTraceResultData,
} from '@service-providers/decision-trees/decision-trees.interface'
import { PointToStepName } from './trace-variant-popover'

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

  return (
    <div style={{ maxHeight: '25em', overflowY: 'auto' }}>
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
          {trace.transcripts.map(transcript => (
            <div style={{ paddingLeft: '2ch' }} key={transcript}>
              {transcript}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
