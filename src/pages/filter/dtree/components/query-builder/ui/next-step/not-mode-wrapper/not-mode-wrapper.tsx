import styles from './not-mode-wrapper.module.css'

import { ReactElement, ReactNode } from 'react'
import cn, { Argument } from 'classnames'

interface INotModeWrapperProps {
  className?: Argument
  children: ReactNode
}

export const NotModeWrapper = ({
  className,
  children,
}: INotModeWrapperProps): ReactElement => (
  <div className={cn(styles.notModeWrapper, className)}>{children}</div>
)
