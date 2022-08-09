import styles from './loader.module.css'

import { ReactElement } from 'react'
import cn, { Argument } from 'classnames'

export type TLoaderSize = 'xl' | 'l' | 'm' | 's' | 'xs'

export interface ILoaderProps {
  className?: Argument
  size?: TLoaderSize
  color?: 'default' | 'white'
}

export const Loader = ({
  className,
  size = 'l',
  color = 'default',
}: ILoaderProps): ReactElement => {
  return (
    <div className={cn(styles.loader, className)}>
      <div
        className={cn(
          styles.loader__spinner,
          styles[`loader__spinner_${size}`],
          'loader',
          color === 'default' ? 'text-blue-bright' : 'text-white',
        )}
      >
        Loading...
      </div>
    </div>
  )
}
