import styles from './all-mode-wrapper.module.css'

import { ReactElement, ReactNode } from 'react'
import cn, { Argument } from 'classnames'

interface IAllModeWrapperProps {
  className?: Argument
  children: ReactNode
}

export const AllModeWrapper = ({
  className,
  children,
}: IAllModeWrapperProps): ReactElement => {
  return <div className={cn(styles.allModeWrapper, className)}>{children}</div>
}
