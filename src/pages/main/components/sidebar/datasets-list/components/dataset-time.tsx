import React, { FC } from 'react'
import cn from 'classnames'

import { formatDate } from '@core/format-date'

interface IDatasetTimeProps {
  time: string | Date
  isActive?: boolean
}

export const DatasetTime: FC<IDatasetTimeProps> = ({ time, isActive }) => (
  <div
    className={cn(
      'flex ml-auto text-10 leading-18px whitespace-nowrap',
      isActive ? 'text-white' : 'text-grey-blue',
    )}
  >
    <div>{formatDate(time)}</div>
  </div>
)
