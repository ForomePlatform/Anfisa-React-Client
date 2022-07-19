import styles from './card.module.css'

import { CSSProperties, FC } from 'react'
import cn, { Argument } from 'classnames'

import { addWordBreaks } from '@ui/card/card.utils'
import { Icon } from '@ui/icon'

interface ICardTitleProps {
  text?: string
  size?: 'md' | 'sm'
  dataTestId?: string
  style?: CSSProperties
  showExpandButton?: boolean
  onExpand?: () => void
  isExpanded?: boolean
  className?: Argument
}

export const CardTitle: FC<ICardTitleProps> = ({
  text,
  showExpandButton,
  onExpand,
  isExpanded,
  dataTestId,
  size = 'md',
  children,
  className,
  style = {},
}) => (
  <header
    data-test-id={dataTestId}
    className={cn(
      styles.card_header,
      styles[`card_header_title_${size}`],
      className,
    )}
    style={style}
  >
    {text && (
      <span
        className={cn(
          styles.card_header_title,
          styles[`card_header_title_${size}`],
        )}
        dangerouslySetInnerHTML={
          text ? { __html: addWordBreaks(text) } : undefined
        }
      />
    )}
    {children && (
      <span
        className={cn(
          styles.card_header_title,
          styles[`card_header_title_${size}`],
        )}
      >
        {children}
      </span>
    )}
    {showExpandButton && (
      <button onClick={onExpand} className={cn(styles.card_header_button)}>
        <Icon name={isExpanded ? 'Collapse' : 'Expand'} />
      </button>
    )}
  </header>
)
