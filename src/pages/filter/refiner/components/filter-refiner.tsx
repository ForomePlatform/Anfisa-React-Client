import { ReactElement, useEffect, useRef } from 'react'
import cn from 'classnames'

import mainTableStore from '@store/ws/main-table.store'
import { QueryBuilderGroups } from '../../common/groups/query-builder-groups'
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
      <QueryBuilderGroups />

      <SelectedGroup />

      <QuerySelected />
    </div>
  )
}
