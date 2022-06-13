import styles from './loader.module.css'

import { FC } from 'react'
import cn, { Argument } from 'classnames'

import { Loader } from '@components/loader/loader'

interface ILoaderWrapperProps {
  isLoading: boolean
  className?: Argument
}

export const LoaderWrapper: FC<ILoaderWrapperProps> = ({
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
          size="xs"
          color="white"
          className={styles.loaderWrapper__loader_icon}
        />
      </div>
    </div>
  )
}
