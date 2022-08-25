import styles from './progress-bar.module.css'

import { FC } from 'react'
import cn, { Argument } from 'classnames'
import { observer } from 'mobx-react-lite'

import progressBarStore from './index'

interface IProgressBarProps {
  size?: 'xs' | 'sm' | 'md'
  showStatus?: boolean
  className?: Argument
}

export const ProgressBar: FC<IProgressBarProps> = observer(
  ({ size = 'sm', showStatus, className }) => {
    const { progress } = progressBarStore

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
        {showStatus && size === 'md' && (
          <div className={cn(styles.progressBar__text_container)}>
            <span className={cn(styles.progressBar__text)}>{progress} %</span>
          </div>
        )}
      </div>
    )
  },
)
