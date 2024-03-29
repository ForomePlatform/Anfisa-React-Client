import { observer } from 'mobx-react-lite'

import filterStore from '@store/filter'
import { UnitsList } from '@components/units-list'
import { IFilterRefinerProps } from '../../refiner.interfaces'
import filterRefinerUnitsStore from './filter-refiner-units.store'

export const FilterRefinerUnits = observer((props: IFilterRefinerProps) => {
  const { functionalConditions } = filterRefinerUnitsStore
  const { className, groups, functionalUnits, isFetching } = props

  return (
    <UnitsList
      isDark
      className={className}
      groups={groups}
      functionalUnits={functionalUnits}
      functionalConditions={functionalConditions}
      isLoading={isFetching}
      onSelect={({ name }) => {
        filterStore.setAttributeToAdd(name)
      }}
      selectedUnit={filterStore.attributeNameToAdd}
      onFunctionalConditionSelect={condition =>
        filterStore.selectCondition(condition.key as number)
      }
      fetchedAmount={filterStore.downloadedAmount}
    />
  )
})
