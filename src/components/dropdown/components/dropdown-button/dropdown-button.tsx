import styles from './dropdown-button.module.css'

import { MouseEvent, ReactElement, RefObject } from 'react'
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
  disabled: boolean
  refOfButton: RefObject<HTMLDivElement>
  reset?: () => void
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
  refOfButton,
  variant,
  disabled,
  reset,
  values,
  prepend,
  append,
  renderChosen,
  className,
}: IDropdownButtonProps<T>): ReactElement => {
  const isEmpty = values.length === 0
  const color = variant === 'primary' ? 'default' : 'white'

  const onOpen = (e: MouseEvent<HTMLDivElement>) => {
    if (!isLoading && !disabled) {
      onToggle(e.currentTarget)
    }
  }

  const onReset = (e: MouseEvent<HTMLOrSVGElement>) => {
    e.stopPropagation()
    if (reset) {
      reset()
    }
  }

  const showResetButton: boolean = !!reset && !!values.length
  const showAppend: boolean = append !== null || showResetButton

  return (
    <div
      onClick={onOpen}
      ref={refOfButton}
      className={cn(
        styles.dropdownButton,
        styles[`dropdownButton_${camelCase(variant)}`],
        isOpen && styles[`dropdownButton_${camelCase(variant)}_active`],
        disabled && styles[`dropdownButton_${camelCase(variant)}_disabled`],
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
      {showAppend && (
        <div className={styles.dropdownButton__append}>
          {showResetButton && (
            <Icon
              name="CloseMD"
              onClick={onReset}
              className={styles.dropdownButton__append__close_icon}
            />
          )}
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
