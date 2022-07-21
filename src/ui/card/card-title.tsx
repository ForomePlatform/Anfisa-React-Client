import styles from './card.module.css'

import { CSSProperties, ReactElement } from 'react'
import cn, { Argument } from 'classnames'

import { addWordBreaks } from '@ui/card/card.utils'

interface ICardTitleProps {
  text: string
  size?: 'md' | 'sm'
  className?: Argument
  dataTestId?: string
  style?: CSSProperties
}

export const CardTitle = ({
  text,
  className,
  size = 'sm',
  dataTestId,
  style = {},
}: ICardTitleProps): ReactElement => {
  return (
    <div
      data-test-id={dataTestId}
      className={cn(styles.card_title, styles[`card_title_${size}`], className)}
      dangerouslySetInnerHTML={{ __html: addWordBreaks(text) }}
      style={style}
    ></div>
  )
}
