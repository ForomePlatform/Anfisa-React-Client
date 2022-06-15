import styles from './in-silico-cell.module.css'

import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { EMPTY_VALUE } from '../cell.constants'
import { ICellProps } from '../cell.interface'

export const InSilicoCell = observer(
  ({ className, style, row }: ICellProps) => {
    const items: [string, [string, number] | undefined][] = [
      ['Polyphen', row.Polyphen?.[0]],
      ['SIFT', row.SIFT?.[0]],
      ['MUT TASTER', row['MUT TASTER']?.[0]],
      ['FATHMM', row.FATHMM?.[0]],
    ]

    let isEmpty = true

    return (
      <td className={className} style={style}>
        {items.map(([title, value]) => {
          if (value) {
            isEmpty = false
            return (
              <div
                key={title}
                className={cn(styles.entry, styles[`entry_${value[1]}`])}
              >
                {title}: {value[0]}
              </div>
            )
          }
        })}
        {isEmpty && EMPTY_VALUE}
      </td>
    )
  },
)
