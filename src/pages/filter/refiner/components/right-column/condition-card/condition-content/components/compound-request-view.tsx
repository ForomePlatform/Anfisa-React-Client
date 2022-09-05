import { ReactElement } from 'react'
import cn, { Argument } from 'classnames'

import { approxOptions } from '@core/approxOptions'
import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { ICompoundRequestArgs } from '@service-providers/common/common.interface'
import { getDefaultProblemGroups } from '../utils/get-default-problem-groups'
import { getScenarioValue } from '../utils/get-scenario-value'

interface ICompoundRequestViewProps {
  className?: Argument
  filterContent: string[]
  filterExpression: ICompoundRequestArgs
}

export const CompoundRequestView = ({
  className,
  filterExpression,
}: ICompoundRequestViewProps): ReactElement => {
  const problemGroups = getDefaultProblemGroups(
    FuncStepTypesEnum.CompoundRequest,
  )
  const approx: string = filterExpression['approx'] || approxOptions[2].value
  const state: string = filterExpression['state'] || 'current'
  const request = filterExpression['request']

  return (
    <div className={cn(className)}>
      <div className="mt-4">
        <div className="text-grey-dark">Approx</div>

        <div className="py-2 pt-2">{approx}</div>
      </div>

      <div className="mt-2">
        <div className="text-grey-dark">State</div>

        <div className="py-1 pt-2">{state}</div>
      </div>

      <div className="flex flex-wrap mt-3">
        {request.map(([reqNumber, reqCondition], idx) => (
          <div key={idx} className="pb-2 mr-3">
            <div>
              <span className="text-grey-dark">At least</span>
              <span className="mx-1">{`[${reqNumber}]`}</span>
              <span className="text-grey-dark">counts</span>
            </div>

            {problemGroups.map((group, idx) => (
              <div
                className={cn('flex items-center py-1', {
                  'pt-2': idx === 0,
                })}
                key={group + idx}
              >
                <span>{group}</span>

                <span className="ml-1 text-grey-dark">
                  {getScenarioValue(group, reqCondition)}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
