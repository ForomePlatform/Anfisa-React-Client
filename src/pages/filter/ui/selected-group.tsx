import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import filterStore from '@store/filter'
import { EmptySelectedGroup } from './empty-selected-group'
import { EnumPanel } from './panels/enum-panel'
import { FunctionPanel } from './panels/function-panel/function-panel'
import { RangePanel } from './panels/range-panel'
import { SelectedGroupHeader } from './selected-group-header'

export const SelectedGroup = observer((): ReactElement => {
  if (!filterStore.selectedGroupItem.name) {
    return <EmptySelectedGroup />
  }

  const { isRedactorMode } = filterStore

  const getGroup = () => {
    switch (filterStore.selectedGroupItem.kind) {
      case FilterKindEnum.Enum:
        return <EnumPanel />
      case FilterKindEnum.Func:
        return <FunctionPanel />
      case FilterKindEnum.Numeric:
        return <RangePanel />
    }
  }

  return (
    <div
      className={cn(
        'border border-grey-disabled pt-3 px-4 w-1/3 overflow-y-auto',
        { 'bg-blue-tertiary': isRedactorMode },
      )}
      style={{ height: 'calc(100vh - 203px)' }}
    >
      <SelectedGroupHeader />

      <div className="bg-grey-light h-px w-full mt-4" />

      {getGroup()}
    </div>
  )
})
