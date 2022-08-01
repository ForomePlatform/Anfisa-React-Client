import styles from './dashboard.module.css'

import { ReactElement } from 'react'

import { Loader } from '@ui/loader'
import { useFilteredUnits } from '@components/units-list/units-lilst.utils'
import { DashboardBody } from './components/body'
import { DashboardHeader } from './components/header'
import { IDashboardProps } from './dashboard.interfaces'
import dashboardStore from './index'

export const Dashboard = ({
  groups,
  functionalUnits,
  isFetching,
}: IDashboardProps): ReactElement => {
  const extenderGroups = dashboardStore.geExtendedGroups(
    groups,
    functionalUnits,
  )

  const { filterValue, setFilterValue, filteredGroups } =
    useFilteredUnits(groups)

  return (
    <div className={styles.dashboard}>
      <DashboardHeader filterValue={filterValue} onChange={setFilterValue} />

      {isFetching ? (
        <Loader />
      ) : (
        <DashboardBody
          groups={extenderGroups}
          filteredGroups={filteredGroups}
        />
      )}
    </div>
  )
}
