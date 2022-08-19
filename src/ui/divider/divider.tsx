import styles from './divider.module.css'

import { ReactElement } from 'react'
import cn from 'classnames'

interface IDividerProps {
  className?: string
  orientation: 'vertical' | 'horizontal'
  color?: 'dark' | 'light' | 'light-blue' | 'blue-light'
  spacing?: 'normal' | 'dense' | 'min'
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
      {
        'bg-blue-lighter': color === 'dark',
        'bg-grey-disabled': color === 'light',
        'bg-grey-blue': color === 'light-blue',
        'bg-blue-light': color === 'blue-light',
      },
      orientation === 'vertical' ? 'w-0.5 h-full' : 'h-0.5 w-full',
      {
        'mx-4': spacing === 'normal' && orientation === 'vertical',
        'mx-2': spacing === 'dense' && orientation === 'vertical',
        'mx-1': spacing === 'min' && orientation === 'vertical',
        'my-0': spacing === 'min' && orientation === 'vertical',
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
