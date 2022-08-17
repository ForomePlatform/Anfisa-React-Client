import { MouseEvent, ReactElement, useState } from 'react'
import cn from 'classnames'

import { Tooltip } from '@ui/tooltip'
import { DecisionTreesResultsDataCy } from '@data-testid'
import { PredictionPowerPoint } from './prediction-power-point'

interface IPredictionPowerIndicatorProps {
  className?: string
  value: number
  comment?: string
}

export const PredictionPowerIndicator = ({
  className,
  value,
  comment,
}: IPredictionPowerIndicatorProps): ReactElement => {
  const [isCommentShown, setCommentShown] = useState(false)
  const valueStr = value.toFixed(3)

  const onClick = (e: MouseEvent) => {
    e.stopPropagation()
    setCommentShown(!isCommentShown)
  }

  return (
    <Tooltip
      theme="light"
      key={isCommentShown ? 'long' : 'short'}
      maxWidth="auto"
      title={
        isCommentShown ? (
          <span>
            {valueStr} <span className="text-[10px]">{comment}</span>
          </span>
        ) : (
          valueStr
        )
      }
      placement="top-start"
    >
      <div
        className={cn('flex', className)}
        onClick={onClick}
        data-testid={DecisionTreesResultsDataCy.unitPredictionPower}
      >
        <PredictionPowerPoint value={value} />
      </div>
    </Tooltip>
  )
}
