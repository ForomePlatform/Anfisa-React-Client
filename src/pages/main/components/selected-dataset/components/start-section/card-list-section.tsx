import { ReactElement } from 'react'
import cn from 'classnames'

import { Button } from '@ui/button'
import { CardTitle } from '@ui/card'
import { Icon } from '@ui/icon'

interface ICardListSectionProps {
  title: string
  optionsList: string[]
  selectedItem: string
  onSelect: (value: string) => void
  onOpen?: () => void
}

export const CardListSection = ({
  title,
  optionsList,
  selectedItem,
  onSelect,
  onOpen,
}: ICardListSectionProps): ReactElement => (
  <>
    <CardTitle text={title} className="text-16" />

    <div className="h-auto text-14 overflow-y-auto">
      {optionsList.map(option => {
        const isSelected = option === selectedItem
        return (
          <div key={option} onClick={() => onSelect(option)}>
            <div
              className={cn(
                'w-full flex items-center py-2 leading-5 cursor-pointer',
                isSelected
                  ? 'bg-blue-bright text-white'
                  : 'hover:bg-blue-light',
              )}
            >
              <Icon
                name="File"
                className={cn(isSelected ? 'text-white' : 'text-blue-bright')}
              />

              <div className="ml-1.5">{option}</div>
            </div>
          </div>
        )
      })}
    </div>

    {onOpen && (
      <div className="flex justify-end">
        <Button text="Open" onClick={onOpen} disabled={!selectedItem} />
      </div>
    )}
  </>
)
