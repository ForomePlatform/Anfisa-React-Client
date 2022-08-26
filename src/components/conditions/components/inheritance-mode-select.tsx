import { FC } from 'react'
import cn, { Argument } from 'classnames'

import { resetOptions } from '@core/resetOptions'
import { t } from '@i18n'
import { Button } from '@ui/button'
import { Radio } from '@ui/radio'
interface IInheritanceModeSelectProp {
  preparedScenarioName?: string
  className?: Argument
  setPreparedScenarioName?: (value: string) => void
  handleSetPreparedScenario: (value: string) => void
}

export const InheritanceModeSelect: FC<IInheritanceModeSelectProp> = ({
  preparedScenarioName,
  className,
  handleSetPreparedScenario,
  setPreparedScenarioName,
}) => (
  <div className={cn('-mb-1', className as string)}>
    <div className="flex justify-between items-center -mt-1 mb-1">
      <span className="mb-2.5 text-sm text-grey-dark">
        {t('funcCondition.inheritanceMode')}
      </span>

      <Button
        onClick={() => setPreparedScenarioName?.('')}
        text="Reset"
        variant="secondary"
        size="s"
        disabled={!preparedScenarioName}
      />
    </div>

    <div className="flex flex-col text-14">
      {resetOptions.map(option => (
        <Radio
          key={option}
          id={option}
          onChange={() => handleSetPreparedScenario(option)}
          checked={preparedScenarioName === option}
          isWide
          className="mb-3 last:mb-0"
        >
          {option}
        </Radio>
      ))}
    </div>
  </div>
)
