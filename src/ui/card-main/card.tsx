import styles from './card.module.css'

import { FC } from 'react'
import cn, { Argument } from 'classnames'

interface ICardProps {
  id?: string
  className?: Argument
}

export const Card: FC<ICardProps> = ({ className, children, ...props }) => {
  return (
    <section className={cn(styles.card, className)} {...props}>
      {children}
    </section>
  )
}
