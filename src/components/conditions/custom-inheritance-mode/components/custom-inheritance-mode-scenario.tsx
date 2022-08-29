import { ReactElement } from 'react'
import cn from 'classnames'

import { t } from '@i18n'
import { Select } from '@ui/select'
import { ICustomInheritanceModeScenarioProps } from '../custom-inheritance-mode.interface'
const selectOptions = ['--', '0', '0-1', '1', '1-2', '2']

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
        <div key={group}>
          <span>{group}</span>

          <Select
            onChange={e => onChangeScenario(index, e.target.value)}
            className="w-auto ml-2 pl-2 pr-3 py-1 bg-white border-grey-disabled"
            options={selectOptions}
            value={selectValues[index]}
          />
        </div>
      ))}
    </div>
  </div>
)
