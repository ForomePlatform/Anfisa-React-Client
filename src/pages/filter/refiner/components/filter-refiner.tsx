import { ReactElement, useEffect, useRef } from 'react'
import cn from 'classnames'

import mainTableStore from '@store/ws/main-table.store'
import { FilterRefinerUnits } from './filter-refiner-units'
import { SelectedGroup } from './middle-column/selected-group'
import { QuerySelected } from './right-column/query-selected'

interface IFilterRefinerProps {
  className?: string
}

export const FilterRefiner = ({
  className,
}: IFilterRefinerProps): ReactElement => {
  useEffect(() => {
    mainTableStore.memorizeFilterConditions()
  }, [])

  const nonEmptyDivRef = useRef<any>()

  return (
    <div
      ref={nonEmptyDivRef}
      className={cn('flex overflow-y-hidden', className)}
    >
      <FilterRefinerUnits />

      <SelectedGroup />

      <QuerySelected />
    </div>
  )
}
