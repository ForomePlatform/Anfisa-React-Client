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
      <div className="text-grey-dark mt-4">Problem group</div>

      {isProblemGroupExists ? (
        filterExpression['problem_group'].map(subFilterName => (
          <div className={cn('py-2')} key={subFilterName}>
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

      <div className="mt-3">
        <div className="text-grey-dark">Inheritance type</div>

        {filterContent.map(subFilterName => (
          <div className={cn('py-2')} key={subFilterName}>
            {subFilterName}
          </div>
        ))}
      </div>
    </div>
  )
}
