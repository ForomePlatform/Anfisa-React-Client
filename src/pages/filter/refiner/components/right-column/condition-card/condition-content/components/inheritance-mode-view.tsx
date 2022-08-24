import { ReactElement } from 'react'
import cn from 'classnames'

import { DefaultProblemGroup } from '@core/enum/default-problem-group-enum'
import datasetStore from '@store/dataset/dataset'
import { IInheritanceModeArgs } from '@service-providers/common/common.interface'

interface IInheritanceModeViewProps {
  className?: string
  filterContent: string[]
  filterExpression: IInheritanceModeArgs
}

export const InheritanceModeView = ({
  className,
  filterContent,
  filterExpression,
}: IInheritanceModeViewProps): ReactElement => {
  const isProblemGroupExists = filterExpression['problem_group']

  return (
    <div className={className}>
      <div className="text-grey-dark">Problem group</div>

      {isProblemGroupExists ? (
        filterExpression['problem_group'].map((subFilterName, idx) => (
          <div
            className={cn('py-1', {
              'pt-2': idx === 0,
            })}
            key={subFilterName}
          >
            {subFilterName}
          </div>
        ))
      ) : (
        <div className="py-1 pt-2">
          {datasetStore.isXL
            ? DefaultProblemGroup.HG002
            : DefaultProblemGroup.NA24385}
        </div>
      )}

      <div className="mt-2">
        <div className="text-grey-dark">Inheritance type</div>

        {filterContent.map((subFilterName, idx) => (
          <div
            className={cn('py-1', {
              'pt-2': idx === 0,
            })}
            key={subFilterName}
          >
            {subFilterName}
          </div>
        ))}
      </div>
    </div>
  )
}
