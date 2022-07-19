import styles from './card.module.css'

import { FC, RefObject } from 'react'
import cn, { Argument } from 'classnames'

interface ICardProps {
  innerRef?: RefObject<HTMLElement>
  className?: Argument
}

export const Card: FC<ICardProps> = ({ innerRef, className, children }) => (
  <section ref={innerRef} className={cn(styles.card, className)}>
    {children}
  </section>
)
