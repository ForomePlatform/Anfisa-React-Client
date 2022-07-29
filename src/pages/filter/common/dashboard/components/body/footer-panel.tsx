import styles from './dashboard-body.module.css'

import { ReactElement } from 'react'

import { DashboardGroupTypes } from '@core/enum/dashboard-group-types-enum'
import { FnLabel } from '@components/fn-label'
import { PredictionPowerIndicator } from '@components/prediction-power-indicator'
import {
  IChangeGroupPlaceProps,
  IExtendedTUnitGroups,
} from '../../dashboard.interfaces'

export interface IFooterPanelProps {
  spareTabs: IExtendedTUnitGroups[]
  onChange: (props: IChangeGroupPlaceProps) => void
}

export const FooterPanel = ({
  spareTabs,
  onChange,
}: IFooterPanelProps): ReactElement => {
  return (
    <div className={styles.body__sparePanel}>
      {spareTabs.map((group, index) => (
        <div
          className={styles.body__sparePanel__tab}
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

          <div className={styles.body__sparePanel__tab__title}>
            {group.name}
          </div>
        </div>
      ))}
    </div>
  )
}
