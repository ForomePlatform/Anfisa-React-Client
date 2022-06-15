import { observer } from 'mobx-react-lite'

import { EMPTY_VALUE } from '../cell.constants'
import { ICellProps } from '../cell.interface'

export const PopulationCell = observer(
  ({ className, style, row }: ICellProps) => {
    const items: [string, number | null | undefined][] = [
      ['Overall AF', row.gnomAD_Overall_AF],
      ['Genome AF', row.gnomAD_Genomes_AF],
      ['Exome AF', row.gnomAD_Exomes_AF],
    ]

    let isEmpty = true

    return (
      <td className={className} style={style}>
        {items.map(([title, value]) => {
          if (value != null) {
            isEmpty = false
            return (
              <div
                key={title}
                className="typography-xs truncate whitespace-nowrap"
              >
                <span className="font-medium">{title}: </span>
                {value.toFixed(5)}
              </div>
            )
          }
        })}
        {isEmpty && EMPTY_VALUE}
      </td>
    )
  },
)
