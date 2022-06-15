import { CSSProperties } from 'react'

import { ITabReportRecord } from '@service-providers/dataset-level'

export interface ICellProps {
  className?: string
  style?: CSSProperties
  row: ITabReportRecord
  isRowSelected: boolean
  samples: string[]
}
