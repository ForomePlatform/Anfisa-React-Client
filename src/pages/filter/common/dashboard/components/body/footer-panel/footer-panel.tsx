import styles from './footer-panel.module.css'

import { ReactElement } from 'react'

import { DashboardGroupTypes } from '@core/enum/dashboard-group-types-enum'
import { FnLabel } from '@components/fn-label'
import { PredictionPowerIndicator } from '@components/prediction-power-indicator'
import { IFooterPanelProps } from '../../../dashboard.interfaces'

export const FooterPanel = ({
  spareTabs,
  onChange,
}: IFooterPanelProps): ReactElement => (
  <div className={styles.footerPanel}>
    {spareTabs.map((group, index) => (
      <div
        className={styles.footerPanel__tab}
        key={group.name}
        onClick={() =>
          onChange({
            groupType: DashboardGroupTypes.Spare,
            groupName: group.name,
            groupIndex: index,
          })
        }
      >
        {group.name === 'Functional Units' ? (
          <FnLabel className="mr-2" />
        ) : (
          <PredictionPowerIndicator
            className="mr-2 rounded"
            value={group.power || 0}
          />
        )}

        <div className={styles.footerPanel__tab__title}>{group.name}</div>
      </div>
    ))}
  </div>
)
