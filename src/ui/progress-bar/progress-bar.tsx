import styles from './progress-bar.module.css'

import { FC } from 'react'
import cn, { Argument } from 'classnames'

import { inPercentRange } from '@ui/progress-bar/progress-bar.utils'

interface IProgressBarProps {
  status: number
  step?: number
  showStatus?: boolean
  size?: 'xs' | 'sm'
  className?: Argument
}

export const ProgressBar: FC<IProgressBarProps> = ({
  status,
  step = 10,
  size = 'sm',
  showStatus,
  className,
}) => {
  const progress = inPercentRange(Math.round(status / step) * step)

  return (
    <div
      className={cn(
        styles.progressBar,
        styles[`progressBar_${size}`],
        className,
      )}
    >
      <div
        className={cn(styles.progressBar__result)}
        style={{ width: `${progress}%` }}
      />
      {showStatus && size !== 'xs' && (
        <div className={cn(styles.progressBar__text_container)}>
          <span className={cn(styles.progressBar__text)}>
            {inPercentRange(status)} %
          </span>
        </div>
      )}
    </div>
  )
}
