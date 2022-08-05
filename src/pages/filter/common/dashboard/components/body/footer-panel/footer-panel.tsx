import styles from './footer-panel.module.css'

import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import dashboardStore from '@pages/filter/common/dashboard'
import { FooterTab } from '@pages/filter/common/dashboard/components/body/footer-panel/footer-tab'

export const FooterPanel = observer(
  (): ReactElement => (
    <div className={styles.footerPanel}>
      {dashboardStore.spareTabs.map((group, index) => {
        return <FooterTab group={group} index={index} key={group.name} />
      })}
    </div>
  ),
)
