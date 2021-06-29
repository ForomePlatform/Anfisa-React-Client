import { ReactElement } from 'react'
import get from 'lodash/get'

import { CellI } from './cell-interfaces'

export const CellFilter = (cell: CellI): ReactElement => {
  const filters = get(cell, 'value', []) as string[]

  return (
    <div
      style={{ width: 100, overflowWrap: 'break-word', wordBreak: 'break-all' }}
    >
      {filters[0]}
    </div>
  )
}
