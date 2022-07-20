import styles from './card.module.css'

import { CSSProperties, forwardRef, ReactElement, ReactNode } from 'react'
import cn, { Argument } from 'classnames'

interface ICardProps {
  className?: Argument
  children?: ReactElement | ReactNode
  style?: CSSProperties
}

export const Card = forwardRef(
  ({ children, className, style = {} }: ICardProps): ReactElement => (
    <div className={cn(styles.card, className)} style={style}>
      {children}
    </div>
  ),
)
