import styles from './dashboard-body.module.css'

import { ReactElement } from 'react'
import cn from 'classnames'

import { DashboardGroupTypes } from '@core/enum/dashboard-group-types-enum'
import { Divider } from '@ui/divider'
import { Icon } from '@ui/icon'
import { FnLabel } from '@components/fn-label'
import { PredictionPowerIndicator } from '@components/prediction-power-indicator'
import {
  IChangeGroupPlaceProps,
  IExtendedTUnitGroups,
} from '../../dashboard.interfaces'

export interface IDashboardBodyProps {
  group: IExtendedTUnitGroups
  index: number
  onChange: (props: IChangeGroupPlaceProps) => void
}

export const WidgetTab = ({
  group,
  index,
  onChange,
}: IDashboardBodyProps): ReactElement => {
  return (
    <>
      <div className={styles.body__tab}>
        <div className={styles.body__tab__header_main}>
          <div className="flex items-center">
            {group.name === 'Functional Units' ? (
              <FnLabel className="mr-2" />
            ) : (
              <PredictionPowerIndicator
                className="mr-2 rounded"
                value={group.power || 0}
              />
            )}

            <div
              className={styles.body__tab__header__title}
              onClick={() => {
                onChange({
                  groupType: DashboardGroupTypes.Main,
                  groupName: group.name,
                  groupIndex: index,
                })
              }}
            >
              {group.name}
            </div>
          </div>

          <div
            className="flex items-center h-3 cursor-pointer"
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            <Icon name="Favorites" className="text-grey-blue" />

            <Divider
              spacing="min"
              orientation="vertical"
              color="light-blue"
              className="w-px"
            />

            <Icon name="Expand" className="text-grey-blue" />
          </div>
        </div>
      </div>

      {group.units.map(unit => (
        <div
          key={unit.name}
          className={cn(styles.body__tab, styles.body__tab_light, 'mt-2')}
        >
          <div className={styles.body__tab__header}>
            <PredictionPowerIndicator className="mr-2 rounded" value={0} />

            <div className={styles.body__tab__header__title}>{unit.name}</div>
          </div>
        </div>
      ))}
    </>
  )
}
