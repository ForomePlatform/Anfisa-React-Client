import styles from './dashboard.module.css'

import { ReactElement, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { Loader } from '@ui/loader'
import { ProgressBar } from '@ui/progress-bar'
import { GlbPagesNames } from '@glb/glb-names'
import { IUnitsProps } from '@pages/filter/refiner/refiner.interfaces'
import { DashboardBody } from './components/body'
import { DashboardHeader } from './components/header'
import dashboardStore from './index'

export interface IDashboardProps extends IUnitsProps {
  page: GlbPagesNames
  dataReady: boolean
}

export const Dashboard = observer(
  ({
    page,
    dataReady,
    groups,
    functionalUnits,
    isFetching,
  }: IDashboardProps): ReactElement => {
    useEffect(() => {
      return () => {
        dashboardStore.reset()
      }
    }, [])

    useEffect(() => dashboardStore.setPage(page), [page])

    useEffect(() => {
      if (groups.length) {
        dashboardStore.setGroups(groups, functionalUnits)
      }
    }, [functionalUnits, groups, isFetching, dataReady])

    const showLoader = isFetching && !groups.length

    return (
      <div className={styles.dashboard}>
        <DashboardHeader />

        {!dataReady && (
          <div className={styles.dashboard__loader}>
            <ProgressBar size="sm" />
          </div>
        )}

        {showLoader ? <Loader /> : <DashboardBody />}
      </div>
    )
  },
)
