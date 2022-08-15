import styles from '../../units-list-controls.module.css'

import { ReactElement } from 'react'
import cn from 'classnames'

import { ViewTypeDashboard } from '@core/enum/view-type-dashboard-enum'
import { Icon } from '@ui/icon'

interface IUnitsViewSwitchProps {
  isListView: boolean
  onToggleViewType: (viewType: ViewTypeDashboard) => void
}

export const UnitsViewSwitch = ({
  isListView,
  onToggleViewType,
}: IUnitsViewSwitchProps): ReactElement => (
  <>
    <button
      className={cn(
        styles.controls__buttonView,
        styles.controls__buttonView_list,
        isListView && styles.controls__buttonView_active,
      )}
      onClick={() => onToggleViewType(ViewTypeDashboard.List)}
    >
      <div className={cn(styles.controls__buttonView__content)}>
        <Icon name="List" size={16} />
      </div>
    </button>

    <button
      className={cn(
        styles.controls__buttonView,
        styles.controls__buttonView_tile,
        !isListView && styles.controls__buttonView_active,
      )}
      onClick={() => onToggleViewType(ViewTypeDashboard.Tile)}
    >
      <div className={cn(styles.controls__buttonView__content)}>
        <Icon name="Tile" />
      </div>
    </button>
  </>
)
