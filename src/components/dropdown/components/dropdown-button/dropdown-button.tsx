import styles from './dropdown-button.module.css'

import { MouseEvent, ReactElement } from 'react'
import cn, { Argument } from 'classnames'
import { camelCase } from 'lodash'

import { Icon } from '@ui/icon'
import { LoaderWrapper } from '@ui/loader'
import {
  IDropdownCommonProps,
  IDropdownValue,
} from '@components/dropdown/dropdown.interfaces'

interface IDropdownButtonProps<T> extends Required<IDropdownCommonProps<T>> {
  isOpen: boolean
  hasError: boolean
  onToggle: (target: HTMLElement) => void
  placeholder: string
  prepend?: JSX.Element | null
  append?: JSX.Element | null
  isLoading: boolean
  renderChosen?: (item: IDropdownValue<T>) => ReactElement
  className?: Argument
}

export const DropdownButton = <T,>({
  isOpen,
  isLoading,
  hasError,
  placeholder,
  onToggle,
  variant,
  values,
  prepend,
  append,
  renderChosen,
  className,
}: IDropdownButtonProps<T>): ReactElement => {
  const isEmpty = values.length === 0
  const color = variant === 'primary' ? 'default' : 'white'

  const onOpen = (e: MouseEvent<HTMLDivElement>) => {
    if (!isLoading) {
      onToggle(e.currentTarget)
    }
  }

  return (
    <div
      onClick={onOpen}
      className={cn(
        styles.dropdownButton,
        styles[`dropdownButton_${camelCase(variant)}`],
        isOpen && styles[`dropdownButton_${camelCase(variant)}_active`],
        hasError && styles.dropdownButton_error,
        className,
      )}
    >
      {prepend && (
        <div className={styles.dropdownButton__prepend}>{prepend}</div>
      )}
      <div className={styles.dropdownButton__append__container}>
        <LoaderWrapper isLoading={isLoading} color={color}>
          {isEmpty
            ? placeholder
            : renderChosen
            ? values.map(value => renderChosen(value))
            : values.map(value => value.value).join(', ')}
        </LoaderWrapper>
      </div>
      {append !== null && (
        <div className={styles.dropdownButton__append}>
          {append || (
            <Icon
              name="ArrowDownS"
              className={cn(isOpen && styles.dropdownButton__append__arrow)}
            />
          )}
        </div>
      )}
    </div>
  )
}
