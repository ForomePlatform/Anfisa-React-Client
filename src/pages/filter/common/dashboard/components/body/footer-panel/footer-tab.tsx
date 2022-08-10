import styles from '@pages/filter/common/dashboard/components/body/footer-panel/footer-panel.module.css'

import { ReactElement, useMemo } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { DashboardGroupTypes } from '@core/enum/dashboard-group-types-enum'
import { Icon } from '@ui/icon'
import { FnLabel } from '@components/fn-label'
import { PredictionPowerIndicator } from '@components/prediction-power-indicator'
import dashboardStore from '@pages/filter/common/dashboard'
import { IExtendedTUnitGroup } from '@pages/filter/common/dashboard/dashboard.interfaces'

interface IFooterTabProps {
  group: IExtendedTUnitGroup
  index: number
}

export const FooterTab = observer(
  ({ group, index }: IFooterTabProps): ReactElement => {
    const { filterValue, changeTabPlace, onToggleFavorite } = dashboardStore

    const isGroupInSearch = useMemo(() => {
      const value = filterValue.toLowerCase()
      return group.units.some(unit => unit.name.toLowerCase().includes(value))
    }, [filterValue, group])

    return (
      <div
        className={cn(
          styles.footerPanel__tab,
          !isGroupInSearch && styles.footerPanel__tab_disabled,
        )}
        key={group.name}
        onClick={() =>
          changeTabPlace(DashboardGroupTypes.Spare, group.name, index)
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
            onToggleFavorite(DashboardGroupTypes.Spare, group.name, index)
          }}
        />
      </div>
    )
  },
)
