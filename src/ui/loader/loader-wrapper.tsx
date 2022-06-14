import styles from './loader.module.css'

import { FC } from 'react'
import cn, { Argument } from 'classnames'

import { Loader, TLoaderSize } from '@ui/loader/loader'

interface ILoaderWrapperProps {
  size?: TLoaderSize
  color?: 'default' | 'white'
  isLoading: boolean
  className?: Argument
}

export const LoaderWrapper: FC<ILoaderWrapperProps> = ({
  size = 'xs',
  color = 'white',
  isLoading,
  className,
  children,
}) => {
  return (
    <div className={cn(styles.loaderWrapper)}>
      <div
        className={cn(styles.loaderWrapper__container, className)}
        style={{ visibility: isLoading ? 'hidden' : 'visible' }}
      >
        {children}
      </div>
      <div
        className={cn(styles.loaderWrapper__loader)}
        style={{ visibility: !isLoading ? 'hidden' : 'visible' }}
      >
        <Loader
          size={size}
          color={color}
          className={cn(
            styles.loaderWrapper__loader_icon,
            styles[`loaderWrapper__loader_icon_${size}`],
          )}
        />
      </div>
    </div>
  )
}
