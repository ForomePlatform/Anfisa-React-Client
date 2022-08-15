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
  onToggleExpand: () => void
  onToggleFavorite: () => void
  onClick: () => void
}

export const WidgetTabHeader = ({
  group,
  isAllTabsOpened,
  onToggleExpand,
  onToggleFavorite,
  onClick,
}: IWidgetTabHeaderProps): ReactElement => (
  <div className={styles.tab__header}>
    <div className={styles.tab__container} onClick={onClick}>
      {group.name === 'Functional Units' ? (
        <FnLabel className="mr-2" />
      ) : (
        <PredictionPowerIndicator
          className="mr-2 rounded cursor-pointer"
          value={group.power || 0}
        />
      )}

      <div className={styles.tab__header__title}>{group.name}</div>
    </div>

    <div
      className={cn(styles.tab__container, styles.tab__container__grab)}
      data-drag-handle={true}
    >
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
            onToggleFavorite()
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
          onClick={onToggleExpand}
          className="text-grey-blue hover:text-blue-bright"
        />
      </div>
    </div>
  </div>
)
