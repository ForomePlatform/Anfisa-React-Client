import { ReactElement } from 'react'
import cn from 'classnames'

import { t } from '@i18n'
import { InputNumeric } from '@ui/input-numeric/input-numeric'
import { Select } from '@ui/select'
import { ICompoundRequestScenarioProps } from '../compound-request.interface'
import { getSelectedValue } from '../compound-request.utils'

const selectOptions = ['--', '0', '0-1', '1', '1-2', '2']

export const CompoundRequestScenario = ({
  className,
  requestItem,
  requestIndex,
  ...props
}: ICompoundRequestScenarioProps): ReactElement => {
  const hasError = requestItem[0] <= 0
  const {
    problemGroups,
    requestCondition,
    onChangeScenario,
    handleSetActiveRequestCondition,
    onChangeRequestConditionNumber,
  } = props
  return (
    <>
      <div
        className={cn(
          'flex items-center justify-between w-full text-14 py-2 px-2 my-0.5 border border-grey-light rounded-md',
          className,
        )}
        onClick={() => {
          handleSetActiveRequestCondition(requestIndex)
        }}
      >
        <div className="flex flex-col leading-16px font-medium text-grey-blue">
          <span className="mb-1 items-center">
            {t('funcCondition.scenario')}
          </span>

          <InputNumeric
            value={requestItem[0]}
            min={1}
            onChange={value =>
              onChangeRequestConditionNumber(requestIndex, value)
            }
            className="cursor-pointer h-7"
          />
        </div>

        <div className="flex flex-1 justify-between ml-8">
          {problemGroups.map((group: string, groupIndex: number) => {
            const value = getSelectedValue({
              group,
              requestIndex,
              requestCondition,
            })
            return (
              <div className="flex flex-col items-start" key={group}>
                <span>{group}</span>

                <Select
                  onChange={e =>
                    onChangeScenario(requestIndex, e.target.value, groupIndex)
                  }
                  className="w-auto pl-2 pr-3 py-1 bg-white"
                  options={selectOptions}
                  value={value}
                />
              </div>
            )
          })}
        </div>
      </div>

      {hasError && (
        <div className="flex items-center my-2 h-3 text-10 text-red-secondary">
          {t('dtree.minimalCountsOfEventsOnCompoundRequest')}
        </div>
      )}
    </>
  )
}
