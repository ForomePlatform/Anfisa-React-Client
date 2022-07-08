import { ReactElement } from 'react'
import cn, { Argument } from 'classnames'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { ICustomInheritanceModeArgs } from '@service-providers/common/common.interface'
import { getDefaultProblemGroups } from '../utils/get-default-problem-groups'
import { getScenarioValue } from '../utils/get-scenario-value'

interface ICustomInheritanceModeViewProps {
  className?: Argument
  filterContent: string[]
  filterExpression: ICustomInheritanceModeArgs
}

export const CustomInheritanceModeView = ({
  className,
  filterExpression,
}: ICustomInheritanceModeViewProps): ReactElement => {
  const problemGroups = getDefaultProblemGroups(
    FuncStepTypesEnum.CustomInheritanceMode,
  )

  return (
    <div className={cn(className)}>
      <div>
        <div className="text-grey-blue">Scenario</div>

        {problemGroups.map((group, idx) => (
          <div
            className={cn('flex items-center py-1', {
              'pt-2': idx === 0,
            })}
            key={group}
          >
            <span>{group}</span>

            <span className="ml-1 text-grey-blue">
              {getScenarioValue(group, filterExpression.scenario)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
