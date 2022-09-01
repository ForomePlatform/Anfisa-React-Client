import { ReactElement } from 'react'
import cn from 'classnames'

import { t } from '@i18n'
import { InputNumeric } from '@ui/input-numeric/input-numeric'
import { Dropdown } from '@components/dropdown'
import { IDropdownValue } from '@components/dropdown/dropdown.interfaces'
import { ICompoundRequestScenarioProps } from '../compound-request.interface'
import { getSelectedValue } from '../compound-request.utils'

const selectOptions: IDropdownValue<string>[] = [
  '--',
  '0',
  '0-1',
  '1',
  '1-2',
  '2',
].map(value => ({ value, label: value }))

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
            className="cursor-pointer h-7 w-[60px] mx-2"
          />

          <span>{t('funcCondition.counts')}</span>
        </div>

        <div className="flex flex-1 justify-between px-2">
          {problemGroups.map((group: string, groupIndex: number) => {
            const value = getSelectedValue({
              group,
              requestIndex,
              requestCondition,
            })
            return (
              <div
                className="flex items-center flex-1 mr-2 last:mr-0"
                key={group}
              >
                <span>{group}</span>

                <div className="ml-2 flex-1 max-w-[75px]">
                  <Dropdown
                    onChange={option =>
                      onChangeScenario(requestIndex, option.value, groupIndex)
                    }
                    values={[{ value, label: value }]}
                    options={selectOptions}
                  />
                </div>
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
