import styles from './card.module.css'

import { CSSProperties, forwardRef, ReactElement, ReactNode, Ref } from 'react'
import cn, { Argument } from 'classnames'

interface ICardProps {
  className?: Argument
  innerRef?: Ref<HTMLDivElement>
  children?: ReactElement | ReactNode
  style?: CSSProperties
}

export const Card = forwardRef(
  ({ innerRef, children, className, style = {} }: ICardProps): ReactElement => (
    <div ref={innerRef} className={cn(styles.card, className)} style={style}>
      {children}
    </div>
  ),
)
