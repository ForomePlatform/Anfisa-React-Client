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
  <>
    {filterContent.map(subFilterName => (
      <div
        key={filterId + subFilterName}
        className={cn('flex items-center pl-4 py-2', {
          'bg-blue-tertiary': isFilterActive,
        })}
      >
        <span className="text-14 leading-16px ml-4">{subFilterName}</span>
      </div>
    ))}
  </>
)
