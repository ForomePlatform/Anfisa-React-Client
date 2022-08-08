import styles from './prediction-power-indicator.module.css'

import { ReactElement, useState } from 'react'
import cn, { Argument } from 'classnames'

import { Tooltip } from '@ui/tooltip'
import { DecisionTreesResultsDataCy } from '@data-testid'

interface IPredictionPowerIndicatorProps {
  className?: Argument
  value: number
  comment?: string
  size?: 'sm' | 'md'
}

export const PredictionPowerIndicator = ({
  className,
  value,
  comment,
  size = 'md',
}: IPredictionPowerIndicatorProps): ReactElement => {
  const [isCommentShown, setCommentShown] = useState(false)
  const valueStr = value.toFixed(3)

  const getColorByValue = (value: number): string => {
    if (value <= 0.01) {
      return 'grey'
    }

    if (value <= 0.1) {
      return 'yellow'
    }

    if (value <= 0.2) {
      return 'greenLight'
    }

    return 'greenDark'
  }

  const color = getColorByValue(value)

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
      <span
        data-testid={DecisionTreesResultsDataCy.unitPredictionPower}
        className={cn(
          className,
          styles.predictionPowerIndicator,
          styles[`predictionPowerIndicator_${size}`],
          styles[`predictionPowerIndicator_${color}`],
        )}
        onClick={() => setCommentShown(!isCommentShown)}
      />
    </Tooltip>
  )
}
