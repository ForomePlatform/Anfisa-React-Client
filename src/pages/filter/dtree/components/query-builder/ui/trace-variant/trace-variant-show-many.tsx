import { ReactElement } from 'react'

import { TDtreeTraceResultData } from '@service-providers/decision-trees/decision-trees.interface'
import { PointToStep } from './trace-variant-popover'

export interface ShowManyTracesProps {
  data: TDtreeTraceResultData
  point2step: PointToStep
}

export const TraceVariantMany = ({
  data,
  point2step,
}: ShowManyTracesProps): ReactElement => (
  <div style={{ marginTop: '0.5em', maxHeight: '25em', overflowY: 'auto' }}>
    {data.traces?.map(trace => (
      <div style={{ marginTop: '0.3em' }} key={trace['point-no']}>
        <div style={{ paddingLeft: '2ch' }}>
          {`${trace.status} at step ${point2step(trace['point-no'])}`}
        </div>
        {trace.transcripts.map(transcript => (
          <div style={{ paddingLeft: '4ch' }} key={transcript}>
            {transcript}
          </div>
        ))}
      </div>
    ))}
  </div>
)
