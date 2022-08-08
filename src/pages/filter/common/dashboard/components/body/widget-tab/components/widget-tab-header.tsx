import styles from '../widget-tab.module.css'

import { ReactElement } from 'react'
import cn from 'classnames'

import { Divider } from '@ui/divider'
import { Icon } from '@ui/icon'
import { FnLabel } from '@components/fn-label'
import { PredictionPowerIndicator } from '@components/prediction-power-indicator'
import { IExtendedTUnitGroup } from '../../../../dashboard.interfaces'

export interface IWidgetTabHeaderProps {
  group: IExtendedTUnitGroup
  isAllTabsOpened: boolean
  onToggle: () => void
  onFavorite: () => void
}

export const WidgetTabHeader = ({
  group,
  isAllTabsOpened,
  onToggle,
  onFavorite,
}: IWidgetTabHeaderProps): ReactElement => (
  <div className={styles.tab__header}>
    <div className="flex items-center">
      {group.name === 'Functional Units' ? (
        <FnLabel className="mr-2" />
      ) : (
        <PredictionPowerIndicator
          className="mr-2 rounded"
          value={group.power || 0}
        />
      )}

      <div className={styles.tab__header__title}>{group.name}</div>
    </div>

    <div
      className={styles.tab__header__controls}
      onClick={e => e.stopPropagation()}
    >
      <Icon
        name="Favorites"
        className={cn('text-grey-blue hover:text-yellow-secondary', {
          'fill-yellow-secondary text-yellow-secondary': group.isFavorite,
        })}
        onClick={e => {
          e.stopPropagation()
          onFavorite()
        }}
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
