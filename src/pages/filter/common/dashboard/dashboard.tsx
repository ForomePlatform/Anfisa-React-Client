import styles from './dashboard.module.css'

import { ReactElement } from 'react'

import { DashboardHeader } from './components'

export const Dashboard = (): ReactElement => {
  return (
    <div className={styles.dashboard}>
      <DashboardHeader />
    </div>
  )
}
