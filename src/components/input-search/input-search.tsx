import styles from './input-search.module.css'

import { ChangeEvent, memo, ReactElement, useCallback } from 'react'
import cn, { Argument } from 'classnames'

import { Icon } from '@ui/icon'

interface IInputSearchProps {
  placeholder?: string
  value: string
  className?: Argument
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onFocus?: () => void
  big?: boolean
  isDarkBg?: boolean
  canClearInput?: boolean
  foundItems?: number
  dataTestId?: string
}

export const InputSearch = memo(
  ({ ...rest }: IInputSearchProps): ReactElement => {
    const {
      className,
      big = false,
      isDarkBg,
      canClearInput = true,
      foundItems,
      dataTestId,
      ...tempRest
    } = rest

    const onClickClearButton = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        event.target.value = ''
        tempRest.onChange(event)
      },
      [tempRest],
    )

    return (
      <div className={cn('relative', className)}>
        <input
          type="text"
          data-testid={dataTestId}
          className={cn(
            styles.inputSearch,
            big && styles.inputSearch_big,
            isDarkBg && styles.inputSearch_dark,
          )}
          {...tempRest}
        />

        <div
          className={cn(
            'absolute right-2 flex text-grey-blue',
            big ? 'top-2' : 'top-1.5',
          )}
        >
          {canClearInput && tempRest.value && (
            <>
              {!!foundItems && (
                <div className="relative mr-2 text-12">{foundItems} found</div>
              )}

              <Icon
                name="CloseMD"
                onClick={onClickClearButton}
                className={cn('mr-2 cursor-pointer')}
              />
            </>
          )}
          <Icon name="Loupe" className={cn(isDarkBg && 'text-white')} />
        </div>
      </div>
    )
  },
)
