import styles from './dashboard.module.css'

import { ReactElement } from 'react'

import { Loader } from '@ui/loader'
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

  return (
    <div className={styles.dashboard}>
      <DashboardHeader />

      {isFetching ? <Loader /> : <DashboardBody groups={extenderGroups} />}
    </div>
  )
}
