import styles from './input-search.module.css'

import { ChangeEvent, memo, ReactElement, useCallback } from 'react'
import cn, { Argument } from 'classnames'

import { Icon } from '@ui/icon'
import { DecisionTreesResultsDataCy } from '../data-testid/decision-tree-results.cy'

interface IInputSearchProps {
  placeholder?: string
  value: string
  className?: Argument
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onFocus?: () => void
  big?: boolean
  canClearInput?: boolean
  foundItems?: number
}

export const InputSearch = memo(
  ({ ...rest }: IInputSearchProps): ReactElement => {
    const {
      className,
      big = false,
      canClearInput = true,
      foundItems,
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
          data-testid={DecisionTreesResultsDataCy.searchGraphResults}
          className={cn(styles.inputSearch, big && styles.inputSearch_big)}
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
          <Icon name="Loupe" />
        </div>
      </div>
    )
  },
)
