import { ReactElement } from 'react'
import cn from 'classnames'

interface Props {
  filterId: string
  isFilterActive: boolean
  filterContent: string[]
}

export const EnumFilter = ({
  filterId,
  isFilterActive,
  filterContent,
}: Props): ReactElement => (
  <div>
    {filterContent.map((subFilterName, idx) => (
      <div
        key={filterId + subFilterName}
        className={cn('flex items-center pl-4 py-2', {
          'bg-blue-tertiary': isFilterActive,
          'pt-4': idx === 0,
          'pb-4': idx === filterContent.length - 1,
        })}
      >
        <span className="text-14 leading-16px ml-5">{subFilterName}</span>
      </div>
    ))}
  </div>
)
