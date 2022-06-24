import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { useToggle } from '@core/hooks/use-toggle'
import filterStore from '@store/filter'
import { Icon } from '@ui/icon'
import { AttributeKinds, ConditionJoinMode } from '@service-providers/common'
import {
  TFuncArgs,
  TNumericConditionBounds,
} from '@service-providers/common/common.interface'
import { AllNotModeLabel } from './all-not-mode-label'
import { EnumFilter } from './enum-filter'
import { FuncFilter } from './func-filter'
import { NumericFilter } from './numeric-filter'
import { RefinerConditionOptions } from './refiner-condition-options'

interface ISelectedFilterCardProps {
  isActive: boolean
  index: number
}

export const SelectedFilterCard = observer(
  ({ isActive, index }: ISelectedFilterCardProps): ReactElement => {
    const { conditions } = filterStore
    const condition = conditions[index]

    // TODO: mobx warning for out of bounds read from condition
    //       not all of conditions have 3rd and 4th value
    const filterType: string = condition[0]
    const filterName: string = condition[1]
    const filterMode: ConditionJoinMode | undefined =
      filterType !== AttributeKinds.NUMERIC
        ? (condition[2] as ConditionJoinMode)
        : undefined
    const filterContent: string[] = condition[3] || []
    const filterExpression: TFuncArgs = condition[4]!

    const [isFilterContentVisible, showFilterContent, hideFilterContent] =
      useToggle(true)

    const toggleFilterContentVisibility = (event: React.MouseEvent) => {
      event.stopPropagation()

      isFilterContentVisible ? hideFilterContent() : showFilterContent()
    }

    return (
      <>
        <div
          className={cn('relative flex flex-col px-3 cursor-pointer', {
            'bg-blue-tertiary': isActive,
          })}
          onClick={() => filterStore.selectCondition(index)}
        >
          {index > 0 && <div className="bg-grey-light h-px w-full" />}

          <div className="flex py-2.5 items-center justify-between">
            <div className="flex" onClick={toggleFilterContentVisibility}>
              <Icon
                name="Arrow"
                className={cn(
                  'text-grey-blue transform transition-transform mr-2',
                  isFilterContentVisible ? 'rotate-90' : '-rotate-90',
                )}
              />

              <div className="leading-16px font-bold">{filterName}</div>

              <AllNotModeLabel
                isAllMode={filterMode === ConditionJoinMode.AND}
                isNotMode={filterMode === ConditionJoinMode.NOT}
              />
            </div>

            <RefinerConditionOptions />
          </div>
          {isFilterContentVisible && (
            <div className="bg-grey-light h-px w-full" />
          )}
        </div>

        {isFilterContentVisible && filterType === AttributeKinds.NUMERIC && (
          <NumericFilter
            filterName={filterName}
            isFilterActive={isActive}
            numericExpression={condition[2] as TNumericConditionBounds}
          />
        )}

        {isFilterContentVisible && filterType === AttributeKinds.ENUM && (
          <EnumFilter isFilterActive={isActive} filterContent={filterContent} />
        )}

        {isFilterContentVisible && filterType === AttributeKinds.FUNC && (
          <FuncFilter
            filterName={filterName}
            isFilterActive={isActive}
            filterContent={filterContent}
            filterExpression={filterExpression}
          />
        )}
      </>
    )
  },
)
