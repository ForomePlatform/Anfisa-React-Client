import styles from './dashboard.module.css'

import { ReactElement, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { Loader } from '@ui/loader'
import { DashboardBody } from './components/body'
import { DashboardHeader } from './components/header'
import { IDashboardProps } from './dashboard.interfaces'
import dashboardStore from './index'

export const Dashboard = observer(
  ({
    page,
    groups,
    functionalUnits,
    isFetching,
  }: IDashboardProps): ReactElement => {
    const extendedGroups = dashboardStore.geExtendedGroups(
      groups,
      functionalUnits,
    )

    dashboardStore.setPage(page)

    const [filterValue, setFilterValue] = useState('')

    const preparedFilterValue = filterValue.toLowerCase()

    const filteredGroups = dashboardStore.getFilteredGroups(
      extendedGroups,
      preparedFilterValue,
    )

    return (
      <div className={styles.dashboard}>
        <DashboardHeader filterValue={filterValue} onChange={setFilterValue} />

        {isFetching ? (
          <Loader />
        ) : (
          <DashboardBody
            groups={extendedGroups}
            filteredGroups={filteredGroups}
          />
        )}
      </div>
    )
  },
)
