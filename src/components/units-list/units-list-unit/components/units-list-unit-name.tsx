import cn, { Argument } from 'classnames'
import { FC, memo } from 'react'

import { Tooltip } from '@ui/tooltip'

import { DecisionTreesResultsDataCy } from '../../../data-testid/decision-tree-results.cy'

export interface IUnitsListUnitNameProps {
  className: Argument
  name: string
  tooltip?: string
  onClick: () => void
}

export const UnitsListUnitName: FC<IUnitsListUnitNameProps> = memo(
  ({ tooltip, name, className, onClick }) => {
    return (
      <span className={cn(className)} onClick={onClick}>
        {tooltip ? (
          <Tooltip
            theme="light"
            title={tooltip}
            placement="top-start"
            trigger="hover"
            enterDelay={700}
            data-testid={DecisionTreesResultsDataCy.unitName}
          >
            <span>{name}</span>
          </Tooltip>
        ) : (
          name
        )}
      </span>
    )
  },
)

UnitsListUnitName.displayName = 'UnitsListUnitName'
