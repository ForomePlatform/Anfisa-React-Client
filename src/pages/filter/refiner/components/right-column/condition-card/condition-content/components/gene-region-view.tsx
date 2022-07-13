import { ReactElement } from 'react'

import { IGeneRegionArgs } from '@service-providers/common/common.interface'

interface IGeneRegionViewProps {
  className?: string
  filterContent: string[]
  filterExpression: IGeneRegionArgs
}

export const GeneRegionView = ({
  className,
  filterExpression,
}: IGeneRegionViewProps): ReactElement => (
  <div className={className}>
    <div className="text-grey-blue">Locus</div>

    <div className="py-1 pt-2">{filterExpression['locus']}</div>
  </div>
)
