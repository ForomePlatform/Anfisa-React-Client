import styles from './progress-bar.module.css'

import { FC } from 'react'
import cn, { Argument } from 'classnames'

interface IProgressBarProps {
  status: number
  showStatus?: boolean
  size?: 'xs' | 'sm'
  className?: Argument
}

export const ProgressBar: FC<IProgressBarProps> = ({
  status,
  size = 'sm',
  showStatus,
  className,
}) => {
  let progress = status

  if (status < 0) {
    progress = 0
  } else if (status < 10) {
    progress = 0
  } else if (status > 100) {
    progress = 100
  }

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
            {Math.min(status, 100)} %
          </span>
        </div>
      )}
    </div>
  )
}
