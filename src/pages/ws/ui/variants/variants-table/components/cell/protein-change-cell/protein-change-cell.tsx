import { observer } from 'mobx-react-lite'

import { EMPTY_VALUE } from '../cell.constants'
import { ICellProps } from '../cell.interface'

export const ProteinChangeCell = observer(
  ({ className, style, row }: ICellProps) => {
    const value = row['Protein Change']

    return (
      <td className={className} style={style}>
        {!value || value.length === 0
          ? EMPTY_VALUE
          : value.map((item, index) => (
              <div key={index} className="text-10 overflow-hidden truncate">
                {item}
              </div>
            ))}
      </td>
    )
  },
)
