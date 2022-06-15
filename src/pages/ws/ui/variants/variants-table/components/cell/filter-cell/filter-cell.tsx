import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { EMPTY_VALUE } from '../cell.constants'
import { ICellProps } from '../cell.interface'

export const FilterCell = observer(({ className, style, row }: ICellProps) => {
  const value = row.FT

  return (
    <td className={cn(className, 'break-words break-all')} style={style}>
      {value[0] || EMPTY_VALUE}
    </td>
  )
})
