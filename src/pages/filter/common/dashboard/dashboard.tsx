import styles from './dashboard.module.css'

import { ReactElement, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { Loader } from '@ui/loader'
import { IUnitsProps } from '@pages/filter/refiner/refiner.interfaces'
import { DashboardBody } from './components/body'
import { DashboardHeader } from './components/header'
import dashboardStore from './index'

export interface IDashboardProps extends IUnitsProps {}

export const Dashboard = observer(
  ({ groups, functionalUnits, isFetching }: IDashboardProps): ReactElement => {
    useEffect(() => {
      if (groups.length) {
        dashboardStore.setGroups(groups, functionalUnits)
      }
    }, [functionalUnits, groups, isFetching])

    return (
      <div className={styles.dashboard}>
        <DashboardHeader />

        {isFetching ? <Loader /> : <DashboardBody />}
      </div>
    )
  },
)
