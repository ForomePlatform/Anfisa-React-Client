import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { CopyToClipboard } from '@components/copy-to-clipboard'
import { ICellProps } from '../cell.interface'

export const VariantCell = observer(
  ({ className, isRowSelected, style, row }: ICellProps) => {
    const { Coordinate, Change } = row

    return (
      <td className={cn(className, 'leading-18px')} style={style}>
        <div className="flex">
          <span className="mr-1">{Coordinate}</span>

          <CopyToClipboard
            text={`${Coordinate} ${Change}`}
            className={isRowSelected ? 'text-white' : 'text-blue-bright'}
          />
        </div>
        <div>{Change}</div>
      </td>
    )
  },
)
