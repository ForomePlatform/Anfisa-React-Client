import styles from './divider.module.css'

import { ReactElement } from 'react'
import cn from 'classnames'

interface IDividerProps {
  className?: string
  orientation: 'vertical' | 'horizontal'
  color?: 'dark' | 'light'
  spacing?: 'normal' | 'dense'
}

export const Divider = ({
  className,
  orientation,
  color = 'dark',
  spacing = 'normal',
}: IDividerProps): ReactElement => (
  <div
    className={cn(
      'cursor-default rounded-full overflow-hidden shrink-0 grow-0',
      color === 'dark' ? 'bg-blue-lighter' : 'bg-grey-disabled',
      orientation === 'vertical' ? 'w-0.5 h-full' : 'h-0.5 w-full',
      {
        'mx-4': spacing === 'normal' && orientation === 'vertical',
        'mx-2': spacing === 'dense' && orientation === 'vertical',
        'my-4': spacing === 'normal' && orientation === 'horizontal',
        'my-2': spacing === 'dense' && orientation === 'horizontal',
      },
      className,
    )}
  >
    {'\u00a0'}
  </div>
)

export const CircleDivider = (): ReactElement => (
  <div className={cn(styles.circleDivider)} />
)
