import styles from './footer-panel.module.css'

import { ReactElement } from 'react'
import cn from 'classnames'

import { DashboardGroupTypes } from '@core/enum/dashboard-group-types-enum'
import { Icon } from '@ui/icon'
import { FnLabel } from '@components/fn-label'
import { PredictionPowerIndicator } from '@components/prediction-power-indicator'
import { IFooterPanelProps } from '../../../dashboard.interfaces'

export const FooterPanel = ({
  spareTabs,
  filteredGroups,
  onChange,
  onMakeTabFavorite,
}: IFooterPanelProps): ReactElement => (
  <div className={styles.footerPanel}>
    {spareTabs.map((group, index) => {
      const groupName = group.name.toLowerCase()

      const isGroupInSearch = filteredGroups.some(group =>
        group.name.toLowerCase().startsWith(groupName),
      )
      return (
        <div
          className={cn(
            styles.footerPanel__tab,
            !isGroupInSearch && styles.footerPanel__tab_disabled,
          )}
          key={group.name}
          onClick={() =>
            onChange({
              groupType: DashboardGroupTypes.Spare,
              groupName: group.name,
              groupIndex: index,
            })
          }
        >
          <div className="flex items-center">
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

          <Icon
            name="Favorites"
            className={cn('text-grey-blue hover:text-yellow-secondary', {
              'fill-yellow-secondary text-yellow-secondary': group.isFavorite,
            })}
            onClick={e => {
              e.stopPropagation()
              onMakeTabFavorite(DashboardGroupTypes.Spare, group.name, index)
            }}
          />
        </div>
      )
    })}
  </div>
)
