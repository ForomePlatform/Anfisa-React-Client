import { ReactElement } from 'react'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import variantStore from '@store/variant'
import { CopyToClipboard } from '@ui/copy-to-clipboard'
import { CellI } from './cell-interfaces'
import { isRowSelected } from './table'

export const CellVariant = observer(
  ({ cell }: CellI): ReactElement => {
    const value = get(cell, 'value', '').split(' ')
    const rowIndex = get(cell, 'row.index', null)
    const selectedRow = isRowSelected(rowIndex, variantStore.index)

    return (
      <div className="text-12 leading-18px">
        <div className="flex">
          <span className="mr-1">{value[0]}</span>

          <CopyToClipboard
            text={`${value[0]} ${value[1]}`}
            colorClass={selectedRow ? 'text-white' : undefined}
          />
        </div>
        <div>{value[1]}</div>
      </div>
    )
  },
)
