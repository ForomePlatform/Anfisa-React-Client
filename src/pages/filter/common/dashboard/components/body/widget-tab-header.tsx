import styles from './dashboard-body.module.css'

import { ReactElement } from 'react'

import { DashboardGroupTypes } from '@core/enum/dashboard-group-types-enum'
import { Divider } from '@ui/divider'
import { Icon } from '@ui/icon'
import { FnLabel } from '@components/fn-label'
import { PredictionPowerIndicator } from '@components/prediction-power-indicator'
import {
  IChangeGroupPlaceProps,
  IExtendedTUnitGroups,
} from '../../dashboard.interfaces'

export interface IWidgetTabHeaderProps {
  group: IExtendedTUnitGroups
  index: number
  isAllTabsOpened?: boolean
  onChange: (props: IChangeGroupPlaceProps) => void
  onToggle: () => void
}

export const WidgetTabHeader = ({
  group,
  index,
  isAllTabsOpened,
  onChange,
  onToggle,
}: IWidgetTabHeaderProps): ReactElement => {
  return (
    <div className={styles.body__tab__header}>
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
        <Icon
          name="Favorites"
          className="text-grey-blue hover:text-yellow-secondary"
        />

        <Divider
          spacing="min"
          orientation="vertical"
          color="light-blue"
          className="w-px"
        />

        <Icon
          name={isAllTabsOpened ? 'Collapse' : 'Expand'}
          onClick={onToggle}
          className="text-grey-blue hover:text-blue-bright"
        />
      </div>
    </div>
  )
}
