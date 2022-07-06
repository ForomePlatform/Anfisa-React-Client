import { ReactElement } from 'react'
import cn from 'classnames'

import { Button } from '@ui/button'
import { Card, CardTitle } from '@ui/card'
import { Icon } from '@ui/icon'
import { Radio } from '@ui/radio'
import selectedDatasetStore from '../../selected-dataset.store'

interface ICardRadioSectionProps {
  title: string
  optionsList: string[]
  checkedValue: string
  description?: string
  isContinueDisabled?: boolean
  isEditDisabled?: boolean
  isRadioDisabled?: boolean
  onEdit?: () => void
  onChange: (value: string) => void
  onContinue: () => void
}

export const CardRadioSection = ({
  title,
  optionsList,
  isContinueDisabled,
  isEditDisabled,
  isRadioDisabled,
  checkedValue,
  description,
  onEdit,
  onChange,
  onContinue,
}: ICardRadioSectionProps): ReactElement => (
  <>
    <div className="flex items-center justify-between">
      <CardTitle text={title} className="text-16" />

      {onEdit && (
        <Button
          variant="secondary"
          style={{ padding: 0 }}
          icon={
            <Icon
              name="Edit"
              className={cn(
                'cursor-pointer',
                isEditDisabled ? 'text-grey-blue' : 'text-blue-bright',
              )}
            />
          }
          disabled={isEditDisabled}
          onClick={onEdit}
        ></Button>
      )}
    </div>

    {description && (
      <div className="mb-4">
        <Card className="w-full mt-4 bg-grey-tertiary">
          <div className="font-bold mb-2">Description</div>

          <div
            className="text-12 overflow-y-auto"
            style={{ maxHeight: '25vh' }}
          >
            {description}
          </div>
        </Card>
      </div>
    )}

    <div className="mt-2 text-14">
      {optionsList.map(option => (
        <div className="flex mb-2 last:mb-0" key={option}>
          <Radio
            className="flex items-center"
            checked={option === checkedValue}
            onChange={() => onChange(option)}
            disabled={isRadioDisabled}
          >
            <div className="ml-1.5">{option}</div>
          </Radio>
        </div>
      ))}

      <div className="flex justify-end">
        <Button
          text="Continue"
          onClick={onContinue}
          disabled={
            isContinueDisabled && !!selectedDatasetStore.isStartFlowVisible
          }
        />
      </div>
    </div>
  </>
)
