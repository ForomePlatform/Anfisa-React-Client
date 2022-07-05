import { ReactElement } from 'react'

import { Button } from '@ui/button'
import { Card, CardTitle } from '@ui/card'
import { Icon } from '@ui/icon'
import { Radio } from '@ui/radio'

interface ICardRadioSectionProps {
  title: string
  optionsList: string[]
  checkedValue: string
  description?: string
  disabled?: boolean
  onEdit: () => void
  onChange: (value: string) => void
  onContinue: () => void
}

export const CardRadioSection = ({
  title,
  optionsList,
  disabled,
  checkedValue,
  description,
  onEdit,
  onChange,
  onContinue,
}: ICardRadioSectionProps): ReactElement => (
  <>
    <div className="flex items-center justify-between">
      <CardTitle text={title} className="text-16" />

      {disabled && (
        <Button
          variant="secondary"
          style={{ padding: 0 }}
          icon={
            <Icon name="Edit" className="text-blue-bright cursor-pointer" />
          }
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
            disabled={disabled}
          >
            <div className="ml-1.5">{option}</div>
          </Radio>
        </div>
      ))}

      {!disabled && (
        <div className="flex justify-end">
          <Button text="Continue" onClick={onContinue} />
        </div>
      )}
    </div>
  </>
)
