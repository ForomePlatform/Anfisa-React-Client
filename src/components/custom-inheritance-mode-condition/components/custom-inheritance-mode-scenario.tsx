import { ReactElement } from 'react'

import { t } from '@i18n'
import { Select } from '@ui/select'
import { ICustomInheritanceModeScenarioProps } from '../custom-inheritance-mode.interface'

const selectOptions = ['--', '0', '0-1', '1', '1-2', '2']

export const CustomInheritanceModeScenario = ({
  problemGroups,
  selectValues,
  handleSetSingleScenario,
}: ICustomInheritanceModeScenarioProps): ReactElement => (
  <>
    <div className="text-14 leading-16px font-medium text-grey-blue mb-2.5">
      {t('dtree.scenario')}
    </div>

    <div className="flex items-center justify-between w-full text-14">
      {problemGroups.map((group: string, index: number) => (
        <div key={group}>
          <span>{group}</span>

          <Select
            onChange={e => handleSetSingleScenario(index, e.target.value)}
            className="w-auto ml-2 pl-2 pr-3 py-1 bg-white"
            options={selectOptions}
            value={selectValues[index]}
          />
        </div>
      ))}
    </div>
  </>
)
