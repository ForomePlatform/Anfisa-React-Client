import { FC } from 'react'

import { Icon } from '@ui/icon'
import { IInputProps, Input } from '@ui/input/input'

export const InputSearch: FC<Omit<IInputProps, 'prepend' | 'append'>> = ({
  placeholder = 'Search',
  ...rest
}) => {
  return (
    <Input append={<Icon name="Loupe" />} {...rest} placeholder={placeholder} />
  )
}
