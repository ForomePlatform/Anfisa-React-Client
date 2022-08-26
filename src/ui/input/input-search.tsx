import styles from './input.module.css'

import { FC } from 'react'
import cn from 'classnames'
import { camelCase } from 'lodash'

import { Icon } from '@ui/icon'
import { IInputProps, Input } from '@ui/input/input'

export const InputSearch: FC<Omit<IInputProps, 'prepend' | 'append'>> = ({
  placeholder = 'Search',
  ...rest
}) => {
  const iconStyles = cn(
    styles.iconSearch,
    rest.disabled && styles[`iconSearch__${camelCase(rest.variant)}_disabled`],
    styles[`iconSearch__${camelCase(rest.variant)}`],
  )

  return (
    <Input
      append={<Icon name="Loupe" className={iconStyles} />}
      {...rest}
      placeholder={placeholder}
    />
  )
}
