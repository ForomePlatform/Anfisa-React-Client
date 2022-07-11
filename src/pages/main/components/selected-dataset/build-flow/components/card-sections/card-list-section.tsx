import { ReactElement } from 'react'
import cn from 'classnames'

import { Button } from '@ui/button'
import { CardTitle } from '@ui/card'
import { Icon } from '@ui/icon'
import { secondaryDsNameByKey } from '../secondary-ds-name-by-key'

interface ICardListSectionProps {
  title: string
  optionsList: string[] | undefined
  isSpecial?: boolean
  selectedItem: string
  style?: React.CSSProperties
  onSelect: (value: string) => void
  onOpen?: () => void
}

export const CardListSection = ({
  title,
  optionsList,
  isSpecial,
  selectedItem,
  style,
  onSelect,
  onOpen,
}: ICardListSectionProps): ReactElement => {
  return (
    <>
      <CardTitle text={title} className="text-16 px-4" />

      <div className="mb-4 text-14 overflow-y-auto" style={style}>
        {isSpecial
          ? optionsList?.map(secondaryDsNameByKey(1, onSelect, selectedItem))
          : optionsList?.map(option => {
              const isSelected = option === selectedItem
              return (
                <div key={option} onClick={() => onSelect(option)}>
                  <div
                    className={cn(
                      'w-full flex items-center py-2 leading-5 cursor-pointer px-4',
                      isSelected
                        ? 'bg-blue-bright text-white'
                        : 'hover:bg-blue-light',
                    )}
                  >
                    <Icon
                      name="File"
                      className={cn(
                        isSelected ? 'text-white' : 'text-blue-bright',
                      )}
                    />

                    <div className="ml-1.5">{option}</div>
                  </div>
                </div>
              )
            })}
      </div>

      {onOpen && (
        <div className="flex justify-end px-4">
          <Button text="Open" onClick={onOpen} disabled={!selectedItem} />
        </div>
      )}
    </>
  )
}
