import { ChangeEvent, ReactElement } from 'react'
import cn from 'classnames'

import { t } from '@i18n'
import { Button } from '@ui/button'
import { Checkbox } from '@ui/checkbox/checkbox'
import { IInheritanceModeProblemGroupsProps } from '../inheritance-mode.interface'
export const InheritanceModeProblemGroups = ({
  problemGroups,
  selectedPropblemGroups,
  className,
  handleSetProblemGroups,
  handleReset,
}: IInheritanceModeProblemGroupsProps): ReactElement => (
  <div
    className={cn(
      'flex items-center justify-between w-full mt-2 mb-5 text-14',
      className,
    )}
  >
    <div>{t('funcCondition.affected')}</div>

    {problemGroups?.map((problemGroup: string) => (
      <Checkbox
        id={problemGroup}
        key={problemGroup}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleSetProblemGroups(e.target.checked, problemGroup)
        }
        checked={selectedPropblemGroups.includes(problemGroup)}
        className="ml-1"
      >
        {problemGroup}
      </Checkbox>
    ))}

    <Button
      onClick={handleReset}
      text="Reset"
      variant="secondary"
      size="s"
      disabled={!selectedPropblemGroups.length}
    />
  </div>
)
