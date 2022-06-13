import React, { FC } from 'react'
import cn, { Argument } from 'classnames'

import { t } from '@i18n'
import filterStore from '@store/filter'
import { InputNumeric } from '@ui/input-numeric/input-numeric'
import { DividerHorizontal } from '@pages/filter/refiner/components/middle-column/components/divider-horizontal'
import { ProblemGroup } from '@pages/filter/refiner/components/middle-column/panels/function-panel/components/compound-request/components/problem-group'
import compoundRequestStore from '@pages/filter/refiner/components/middle-column/panels/function-panel/components/compound-request/compound-request.store'
import functionPanelStore from '@pages/filter/refiner/components/middle-column/panels/function-panel/function-panel.store'
import { TRequestCondition } from '@service-providers/common'
import { getSelectedValue } from '@utils/function-panel/getSelectedValue'

interface ICompoundRequestScenarioProp {
  item: TRequestCondition
  index: number
  className?: Argument
}

export const CompoundRequestScenario: FC<ICompoundRequestScenarioProp> = ({
  item,
  index,
  className,
}) => {
  const onScenarioChange = (newValue: number) => {
    if (item[0] !== newValue) {
      filterStore.setTouched(true)
    }

    compoundRequestStore.handleRequestConditionNumber(index, newValue)
  }

  const hasError = item[0] <= 0

  return (
    <>
      <div
        className={cn('flex flex-col', className)}
        onClick={() => {
          compoundRequestStore.handleActiveRequest(index)
        }}
      >
        <div className="flex items-center mb-2">
          <div className="text-14 leading-16px font-medium text-grey-blue mr-2.5">
            {t('dtree.scenario')}
          </div>
          <div>
            <InputNumeric
              value={item[0]}
              min={1}
              className="cursor-pointer"
              onChange={onScenarioChange}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          {functionPanelStore.problemGroups.map(
            (group: string, currNo: number) => {
              const value = getSelectedValue(
                group,
                index,
                compoundRequestStore.requestCondition,
              )
              return (
                <ProblemGroup
                  className="mr-8 last:mr-0"
                  key={group}
                  group={group}
                  value={value}
                  currNo={currNo}
                  index={index}
                />
              )
            },
          )}
        </div>
        {hasError && (
          <div className="flex items-center my-2 h-3 text-10 text-red-secondary">
            {t('dtree.minimalCountsOfEventsOnCompoundRequest')}
          </div>
        )}
      </div>

      <DividerHorizontal className="last:hidden" />
    </>
  )
}
