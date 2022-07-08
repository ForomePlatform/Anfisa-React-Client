import { ReactElement, useState } from 'react'
import cn from 'classnames'

import { Button } from '@ui/button'
import { Card, CardTitle } from '@ui/card'
import { Icon } from '@ui/icon'
import { Radio } from '@ui/radio'
import { optionsForOpenButton } from '../../../selected-dataset.constants'

interface ICardRadioListSectionProps {
  title: string
  optionsList: string[]
  checkedValue: string
  description?: string
  isEditDisabled: boolean
  onEdit?: () => void
  onContinue: (selectedItem: string) => void
  onOpen?: (selectedItem: string) => void
}

export const CardRadioListSection = ({
  title,
  optionsList,
  isEditDisabled,
  checkedValue,
  description,
  onEdit,
  onContinue,
  onOpen,
}: ICardRadioListSectionProps): ReactElement => {
  const [selectedItem, setSelectedItem] = useState(checkedValue)

  const isOpenButton = optionsForOpenButton.includes(selectedItem)
  return (
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
              style={{ maxHeight: '14vh' }}
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
              checked={option === selectedItem}
              onChange={() => setSelectedItem(option)}
              disabled={!isEditDisabled}
            >
              <div className="ml-1.5">{option}</div>
            </Radio>
          </div>
        ))}

        <div className="flex justify-end">
          {isOpenButton ? (
            <Button
              text="Open"
              onClick={() => onOpen?.(selectedItem)}
              disabled={!isEditDisabled}
            />
          ) : (
            <Button
              text="Continue"
              onClick={() => onContinue(selectedItem)}
              disabled={!isEditDisabled}
            />
          )}
        </div>
      </div>
    </>
  )
}
