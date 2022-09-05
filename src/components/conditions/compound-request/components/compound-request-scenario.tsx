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
          'flex flex-col w-full text-14 py-2 px-2 mb-2 last:mb-0 border border-grey-light',
          className,
        )}
        onClick={() => {
          handleSetActiveRequestCondition(requestIndex)
        }}
      >
        <div className="flex flex-1 justify-start items-center mb-2 px-4">
          <span>{t('funcCondition.atLeast')}</span>

          <InputNumeric
            value={requestItem[0]}
            min={1}
            max={99}
            onChange={value => {
              if (value !== null) {
                onChangeRequestConditionNumber(requestIndex, value)
              }
            }}
            className="cursor-pointer h-7 w-[65px] mx-2"
          />

          <span>{t('funcCondition.counts')}</span>
        </div>

        <div className="flex flex-1 justify-between pr-4 pl-5">
          {problemGroups.map((group: string, groupIndex: number) => {
            const value = getSelectedValue({
              group,
              requestIndex,
              requestCondition,
            })
            return (
              <div className="flex items-center" key={group}>
                <span>{group}</span>

                <Select
                  onChange={e =>
                    onChangeScenario(requestIndex, e.target.value, groupIndex)
                  }
                  className="pl-2 pr-3 py-1 ml-2 w-[65px] bg-white"
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
