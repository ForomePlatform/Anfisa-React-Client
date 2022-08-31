import { ReactElement } from 'react'
import cn from 'classnames'

import { t } from '@i18n'
import { Dropdown } from '@components/dropdown'
import { IDropdownValue } from '@components/dropdown/dropdown.interfaces'
import { ICustomInheritanceModeScenarioProps } from '../custom-inheritance-mode.interface'

const selectOptions: IDropdownValue<string>[] = [
  '--',
  '0',
  '0-1',
  '1',
  '1-2',
  '2',
].map(value => ({ value, label: value }))

export const CustomInheritanceModeScenario = ({
  problemGroups,
  selectValues,
  className,
  onChangeScenario,
}: ICustomInheritanceModeScenarioProps): ReactElement => (
  <div className={cn('-mt-1', className)}>
    <div className="mb-2 text-sm text-grey-dark">
      {t('funcCondition.scenario')}
    </div>

    <div className="flex items-center justify-between w-full text-14">
      {problemGroups.map((group: string, index: number) => (
        <div key={group} className="flex items-center">
          <span>{group}</span>

          <div className="ml-2">
            <Dropdown
              onChange={option => onChangeScenario(index, option.value)}
              values={[
                { value: selectValues[index], label: selectValues[index] },
              ]}
              options={selectOptions}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
)
