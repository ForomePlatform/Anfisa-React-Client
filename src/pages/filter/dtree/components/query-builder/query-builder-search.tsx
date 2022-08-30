import { ReactElement } from 'react'
import cn, { Argument } from 'classnames'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Divider } from '@ui/divider'
import { Icon } from '@ui/icon'
import { InputSearch } from '@ui/input'
import { Switch } from '@ui/switch'
import { DecisionTreesResultsDataCy } from '@data-testid'

interface IQueryBuilderSearchProps {
  value: string
  isSubgroupItemSearch?: boolean
  showSwitcher?: boolean
  isSwitched?: boolean
  className?: Argument
  onChange: (item: string) => void
  onSwitch?: (e: boolean) => void
}

export const QueryBuilderSearch = observer(
  ({
    value,
    isSubgroupItemSearch,
    showSwitcher,
    isSwitched,
    className,
    onChange,
    onSwitch,
  }: IQueryBuilderSearchProps): ReactElement => {
    const handleClick = (operation: string) => {
      operation === 'expand'
        ? dtreeStore.expandResultsContent()
        : dtreeStore.collapseResultsContent()
    }

    return (
      <div className={cn('flex w-full items-center', className)}>
        <div className="flex-1">
          <InputSearch
            placeholder={t('filter.searchForAField')}
            value={value}
            size="m"
            onChange={e => {
              onChange(e.target.value)
            }}
          />
        </div>

        {!isSubgroupItemSearch && (
          <div className="flex items-center justify-between pl-2 text-grey-blue">
            {showSwitcher && (
              <>
                <div className="mr-2 flex items-center">
                  <Switch
                    isChecked={!!isSwitched}
                    onChange={(e: boolean) => onSwitch && onSwitch(e)}
                    className="mr-2"
                  />

                  <span className="text-sm">{t('filter.switcher')}</span>
                </div>
                <Divider orientation="vertical" color="light" spacing="dense" />
              </>
            )}

            <div className="mr-2">
              <Icon
                name="Expand"
                size={20}
                className="cursor-pointer hover:text-blue-bright"
                onClick={() => handleClick('collapse')}
                dataTestId={DecisionTreesResultsDataCy.expandAll}
              />
            </div>

            <div>
              <Icon
                name="Collapse"
                size={20}
                className="cursor-pointer hover:text-blue-bright"
                onClick={() => handleClick('expand')}
                dataTestId={DecisionTreesResultsDataCy.collapseAll}
              />
            </div>
          </div>
        )}
      </div>
    )
  },
)
