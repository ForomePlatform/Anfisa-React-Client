import { ReactElement } from 'react'
import cn, { Argument } from 'classnames'

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
  const approx: string | null = filterExpression['approx']
  const state: string = 'current'

  return (
    <div className={cn(className)}>
      {approx && (
        <div className="mt-4">
          <div className="text-grey-dark">Approx</div>
          <div className="py-1 pt-2">{approx}</div>
        </div>
      )}

      <div className="mt-4">
        <div className="text-grey-dark">State</div>

        <div className="py-1 pt-2">{state}</div>
      </div>

      <div className="mt-4">
        <div className="text-grey-dark">Proband</div>

        <div className="py-1 pt-2">True</div>
      </div>
    </div>
  )
}
