import { ReactElement } from 'react'
import cn from 'classnames'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { getScenarioValue } from '@pages/filter/refiner/components/right-column/func-filter/utils/get-scenario-value'
import { ICustomInheritanceModeArgs } from '@service-providers/common/common.interface'
import { getDefaultProblemGroups } from '../utils/get-default-problem-groups'
interface ICustomInheritanceModeViewProps {
  isFilterActive: boolean
  filterContent: string[]
  filterExpression: ICustomInheritanceModeArgs
}

export const CustomInheritanceModeView = ({
  isFilterActive,
  filterExpression,
}: ICustomInheritanceModeViewProps): ReactElement => {
  const problemGroups = getDefaultProblemGroups(
    FuncStepTypesEnum.CustomInheritanceMode,
  )

  return (
    <div
      className={cn('text-14 pb-4 pl-5', {
        'bg-blue-tertiary': isFilterActive,
      })}
    >
      <div className="mt-4">
        <div className="px-4 text-grey-blue">Scenario</div>

        {problemGroups.map((group, idx) => (
          <div
            className={cn('flex items-center pl-4 py-1', {
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
