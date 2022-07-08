import { ReactElement } from 'react'
import cn, { Argument } from 'classnames'

import { approxOptions } from '@core/approxOptions'
import { ICompoundHetArgs } from '@service-providers/common/common.interface'

interface ICompoundHetViewProps {
  className?: Argument
  filterContent: string[]
  filterExpression: ICompoundHetArgs
}

export const CompoundHetView = ({
  className,
  filterExpression,
}: ICompoundHetViewProps): ReactElement => {
  const approx: string = filterExpression['approx'] || approxOptions[2]
  const state: string = 'current'

  return (
    <div className={cn(className)}>
      <div className="text-grey-blue">Approx</div>

      <div className="py-1 pt-2">{approx}</div>

      <div className="mt-2">
        <div className="text-grey-blue">State</div>

        <div className="py-1 pt-2">{state}</div>
      </div>

      <div className="mt-2">
        <div className="text-grey-blue">Proband</div>

        <div className="py-1 pt-2">True</div>
      </div>
    </div>
  )
}
