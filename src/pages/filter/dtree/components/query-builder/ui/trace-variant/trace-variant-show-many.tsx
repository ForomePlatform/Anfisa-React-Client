import { ReactElement } from 'react'

import { TDtreeTraceResultData } from '@service-providers/decision-trees/decision-trees.interface'

export interface ShowManyTracesProps {
  data: TDtreeTraceResultData
}

export const TraceVariantMany = ({
  data,
}: ShowManyTracesProps): ReactElement => (
  <div style={{ marginTop: '0.5em', maxHeight: '25em', overflow: 'auto' }}>
    {data.traces?.map(trace => (
      <div style={{ marginTop: '0.3em' }}>
        <div
          style={{ paddingLeft: '2ch' }}
        >{`${trace.status} at ${trace['point-no']}`}</div>
        {trace.transcripts.map(transcript => (
          <div style={{ paddingLeft: '4ch' }}>{transcript}</div>
        ))}
      </div>
    ))}
  </div>
)
