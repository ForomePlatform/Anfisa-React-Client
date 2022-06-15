import { observer } from 'mobx-react-lite'

import { Tag } from '@ui/tag'
import { EMPTY_VALUE } from '../cell.constants'
import { ICellProps } from '../cell.interface'

export const TagsCell = observer(({ className, style, row }: ICellProps) => {
  const tags = Object.keys(row._tags ?? {}).filter(tag => tag !== '_note')

  return (
    <td className={className} style={style}>
      {tags.length > 0 ? (
        <div className="flex flex-wrap">
          {tags.slice(0, 2).map(tag => (
            <Tag key={tag} text={tag} isActive hideCloseIcon />
          ))}

          {tags.length > 2 && (
            <Tag text={`+${tags.length - 2}`} isActive hideCloseIcon />
          )}
        </div>
      ) : (
        EMPTY_VALUE
      )}
    </td>
  )
})
