import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import filterZone from '@store/filterZone'

const truncate = (str: string, length: number) => {
  return str.slice(0, length)
}

type ContentProps = {
  [key: string]: {
    genotype: string
    g_quality: number
  }
}

type Props = {
  data: ContentProps
}

export const TableSamples = observer(
  ({ data }: Props): ReactElement => {
    return (
      <div className="flex justify-between h-20">
        {Object.keys(data).map((item, index) => (
          <div
            className={cn('flex flex-col justify-center text-left px-2', {
              'bg-orange-light': filterZone.isFather && index === 2,
              'bg-yellow-light': filterZone.isMother && index === 1,
              'bg-purple-light': filterZone.isProband && index === 0,
            })}
            style={{
              height: '99%',
              width: 75,
            }}
            key={item}
          >
            <div className="text-10">{item}</div>

            <div className="text-10">{truncate(data[item].genotype, 10)}</div>

            <div className="text-10 ">{data[item].g_quality}</div>
          </div>
        ))}
      </div>
    )
  },
)
