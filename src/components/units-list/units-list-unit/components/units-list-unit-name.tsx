import { FC, memo } from 'react'
import cn, { Argument } from 'classnames'

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
      <span
        className={cn(className)}
        onClick={onClick}
        data-testid={DecisionTreesResultsDataCy.unitName}
      >
        {tooltip ? (
          <Tooltip
            theme="light"
            title={tooltip}
            placement="top-start"
            trigger="hover"
            enterDelay={700}
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
