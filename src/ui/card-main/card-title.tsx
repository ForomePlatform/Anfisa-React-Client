import styles from './card.module.css'

import { FC } from 'react'
import cn, { Argument } from 'classnames'

import { Icon } from '@ui/icon'

interface ICardTitleProps {
  showExpandButton?: boolean
  onExpand?: () => void
  isExpanded?: boolean
  className?: Argument
}

export const CardTitle: FC<ICardTitleProps> = ({
  showExpandButton,
  onExpand,
  isExpanded,
  children,
  className,
}) => (
  <header className={cn(styles.card_header, className)}>
    <span className={cn(styles.card_header_title)}>{children}</span>
    {showExpandButton && (
      <button onClick={onExpand} className={cn(styles.card_header_button)}>
        <Icon name={isExpanded ? 'Collapse' : 'Expand'} />
      </button>
    )}
  </header>
)
